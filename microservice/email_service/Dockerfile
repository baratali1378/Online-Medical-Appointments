# Use Python as base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy service code
COPY . .

# Expose a port if your service has an API (optional)
# EXPOSE 5000

# Run the email service (listener for RabbitMQ)
CMD ["python", "main.py"]
