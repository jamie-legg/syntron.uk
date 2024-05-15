FROM codefossa/armagetronad:latest

WORKDIR /app

# Copy the requirements.txt file into the image
COPY requirements.txt .

# Install the dependencies
RUN apt-get update && \
    apt-get install -y python3-pip && \
    pip3 install -r requirements.txt

# Copy the rest of your application code
COPY . .

# Ensure the correct entrypoint if needed
CMD ["python3", "server/scripts/script.py"]
