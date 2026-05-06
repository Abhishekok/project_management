# TaskFlow - Full-Stack Team Task Manager

A robust, modern Team Task Manager built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **Authentication**: Secure Signup and Login with JWT.
- **Role-Based Access Control (RBAC)**: 
  - **Admins** can create projects and assign tasks to members.
  - **Members** can view their tasks and update statuses.
- **Dashboard**: Visual statistics of tasks (Todo, In Progress, Done, Overdue).
- **Beautiful UI**: Highly aesthetic UI built with pure Vanilla CSS, utilizing glassmorphism and smooth animations.

## Local Setup

### 1. Database
Ensure you have MongoDB running locally or a MongoDB Atlas URI.

### 2. Backend
Navigate to the `backend` folder and set up your `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```
Then run:
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
Navigate to the `frontend` directory and set up `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```
Then run:
```bash
cd frontend
npm install
npm run dev
```

## Deployment to Railway

This repository is configured as a monorepo for easy deployment to [Railway](https://railway.app/).

1. Push this repository to GitHub.
2. Go to Railway and create a new project from your GitHub repository.
3. In Railway Variables, add:
   - `MONGO_URI` (your production database)
   - `JWT_SECRET` (a random secure string)
   - `NODE_ENV` = `production`
4. The provided `railway.toml` and root `package.json` will automatically build the React frontend and start the Express server, which serves both the API and the static frontend files.

## Project Structure
- `backend/`: Express Server, Mongoose Models, Controllers, and RBAC Middleware.
- `frontend/`: Vite React App with Context API for state management and Vanilla CSS for styling.
