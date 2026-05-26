
"""
Enhanced Seed Script for StartupKart v2.0
Populates database with comprehensive dynamic data
"""

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from datetime import datetime, timedelta
from app.core.database import SessionLocal, engine, Base
from app.core.security import get_password_hash
# Import all models to ensure they are registered with Base
from app.models.user import User
from app.models.product import Product
from app.models.price_history import PriceHistory
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.payment import Payment
from app.models.gst_record import GSTRecord
from app.models.invoice import Invoice
from app.models.notification import Notification
from app.models.recommendation import Recommendation
from app.models.price_alert import PriceAlert
import uuid
import random
import math
import os

def seed_database():
    print(f"Using database at: {os.path.abspath('startupkart.db')}")
    
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("="*60)
        print("StartupKart v2.0 - Database Seeding")
        print("="*60)
        
        # Clear existing data to avoid conflicts
        print("\n[0/8] Cleaning existing data...")
        db.query(PriceAlert).delete()
        db.query(Recommendation).delete()
        db.query(Notification).delete()
        db.query(Invoice).delete()
        db.query(Payment).delete()
        db.query(OrderItem).delete()
        db.query(Order).delete()
        db.query(PriceHistory).delete()
        db.query(Product).delete()
        db.query(User).delete()
        db.commit()
        
        # 1. Create Admin User
        print("\n[1/8] Creating users...")
        admin = User(
            id=uuid.uuid4(),
            name="Admin User",
            email="admin@startupkart.com",
            password_hash=get_password_hash("admin123"),
            role="ADMIN",
            is_active=True
        )
        db.add(admin)
        
        # Create Test Users
        users = []
        for i in range(5):
            user = User(
                id=uuid.uuid4(),
                name=f"Test User {i+1}",
                email=f"user{i+1}@test.com",
                password_hash=get_password_hash("password123"),
                role="USER",
                is_active=True
            )
            db.add(user)
            users.append(user)
        
        db.commit()
        print(f"    Created 1 admin + {len(users)} test users")
        
        # 2. Create Products
        print("\n[2/8] Creating products (100+ matching frontend)...")
        
        # Primary products from sampleProducts.ts (first 5 of each major category)
        products_to_seed = [
            # Cotton (ID 1-5)
            (1, "Raw Cotton Grade A", "Cotton", "Grade A", 62450.0, 0.05),
            (2, "Organic Cotton Premium", "Cotton", "Premium", 75200.0, 0.05),
            (3, "Combed Cotton Fine", "Cotton", "Quality", 68900.0, 0.05),
            (4, "Egyptian Cotton Long Staple", "Cotton", "Luxury", 95000.0, 0.05),
            (5, "Pima Cotton Superior", "Cotton", "Premium+", 88500.0, 0.05),
            
            # Silk (ID 26-28)
            (26, "Mulberry Silk Premium", "Silk", "Premium", 4850.0, 0.12),
            (27, "Tussar Silk Natural", "Silk", "Standard", 3200.0, 0.12),
            (28, "Eri Silk Peace Silk", "Silk", "Ahimsa", 2800.0, 0.12),
            
            # Wool (ID 46-47)
            (46, "Merino Wool Blend", "Wool", "Fine", 1234.0, 0.05),
            (47, "Cashmere Wool Premium", "Wool", "Lux", 8500.0, 0.05),
            
            # Jute (ID 66-67)
            (66, "Golden Jute Fiber", "Jute", "Golden", 5670.0, 0.05),
            (67, "White Jute Premium", "Jute", "Premium", 6200.0, 0.05),
            
            # Linen (ID 81-82)
            (81, "Belgian Linen", "Linen", "Export", 890.0, 0.12),
            (82, "Irish Linen Heritage", "Linen", "Luxury", 1050.0, 0.12),
            
            # Synthetic (ID 96-97)
            (96, "Polyester Fiber 100D", "Synthetic", "Standard", 145.0, 0.18),
            (97, "Nylon 6 Filament", "Synthetic", "Industrial", 285.0, 0.18),
        ]
        
        products = []
        for pid, name, cat, qual, price, gst in products_to_seed:
            product = Product(
                id=pid,
                name=name,
                category=cat,
                quality=qual,
                current_price=price,
                gst_rate=gst,
                original_price=price * 1.1,
                in_stock=True,
                stock_quantity=1000
            )
            db.add(product)
            products.append(product)
            
        # Generate more products to reach 100+
        categories = ["Cotton", "Silk", "Wool", "Jute", "Linen", "Synthetic", "Blends"]
        modifiers = ["Premium", "Standard", "Economy", "Organic", "Recycled", "Industrial", "Handmade"]
        
        for i in range(101, 201):
            cat = categories[i % len(categories)]
            mod = modifiers[i % len(modifiers)]
            price = random.randint(100, 50000)
            
            product = Product(
                id=i,
                name=f"{mod} {cat} Material",
                category=cat,
                quality=mod,
                current_price=float(price),
                gst_rate=0.05 if cat != "Silk" and cat != "Synthetic" else 0.12,
                original_price=float(price * 1.15),
                in_stock=True,
                stock_quantity=random.randint(50, 500)
            )
            db.add(product)
            products.append(product)
        
        db.commit()
        print(f"    Created {len(products)} products (matching frontend IDs)")
        
        # 3. Create Price History
        print("\n[3/8] Generating 10-year price history...")
        total_records = 0
        
        for product in products:
            base_price = product.current_price
            
            # Generate weekly prices for last 10 years
            for days_ago in range(3650, 0, -7):
                date = datetime.utcnow() - timedelta(days=days_ago)
                
                # Add seasonality and trend
                year_progress = (date.month - 1) / 12
                seasonal_factor = 1 + (0.1 * math.sin(year_progress * 2 * math.pi))
                trend_factor = 1 + (days_ago / 3650 * random.uniform(-0.3, 0.2))
                noise = random.uniform(0.95, 1.05)
                
                price = base_price * seasonal_factor * trend_factor * noise
                
                price_hist = PriceHistory(
                    product_id=product.id,
                    price=round(price, 2),
                    date=date
                )
                db.add(price_hist)
                total_records += 1
        
        db.commit()
        print(f"    Created {total_records} price history records")
        
        # 4. Create Sample Orders
        print("\n[4/8] Creating sample orders...")
        orders_created = 0
        
        for user in users[:3]:  # First 3 users only
            for _ in range(3):
                order_date = datetime.utcnow() - timedelta(days=random.randint(1, 180))
                
                order = Order(
                    user_id=user.id,
                    total_amount=0.0,
                    gst_amount=0.0,
                    shipping_amount=0.0,
                    final_amount=0.0,
                    customer_email=user.email,
                    customer_phone="9999999999",
                    address_line1="123 Startup Lane",
                    city="Bangalore",
                    state="Karnataka",
                    postal_code="560001",
                    status="PAID",
                    created_at=order_date
                )
                db.add(order)
                db.flush()
                
                # Add 2 items per order
                order_total = 0.0
                order_gst = 0.0
                
                for product in random.sample(products, 2):
                    quantity = random.randint(1, 5)
                    price = product.current_price
                    subtotal = price * quantity
                    gst = subtotal * product.gst_rate
                    
                    order_item = OrderItem(
                        order_id=order.id,
                        product_id=product.id,
                        quantity=quantity,
                        price=price
                    )
                    db.add(order_item)
                    
                    order_total += (subtotal + gst)
                    order_gst += gst
                
                order.total_amount = round(order_total - order_gst, 2)
                order.gst_amount = round(order_gst, 2)
                order.final_amount = round(order_total, 2)
                
                # Create payment
                payment = Payment(
                    order_id=order.id,
                    transaction_id=f"pay_{uuid.uuid4().hex[:16]}",
                    gateway="TestGateway",
                    status="SUCCESS"
                )
                db.add(payment)
                
                # Create invoice
                invoice = Invoice(
                    order_id=order.id,
                    user_id=user.id,
                    invoice_number=f"SK-INV-{order.id:06d}",
                    subtotal=order.total_amount - order.gst_amount,
                    cgst=order.gst_amount / 2,
                    sgst=order.gst_amount / 2,
                    igst=0.0,
                    total_gst=order.gst_amount,
                    total_amount=order.total_amount,
                    invoice_date=order_date,
                    billing_address="Customer Address",
                    shipping_address="Customer Address",
                    status="GENERATED"
                )
                db.add(invoice)
                
                orders_created += 1
        
        db.commit()
        print(f"    Created {orders_created} orders with items and invoices")
        
        # 5. Create Notifications
        print("\n[5/8] Creating notifications...")
        for user in users:
            notif = Notification(
                user_id=user.id,
                type="SYSTEM",
                title="Welcome to StartupKart!",
                message="Start exploring our textile products and price analytics.",
                priority="NORMAL",
                category="SYSTEM"
            )
            db.add(notif)
        
        db.commit()
        print(f"    Created {len(users)} notifications")
        
        # 6. Create Recommendations
        print("\n[6/8] Creating recommendations...")
        recs = 0
        for user in users:
            for product in random.sample(products, 2):
                rec = Recommendation(
                    user_id=user.id,
                    product_id=product.id,
                    type="PRICE_DROP",
                    confidence_score=random.uniform(0.7, 0.95),
                    reason=f"Great price for {product.name}",
                    target_price=product.current_price,
                    current_price=product.current_price,
                    valid_until=datetime.utcnow() + timedelta(days=7),
                    ai_generated=False,
                    is_active=True
                )
                db.add(rec)
                recs += 1
        
        db.commit()
        print(f"    Created {recs} recommendations")
        
        # 7. Create Price Alerts
        print("\n[7/8] Creating price alerts...")
        alerts = 0
        for user in users:
            for product in random.sample(products, 2):
                alert = PriceAlert(
                    user_id=user.id,
                    product_id=product.id,
                    alert_type="BELOW",
                    target_price=product.current_price * 0.9,
                    is_active=True,
                    triggered=False
                )
                db.add(alert)
                alerts += 1
        
        db.commit()
        print(f"    Created {alerts} price alerts")
        
        print("\n[8/8] Database seeding complete!")
        print("\n" + "="*60)
        print("SUMMARY")
        print("="*60)
        print(f"Users: {len(users) + 1} (1 admin + {len(users)} regular)")
        print(f"Products: {len(products)}")
        print(f"Price History: {total_records}")
        print(f"Orders: {orders_created}")
        print(f"Notifications: {len(users)}")
        print(f"Recommendations: {recs}")
        print(f"Price Alerts: {alerts}")
        print("\nLogin Credentials:")
        print("  Admin: admin@startupkart.com / admin123")
        print("  User: user1@test.com / password123")
        print("="*60)
        
    except Exception as e:
        print(f"\nERROR during seeding: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
