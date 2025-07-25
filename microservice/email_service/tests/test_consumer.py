import json
import pytest
from unittest.mock import patch, MagicMock
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app import consumer


@patch("app.consumer.send_email")
def test_callback_sends_email(mock_send_email):
    # Arrange
    test_email = "user@example.com"
    test_message = "Test appointment"
    mock_channel = MagicMock()
    mock_method = MagicMock()
    mock_properties = MagicMock()
    test_body = json.dumps({"email": test_email, "message": test_message})

    # Act
    consumer.callback(mock_channel, mock_method, mock_properties, test_body)

    # Assert
    mock_send_email.assert_called_once_with(test_email, test_message)


@patch("app.consumer.send_email")
def test_callback_handles_missing_fields(mock_send_email):
    test_body = json.dumps({"email": "user@example.com"})  # No message
    consumer.callback(None, None, None, test_body)
    mock_send_email.assert_not_called()


@patch("app.consumer.send_email", side_effect=Exception("Email error"))
def test_callback_handles_send_email_error(mock_send_email):
    test_body = json.dumps({"email": "user@example.com", "message": "fail test"})
    consumer.callback(None, None, None, test_body)
    mock_send_email.assert_called_once()
