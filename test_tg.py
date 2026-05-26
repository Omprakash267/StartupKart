import httpx
import asyncio
import sys

TOKEN = "8014108945:AAE48WktWgImBufmHlRPv8jIHgBXT0JqDKE"
BASE_URL = f"https://api.telegram.org/bot{TOKEN}"

async def test_connection():
    async with httpx.AsyncClient() as client:
        try:
            print(f"Testing connectivity to {BASE_URL}/getMe")
            response = await client.get(f"{BASE_URL}/getMe")
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text}")
            
            # Check for existing webhooks
            print("\nChecking webhook info...")
            response = await client.get(f"{BASE_URL}/getWebhookInfo")
            print(f"Webhook Info: {response.text}")
            
            # Try to delete webhook just in case
            if response.status_code == 200:
                info = response.json().get("result", {})
                if info.get("url"):
                    print("\nWebhook is set! Deleting webhook to enable long polling...")
                    del_response = await client.get(f"{BASE_URL}/deleteWebhook")
                    print(f"Delete Webhook Result: {del_response.text}")
            
        except Exception as e:
            print(f"Error connecting to Telegram: {type(e).__name__}: {e}")

if __name__ == "__main__":
    asyncio.run(test_connection())
