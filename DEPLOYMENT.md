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

## 8. Updating the Application

When you push changes to your repository, follow these steps to update your server.

### Update Frontend Only
If you only changed frontend code (`apps/web`):

```bash
# 1. Pull the latest changes
git pull

# 2. Rebuild and restart ONLY the web container
sudo docker compose up -d --build --no-deps web
```

### Update Backend Only
If you only changed backend code (`apps/api`):

```bash
# 1. Pull the latest changes
git pull

# 2. Rebuild and restart ONLY the api container
sudo docker compose up -d --build --no-deps api
```

### Update Everything
If you changed both or updated dependencies:

```bash
# 1. Pull the latest changes
git pull

# 2. Rebuild and restart all containers
sudo docker compose up -d --build
```

## 9. Troubleshooting

### Authentication Failed (MongoDB)
If you see `Error: Authentication failed` in the API logs, it usually means the database was initialized with different credentials than what is currently in your `.env` file. To fix this, you need to wipe the database volume and restart.

**WARNING: This will delete all data in the database.**

```bash
# Stop containers and remove volumes (wipes the DB)
sudo docker compose down -v

# Rebuild and start fresh
sudo docker compose up -d --build
```

### URI Error
If you see `Error: URI error`, check your `.env` file for:
1.  **Special Characters**: Ensure your `MONGO_PASSWORD` does not contain special characters like `@`, `:`, `/`, `#`. If it does, URL-encode them.
2.  **Missing Variables**: Ensure `MONGO_USER` and `MONGO_PASSWORD` are set.

After fixing `.env`, recreate the container:
```bash
sudo docker compose up -d --force-recreate api
```
