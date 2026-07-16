# RecipeNest

RecipeNest is a simple recipe sharing app with a frontend built using HTML, CSS, and Vanilla JavaScript, plus a beginner-friendly Node.js and Express backend connected to MongoDB with Mongoose.

## Features

- Browse recipes on the frontend
- Register a new user account
- Log in with email and password
- Store users in MongoDB
- Save the logged-in session with Express sessions
- Load and manage recipes through the existing backend routes

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- ODM: Mongoose
- Password hashing: bcryptjs
- Session handling: express-session

## Folder Structure

- `server.js` - starts the app and connects the database
- `backend/app.js` - Express app setup and routes
- `backend/config/db.js` - MongoDB connection and recipe seed data
- `backend/controllers/` - auth and recipe controller logic
- `backend/models/` - Mongoose models for users and recipes
- `backend/routes/` - API routes
- `backend/middleware/` - session auth check
- `frontend/` - all HTML, CSS, and JavaScript files for the UI

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a MongoDB database locally or use MongoDB Atlas.

3. Set your environment variable before starting the app.

## Environment Variables

The backend reads the following environment variable:

- `MONGO_URL` - MongoDB connection string

The app also accepts `MONGODB_URI` as a fallback.

Example:

```bash
MONGO_URL=mongodb://127.0.0.1:27017/recipenest
PORT=3000
```

Example templates are included in:

- `backend/.env.example`
- `frontend/.env.example`

Only the backend env file is required for MongoDB Atlas. The frontend example is optional and is only useful if you later host the frontend separately.

## MongoDB Setup

If you are using local MongoDB, make sure the MongoDB service is running and the database URL points to your local instance.

If you are using MongoDB Atlas, create a cluster, copy the connection string, and set it as `MONGO_URL`.

## How to Run the Frontend

The frontend is served by the Express backend, so the easiest way to use the app is to run the backend and open it in the browser at:

```bash
http://localhost:3000
```

The frontend files are in the `frontend/` folder if you want to inspect them directly.

## How to Run the Backend

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The server starts from `server.js`.

## Available API Endpoints

Auth:

- `POST /api/auth/signup` - register a new user
- `POST /api/auth/login` - log in with email and password
- `POST /api/auth/logout` - log out the current user
- `GET /api/auth/me` - get the current logged-in user
- `PUT /api/auth/profile` - update profile details

Recipes:

- `GET /api/recipes` - get all recipes
- `GET /api/recipes/:id` - get one recipe by id
- `POST /api/recipes` - create a new recipe

## Future Improvements

- Add logout button to the UI
- Add better form validation messages
- Add password confirmation during registration
- Add search and filters backed by the API on more pages
- Add user profile editing directly from the frontend
- Add image upload support for recipes