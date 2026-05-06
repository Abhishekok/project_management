# Taski-Task_management

A robust, modern Team Task Manager made with (MongoDB, Express, React, Node.js). 

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
