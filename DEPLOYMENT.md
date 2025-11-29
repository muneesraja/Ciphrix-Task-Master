# Deploy to Debian Server

This guide assumes you have a Debian server with Docker and Git installed.

## 1. Prepare the Server

Ensure Docker and the Docker Compose plugin are installed and running.

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin git
sudo systemctl enable --now docker
```

## 2. Clone the Repository

Clone the project to your server.

```bash
git clone <your-repo-url> taskmaster
cd taskmaster
```

## 3. Configure Environment Variables

Create a `.env` file from the example.

```bash
cp .env.example .env
```

Edit the `.env` file with your production values.

```bash
nano .env
```

**Important:**
- Change `MONGO_PASSWORD` to a strong, unique password.
- Set `JWT_SECRET` to a long, random string.
- Update `CORS_ORIGIN` to match your server's domain or IP (e.g., `http://your-server-ip:5002`).

## 4. Deploy the Application

Build and start the containers.

```bash
sudo docker compose up -d --build
```

## 5. Verify Deployment

Check the status of the containers.

```bash
sudo docker compose ps
```

View the logs if needed.

```bash
sudo docker compose logs -f
```

## 6. Access the Application

- **Frontend**: `http://<your-server-ip>:5002`
- **API**: `http://<your-server-ip>:5001`

## 7. (Optional) Security Tips

- **Firewall**: Use `ufw` to allow only necessary ports (e.g., 5002, 22).
- **Reverse Proxy**: For a production setup, consider setting up Nginx as a reverse proxy on port 80/443 to forward traffic to port 5002.
