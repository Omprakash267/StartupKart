import sys, traceback
sys.path.insert(0, '.')

from app.core.database import Base, engine

from app.models.user import User
from app.models.product import Product
from app.models.price_history import PriceHistory
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.cart import Cart, CartItem
from app.models.verification import EmailVerification, PhoneVerification

print("SA tables:", sorted(Base.metadata.tables.keys()))

# Create ALL tables (safe - won't overwrite existing)
Base.metadata.create_all(bind=engine)
print("create_all done")

# Verify DB now
import sqlite3
conn = sqlite3.connect('startupkart.db')
cur = conn.cursor()
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
tables = [r[0] for r in cur.fetchall()]
print("DB tables:", sorted(tables))
conn.close()

# Now try the full order flow
from app.core.database import SessionLocal
from app.services.cart_service import cart_service
from app.models.order import Order as OrderModel
from app.models.order_item import OrderItem as OI
from datetime import datetime, timedelta
import random, string

db = SessionLocal()
try:
    user = db.query(User).filter(User.email == 'srinath_test@gmail.com').first()
    print(f"\nUser: {user.email}")
    
    cart_data = cart_service.get_cart_with_items(db, user.id)
    print(f"Cart: {len(cart_data['items'])} items, total={cart_data['total']}")
    
    if not cart_data['items']:
        print("Cart empty - adding item")
        cart_service.add_to_cart(db, user.id, 1, 1)
        cart_data = cart_service.get_cart_with_items(db, user.id)
    
    order = OrderModel(
        user_id=user.id,
        total_amount=cart_data['subtotal'],
        gst_amount=cart_data['gst_amount'],
        shipping_amount=cart_data['shipping_amount'],
        discount_amount=0.0,
        final_amount=cart_data['total'],
        customer_email='test@test.com',
        customer_phone='9876543210',
        address_line1='123 Test St',
        city='Chennai',
        state='Tamil Nadu',
        postal_code='600001',
        country='India',
        email_verified=False,
        phone_verified=False,
        status='PENDING',
        payment_status='PENDING',
        tracking_number='SKTEST123',
        estimated_delivery=datetime.utcnow() + timedelta(days=7)
    )
    db.add(order)
    db.flush()
    print(f"Order created: id={order.id}")
    
    for item in cart_data['items']:
        oi = OI(
            order_id=order.id,
            product_id=item['product_id'],
            product_name=item.get('product_name', ''),
            quantity=item['quantity'],
            price=item['price'],
            gst_rate=item.get('gst_rate', 0) or 0,
            gst_amount=item.get('gst_amount', 0) or 0,
            total_price=item.get('item_total', 0) or 0,
        )
        db.add(oi)
    
    db.commit()
    print("SUCCESS! Order flow works end-to-end.")
except Exception as e:
    db.rollback()
    traceback.print_exc()
finally:
    db.close()
