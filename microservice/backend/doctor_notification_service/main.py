import redis
import json


def listen_to_notifications():
    # Connect to your Redis instance
    r = redis.Redis(host='localhost', port=6379, db=0)  # Adjust if using a remote Redis or password

    # Create a pubsub object
    pubsub = r.pubsub()

    # Subscribe to the "notifications" channel
    pubsub.subscribe("notifications")

    print("✅ Listening for notifications...")

    # Listen for new messages
    for message in pubsub.listen():
        if message["type"] == "message":
            try:
                data = json.loads(message["data"])
                print("🔔 New notification received:")
                print(f"User Type: {data['userType']}")
                print(f"User ID: {data['userId']}")
                print(f"Message: {data['message']}")
            except Exception as e:
                print("❌ Error parsing message:", e)


def main():
    try:
        listen_to_notifications()
    except KeyboardInterrupt:
        print("\n🛑 Exiting subscriber.")
    except Exception as e:
        print("❌ Fatal error occurred:", e)


if __name__ == "__main__":
    main()
