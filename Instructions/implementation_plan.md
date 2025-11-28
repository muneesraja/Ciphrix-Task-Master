# Implementation Plan - MERN Task Management App

## Goal
Build a full-stack Task Management Application using the MERN stack within a Monorepo architecture. The app will feature role-based authentication (Admin/User), task management (CRUD), and a modern UI with Dark/Light mode. We will use `concurrently` to run multiple applications simultaneously.

## User Review Required
- **Tailwind CSS v4**: We will use the latest available version of Tailwind CSS v4.
- **Monorepo Structure**: We will use **Bun workspaces** with `concurrently` for running scripts.
- **Docker**: A `docker-compose.yml` will be created for easy deployment to a VPS.

## Proposed Changes

### Architecture (Bun Monorepo)
- `apps/web`: Frontend application (React, Vite).
- `apps/api`: Backend application (Express, Node.js).
- Root `package.json`: Uses `concurrently` to run both web and api in development.

### Backend (`apps/api`)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT-based authentication.
    - `POST /auth/signup`: Register new user.
    - `POST /auth/signin`: Login user.
- **Tasks API**:
    - `GET /tasks`: List tasks (pagination).
    - `POST /tasks`: Create task.
    - `PUT /tasks/:id`: Update task.
    - `DELETE /tasks/:id`: Delete task (Admin only).
- **Middleware**: Auth middleware, Role check middleware.

### Frontend (`apps/web`)
- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4 + Shadcn UI (installed directly in web app)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Pages**:
    - `/signin`: Login page.
    - `/signup`: Registration page.
    - `/dashboard`: Main task list with pagination.
    - `/tasks/new`: Add task.
    - `/tasks/:id/edit`: Edit task.
- **Features**:
    - Dark/Light theme switcher.
    - Admin-only delete button visibility.

### UI/UX
- **Theme**: Dark/Light mode switcher.
- **Design**: Responsive, modern aesthetic based on provided references.

## Verification Plan
### Automated Tests
- Run `bun run build` to verify build success.
- Run linting scripts.

### Manual Verification
1. **Auth**: Register Admin and Normal User. Login with both.
2. **Tasks**:
    - Create task as User.
    - Edit task as User.
    - Verify User cannot see Delete button.
    - Login as Admin.
    - Verify Admin can see Delete button and delete tasks.
3. **Theme**: Toggle Dark/Light mode and verify UI consistency.
4. **Docker**: Run `docker-compose up` and verify app accessibility.
