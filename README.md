# TaskMaster - MERN Stack Task Management Application

TaskMaster is a modern, responsive task management application built with the MERN stack (MongoDB, Express, React, Node.js). It features a robust authentication system with role-based access control, a sleek dark-themed UI, and a monorepo architecture managed by Bun.

## 🚀 Features

-   **Authentication**: Secure Sign Up and Sign In with JWT.
-   **Role-Based Access Control (RBAC)**:
    -   **Admin**: Can create, update, and delete *any* task.
    -   **User**: Can create and update their own tasks.
-   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
-   **Responsive Design**: Fully responsive UI with a mobile-friendly sidebar.
-   **Dark/Light Mode**: Built-in theme switcher with persistent state.
-   **Modern UI**: Built with Tailwind CSS v4 and Shadcn UI components.
-   **Dockerized**: Ready for deployment with Docker and Docker Compose.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, Zustand (State Management), Axios.
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.
-   **Tooling**: Bun (Package Manager & Monorepo), Docker, Docker Compose.

## 📂 Project Structure

This project uses a Monorepo structure:

```
├── apps
│   ├── api          # Backend Express Application
│   └── web          # Frontend React Application
├── docker-compose.yml
├── package.json
└── README.md
```

## ⚡ Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) (v1.0+)
-   [Docker](https://www.docker.com/) & Docker Compose (for containerized run)
-   MongoDB (if running locally without Docker)

### Option 1: Run with Docker (Recommended)

This will spin up the Frontend, Backend, and MongoDB database in containers.

1.  Clone the repository.
2.  Run the following command in the root directory:

```bash
docker-compose up --build
```

-   **Frontend**: http://localhost:80
-   **Backend**: http://localhost:5001

### Option 2: Run Locally

#### 1. Setup Backend

Create a `.env` file in `apps/api/`:

```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key
```

#### 2. Setup Frontend

The frontend is configured to look for the API at `http://localhost:5001` or via `VITE_API_URL`.

#### 3. Install Dependencies & Run

From the root directory:

```bash
# Install dependencies for all workspaces
bun install

# Run both frontend and backend concurrently
bun dev
```

-   **Frontend**: http://localhost:5173
-   **Backend**: http://localhost:5001

## 🔌 API Endpoints

### Authentication
-   `POST /api/auth/signup` - Register a new user (Role: 'user' or 'admin')
-   `POST /api/auth/signin` - Login and receive JWT

### Tasks
-   `GET /api/tasks` - Get all tasks (Pagination supported: `?page=1&limit=5`)
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks/:id` - Update a task
-   `DELETE /api/tasks/:id` - Delete a task (Admin only)

## 📸 Screenshots

*(Add screenshots of Dashboard, Sign In, and Sign Up pages here)*

## 📄 License

MIT
