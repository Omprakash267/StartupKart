from celery import Celery
from app.core.config import settings
import os

# Get Redis URL from environment or use default
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")

# Create Celery app
celery_app = Celery(
    "startupkart",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
    include=[
        "app.tasks.email_tasks",
        "app.tasks.price_tasks",
        "app.tasks.notification_tasks"
    ]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Task routing
celery_app.conf.task_routes = {
    "app.tasks.email_tasks.*": {"queue": "emails"},
    "app.tasks.price_tasks.*": {"queue": "prices"},
    "app.tasks.notification_tasks.*": {"queue": "notifications"},
}

# Beat schedule for periodic tasks
celery_app.conf.beat_schedule = {
    "update-market-prices": {
        "task": "app.tasks.price_tasks.update_market_prices",
        "schedule": 300.0,  # Every 5 minutes
    },
    "check-price-alerts": {
        "task": "app.tasks.price_tasks.check_price_alerts",
        "schedule": 60.0,  # Every minute
    },
}

if __name__ == "__main__":
    celery_app.start()
