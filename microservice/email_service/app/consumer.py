import json
import pika
from app.config import RABBITMQ_HOST, RABBITMQ_QUEUE
from app.email_sender import send_email


def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        email = data.get("email")
        message = data.get("message")
        if email and message:
            send_email(email, message)
        else:
            print("⚠️ Invalid message format:", data)
    except Exception as e:
        print("❌ Error processing message:", e)


def start_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
    channel = connection.channel()

    channel.queue_declare(queue=RABBITMQ_QUEUE, durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=RABBITMQ_QUEUE, on_message_callback=callback, auto_ack=True)

    print("📬 Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()
