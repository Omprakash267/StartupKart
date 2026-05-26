# StartupKart - Quick Start Guide

## 🚀 Running the Application

### 1. Start Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```
Backend will run on: http://localhost:8000
API Docs: http://localhost:8000/docs

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:8081 (or next available port)

### 3. Start Celery Worker (Optional - for emails & background tasks)
```bash
cd backend
celery -A celery_app worker --beat --loglevel=info
```

### 4. Start Redis (Required for real-time features)
```bash
# Windows (if Redis installed)
redis-server

# Or use Docker
docker run -d -p 6379:6379 redis:latest
```

## 📝 Environment Setup

1. Copy `.env.example` to `.env` in backend directory
2. Update the following variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `SECRET_KEY` - Generate a secure random key
   - `SMTP_USER` and `SMTP_PASSWORD` - For email functionality
   - `REDIS_HOST` - Usually `localhost`

## 🧪 Testing Real-Time Features

### WebSocket Connections
1. Open browser to http://localhost:8081
2. Login to your account
3. Open browser console (F12)
4. WebSocket connections will auto-establish for:
   - Live prices
   - Order updates
   - Notifications
   - Dashboard metrics

### Test Checkout Flow
1. Add items to cart
2. Navigate to `/cart`
3. Click "Proceed to Checkout"
4. Fill in address details
5. Select payment method
6. Place order
7. Check email for confirmation (if SMTP configured)

### Test Notifications
1. Look for notification bell icon (top right)
2. Badge shows unread count
3. Click to view notifications
4. Mark as read or mark all as read

## 🔧 Troubleshooting

### Backend won't start
- Make sure you're in the `backend` directory
- Check if port 8000 is already in use
- Verify virtual environment is activated

### Frontend won't start
- Run `npm install` first
- Check if port 5173/8081 is available
- Clear node_modules and reinstall if needed

### WebSocket not connecting
- Ensure backend is running
- Check browser console for errors
- Verify CORS settings in backend

### Emails not sending
- Configure SMTP settings in `.env`
- Start Celery worker
- Check Celery logs for errors

## 📚 API Documentation

Visit http://localhost:8000/docs for interactive API documentation with all endpoints.

## 🎯 Key Features Implemented

✅ Real-time WebSocket connections
✅ Flipkart-style checkout flow
✅ Email automation system
✅ Notification system with bell
✅ Smart Buy Assistant
✅ Price update scheduler
✅ Multi-step order wizard
✅ Protected routes with JWT auth

## 🔗 Important URLs

- Frontend: http://localhost:8081
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- WebSocket Status: http://localhost:8000/api/v1/ws/status
