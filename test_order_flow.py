import httpx
import json

base = 'http://localhost:8000/api/v1'

# 1. Login
r = httpx.post(f'{base}/auth/login/json', json={'email': 'srinath_test@gmail.com', 'password': 'password123'}, timeout=6)
print(f'1. Login: {r.status_code}')
if r.status_code != 200:
    print(r.text)
    exit(1)
token = r.json()['access_token']
headers = {'Authorization': f'Bearer {token}'}

# 2. Add to cart
httpx.post(f'{base}/cart/items', json={'product_id': 1, 'quantity': 2}, headers=headers, timeout=5)
cart = httpx.get(f'{base}/cart/', headers=headers, timeout=5).json()
print(f'2. Cart: {len(cart.get("items", []))} items, total={cart.get("total")}')

# 3. Create order
order_payload = {
    'customer_email': 'srinath_test@gmail.com',
    'customer_phone': '9876543210',
    'address': {
        'address_line1': '123 Test Street',
        'city': 'Chennai',
        'state': 'Tamil Nadu',
        'postal_code': '600001'
    }
}
r2 = httpx.post(f'{base}/orders-v2/', json=order_payload, headers=headers, timeout=15)
print(f'3. Create Order: {r2.status_code}')
if r2.status_code != 200:
    print(f'   Error: {r2.text[:400]}')
else:
    order = r2.json()
    order_id = order['id']
    print(f'   Order ID: {order_id}, Status: {order["status"]}')
    mock_otp = order.get('mock_otp')

    # 4. Send email OTP
    r3 = httpx.post(f'{base}/verification/send-email-otp', json={'email': 'srinath_test@gmail.com'}, headers=headers, timeout=10)
    print(f'4. Send OTP: {r3.status_code}')
    otp_data = r3.json() if r3.status_code == 200 else {}
    print(f'   Response: {json.dumps(otp_data, default=str)[:200]}')
    otp = otp_data.get('mock_otp')
    if not otp and otp_data.get('mock_otp'):
        otp = otp_data['mock_otp']

    if otp:
        # 5. Verify OTP
        r4 = httpx.post(f'{base}/verification/verify-email', json={'email': 'srinath_test@gmail.com', 'otp': str(otp)}, headers=headers, timeout=10)
        print(f'5. Verify OTP ({otp}): {r4.status_code}')
        print(f'   Response: {r4.text[:200]}')
    else:
        print(f'   No mock OTP available, checking otp_data: {otp_data}')
