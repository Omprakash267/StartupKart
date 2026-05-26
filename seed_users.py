"""
Simple database seeder - ensures admin and test users exist for login
"""
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent))

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User
import uuid

def seed_users():
    """Create admin and test users if they don't exist"""
    db = SessionLocal()
    
    try:
        print("🔧 Checking/creating login users...")
        
        # Check if admin exists
        admin = db.query(User).filter(User.email == "admin@startupkart.com").first()
        if not admin:
            admin = User(
                id=uuid.uuid4(),
                name="Admin User",
                email="admin@startupkart.com",
                password_hash=get_password_hash("admin123"),
                role="ADMIN",
                is_active=True
            )
            db.add(admin)
            print("✅ Created admin user")
        else:
            print("ℹ️  Admin user already exists")
        
        # Check if test user exists
        test_user = db.query(User).filter(User.email == "user1@test.com").first()
        if not test_user:
            test_user = User(
                id=uuid.uuid4(),
                name="Test User",
                email="user1@test.com",
                password_hash=get_password_hash("password123"),
                role="USER",
                is_active=True
            )
            db.add(test_user)
            print("✅ Created test user")
        else:
            print("ℹ️  Test user already exists")
        
        db.commit()
        
        print("\n📝 Login Credentials:")
        print("   Admin: admin@startupkart.com / admin123")
        print("   User:  user1@test.com / password123")
        print("\n✅ Database ready for login!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()
