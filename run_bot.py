"""
StartupKart Telegram Polling Bot
Runs as a standalone process alongside uvicorn.
Handles all bot commands using the same logic as the webhook endpoint.
"""
import asyncio
import logging
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.telegram_service import telegram_service
from app.core.config import settings
from app.models.user import User
from app.models.order import Order as OrderModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("startupkart_bot")


async def handle_update(update: dict):
    """Process a single Telegram update."""
    message = update.get("message", {})
    text = (message.get("text") or "").strip()
    chat = message.get("chat", {})
    chat_id = str(chat.get("id", ""))
    first_name = chat.get("first_name", "User")

    if not text or not chat_id:
        return

    logger.info(f"📩 [{chat_id}] {text}")

    parts = text.split()
    command = parts[0].lower() if parts else ""

    with SessionLocal() as db:
        # /start — generate linking code (no auth needed)
        if command == "/start":
            code = telegram_service.generate_linking_code(chat_id)
            await telegram_service.send_message(
                chat_id,
                f"👋 <b>Welcome to StartupKart Bot, {first_name}!</b>\n\n"
                f"To link your account:\n"
                f"1️⃣ Go to <b>Settings → Security → Telegram Integration</b> on the website\n"
                f"2️⃣ Enter this code:\n\n"
                f"<code>{code}</code>\n\n"
                f"⏳ Valid for <b>5 minutes</b>\n\n"
                f"Type /help to see all available commands."
            )
            return

        # /help — public
        if command == "/help":
            await telegram_service.send_message(
                chat_id,
                "📖 <b>StartupKart Bot Commands</b>\n\n"
                "/start — Link your account & get code\n"
                "/help — Show this help message\n"
                "/myorders — See your last 3 orders\n"
                "/latestprice — Live market price summary\n"
                "/status — Your account status\n"
                "/track [order_id] — Track a specific order\n\n"
                "💬 You can also send natural messages like:\n"
                "<i>\"What are my orders?\"</i>"
            )
            return

        # Resolve linked user for authenticated commands
        linked_user = db.query(User).filter(User.telegram_chat_id == chat_id).first()

        # /myorders
        if command == "/myorders":
            if not linked_user:
                await telegram_service.send_message(chat_id, "⚠️ Not linked. Send /start to link your account.")
                return
            orders = db.query(OrderModel).filter(
                OrderModel.user_id == linked_user.id
            ).order_by(OrderModel.created_at.desc()).limit(3).all()

            if not orders:
                await telegram_service.send_message(chat_id, "📦 You have no orders yet.")
            else:
                lines = ["📦 <b>Your Last 3 Orders</b>\n"]
                for o in orders:
                    lines.append(f"• Order #{o.id} — ₹{o.final_amount} — <b>{o.status}</b>")
                await telegram_service.send_message(chat_id, "\n".join(lines))
            return

        # /latestprice
        if command == "/latestprice":
            await telegram_service.send_message(
                chat_id,
                "📊 <b>Sample Market Prices (Demo)</b>\n\n"
                "• Steel (HR) — ₹52,000/MT ▲ +1.2%\n"
                "• Copper Wire — ₹715/kg ▼ -0.5%\n"
                "• PVC Pipe — ₹88/kg → Stable\n"
                "• Cement — ₹380/bag ▲ +0.8%\n\n"
                f"<i>Updated: {datetime.now().strftime('%H:%M IST')}</i>"
            )
            return

        # /status
        if command == "/status":
            if not linked_user:
                await telegram_service.send_message(chat_id, "⚠️ Not linked. Send /start to link.")
            else:
                icon = "✅" if linked_user.is_active else "❌"
                await telegram_service.send_message(
                    chat_id,
                    f"👤 <b>Account Status</b>\n\n"
                    f"Name: {linked_user.name}\n"
                    f"Email: {linked_user.email}\n"
                    f"Role: {linked_user.role}\n"
                    f"Status: {icon} {'Active' if linked_user.is_active else 'Inactive'}\n"
                    f"Linked: {linked_user.telegram_linked_at.strftime('%d %b %Y') if linked_user.telegram_linked_at else 'Yes'}"
                )
            return

        # /track <order_id>
        if command == "/track":
            if not linked_user:
                await telegram_service.send_message(chat_id, "⚠️ Not linked. Send /start.")
                return
            if len(parts) < 2:
                await telegram_service.send_message(chat_id, "Usage: /track <order_id>")
                return
            try:
                order_id = int(parts[1])
                order = db.query(OrderModel).filter(
                    OrderModel.id == order_id,
                    OrderModel.user_id == linked_user.id
                ).first()
                if not order:
                    await telegram_service.send_message(chat_id, f"❌ Order #{order_id} not found.")
                else:
                    await telegram_service.send_message(
                        chat_id,
                        f"🔍 <b>Order #{order.id} Tracking</b>\n\n"
                        f"Status: <b>{order.status}</b>\n"
                        f"Payment: {order.payment_status}\n"
                        f"Tracking #: {order.tracking_number or 'Not assigned'}\n"
                        f"Amount: ₹{order.final_amount}\n"
                        f"Est. Delivery: {order.estimated_delivery.strftime('%d %b %Y') if order.estimated_delivery else 'TBD'}"
                    )
            except ValueError:
                await telegram_service.send_message(chat_id, "❌ Invalid order ID.")
            return

        # Unknown command
        if command.startswith("/"):
            await telegram_service.send_message(
                chat_id,
                f"❓ Unknown command <code>{command}</code>\n\nType /help to see available commands."
            )
            return

        # Natural language fallback
        if linked_user:
            text_lower = text.lower()
            if any(w in text_lower for w in ["my orders", "purchases", "order history"]):
                orders = db.query(OrderModel).filter(
                    OrderModel.user_id == linked_user.id
                ).order_by(OrderModel.created_at.desc()).limit(3).all()
                if orders:
                    lines = ["📦 <b>Your Recent Orders</b>\n"]
                    for o in orders:
                        lines.append(f"• Order #{o.id} — ₹{o.final_amount} — {o.status}")
                    await telegram_service.send_message(chat_id, "\n".join(lines))
                else:
                    await telegram_service.send_message(chat_id, "📦 No orders yet.")
            elif any(w in text_lower for w in ["price", "market", "rate"]):
                await telegram_service.send_message(chat_id, "Try /latestprice for market data!")
            else:
                await telegram_service.send_message(
                    chat_id,
                    f"👋 Hi {linked_user.name}! Type /help to see what I can do."
                )
        else:
            await telegram_service.send_message(
                chat_id,
                "Hello! 👋 Send /start to link your StartupKart account."
            )


async def main():
    if not settings.TELEGRAM_BOT_TOKEN or settings.TELEGRAM_BOT_TOKEN == "YOUR_TELEGRAM_BOT_TOKEN":
        print("❌ TELEGRAM_BOT_TOKEN not set in .env. Exiting.")
        return

    logger.info("🚀 StartupKart Telegram Bot started (long polling)")
    logger.info(f"   Bot: @{settings.TELEGRAM_BOT_USERNAME}")

    offset = None
    while True:
        try:
            updates = await telegram_service.get_updates(offset)

            for update in updates:
                offset = update["update_id"] + 1
                if update.get("message"):
                    await handle_update(update)

            if not updates:
                await asyncio.sleep(1)

        except KeyboardInterrupt:
            logger.info("Bot stopped.")
            break
        except Exception as e:
            import traceback
            logger.error(f"Error in bot loop: {e}")
            logger.error(traceback.format_exc())
            await asyncio.sleep(5)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nBot stopped by user.")
