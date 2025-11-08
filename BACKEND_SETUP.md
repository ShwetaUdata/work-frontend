# Backend Setup Guide

This application requires a backend server to handle authentication and data storage. Your `server.js` file is located in the uploaded files.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Set Up Backend Directory

Create a separate directory for your backend:

```bash
mkdir backend
cd backend
```

### 2. Copy Server File

Copy your `server.js` file from the uploaded files to the backend directory.

### 3. Initialize Backend

```bash
npm init -y
```

### 4. Install Dependencies

```bash
npm install express sqlite3 cors bcrypt
```

### 5. Update package.json

Add this to your `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  }
}
```

### 6. Run the Backend

```bash
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Configuration

### 1. Create Environment File

In your frontend root directory, create a `.env` file:

```bash
VITE_API_URL=http://localhost:5000
```

### 2. Run Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## Default Users

The backend automatically creates these test users:

| Username | Password | Role     | Type     |
|----------|----------|----------|----------|
| alice    | 123      | employee | software |
| admin    | admin    | admin    | software |

## API Endpoints

- `POST /api/login` - User authentication
- `POST /api/update-user-type` - Update user project type
- `GET /api/work-updates/:username` - Get user's work updates
- `POST /api/work-update` - Create work update
- `PUT /api/work-update/:id` - Update work update
- `DELETE /api/work-update/:id` - Delete work update
- `GET /api/all-users` - Get all users (admin)
- `GET /api/all-work-updates` - Get all work updates (admin)

## Database

The application uses SQLite and automatically creates a `database.db` file in the backend directory.

## Deployment

For production deployment, you'll need to:

1. Deploy the backend to a service like Heroku, Railway, or DigitalOcean
2. Update `VITE_API_URL` to point to your deployed backend URL
3. Update CORS settings in `server.js` to allow your frontend domain
4. Use environment variables for sensitive configuration

## Alternative: Use Lovable Cloud

Instead of managing a separate backend, consider using **Lovable Cloud** for a fully integrated backend solution with:
- Built-in authentication
- PostgreSQL database
- Automatic scaling
- No separate deployment needed

To enable Lovable Cloud, click the Cloud tab in your Lovable project.
