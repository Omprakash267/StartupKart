"""
StartupKart Celery Worker Startup Script

Run this to start the Celery worker for background tasks:
    celery -A celery_app worker --loglevel=info

Run this to start the Celery beat scheduler (for periodic tasks):
    celery -A celery_app beat --loglevel=info

Or run both together:
    celery -A celery_app worker --beat --loglevel=info
"""

from celery_app import celery_app

if __name__ == "__main__":
    celery_app.start()
