import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "templates", "email_template.html")

def send_email(to_email, message, subject="Notification"):
    try:
        # Read HTML template
        with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # Replace placeholders
        html_content = html_content.replace("{{subject}}", subject)
        html_content = html_content.replace("{{message}}", message)

        # Create email
        msg = MIMEMultipart("alternative")
        msg["From"] = os.getenv("EMAIL_USER")
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(MIMEText(html_content, "html"))

        # Send email
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
        server.sendmail(os.getenv("EMAIL_USER"), to_email, msg.as_string())
        server.quit()

        print(f"✅ Email sent to {to_email}")

    except Exception as e:
        print(f"❌ Failed to send email: {e}")
