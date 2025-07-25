import pytest
from unittest.mock import patch
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app import email_sender

@patch("smtplib.SMTP_SSL")
def test_send_email_success(mock_smtp):
    instance = mock_smtp.return_value.__enter__.return_value

    email_sender.send_email("baratalihassanzada1378@gmail.com", "Hello!")

    instance.login.assert_called_once_with(email_sender.EMAIL_USER, email_sender.EMAIL_PASS)
    instance.send_message.assert_called_once()


@patch("smtplib.SMTP_SSL", side_effect=Exception("SMTP error"))
def test_send_email_failure(mock_smtp):
    try:
        email_sender.send_email("bad@example.com", "This will fail")
    except Exception:
        pytest.fail("send_email() should handle exceptions internally")