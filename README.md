Expense Tracker – MERN Stack

A simple and secure Expense Tracking Web Application built using the MERN stack (MongoDB, Express, React, Node.js).
Users can register, log in, add expenses, update or delete expenses, and view reports.

🚀 Live Demo
Frontend

🔗 https://expense-tracker-neon-gamma.vercel.app/login

Backend

🔗 https://expense-tracker-gtjf.onrender.com

📂 GitHub Repository

🔗 https://github.com/jayvyas0501/Expense-Tracker

✨ Features

User authentication (Register/Login)

JWT-based secure authentication

Protected routes for expense operations

Add, edit, delete expenses

View all expenses in a list

Real-time UI updates

Fully responsive design

MongoDB Atlas connection

CORS enabled for frontend communication

🛠️ Tech Stack
Frontend

React + Vite

Axios

TailwindCSS / ShadCN

Backend

Node.js

Express.js

MongoDB Atlas (Mongoose)

JWT Authentication

Bcrypt Password Hashing

CORS

📁 Folder Structure
Expense-Tracker/
 ├── client/        # React Vite Frontend
 └── server/        # Node + Express Backend

⚙️ Backend Setup (Express + MongoDB)
1. Go inside server folder
cd server

2. Install dependencies
npm install

3. Create .env file
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

4. Run the backend
npm start


OR for development:

nodemon index.js

🖥️ Frontend Setup (React + Vite)
1. Go inside client folder
cd client

2. Install dependencies
npm install

3. Create .env file
VITE_API_URL=http://localhost:5000/api

4. Run frontend
npm run dev

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Expenses
Method	Endpoint	Description
POST	/api/expenses	Get all expenses And filters
POST	/api/expenses	Add expense
PUT	/api/expenses/:id	Update expense
DELETE	/api/expenses/:id	Delete expense

Add these env variables:

PORT=1000
MONGO_URI=your_atlas_url
JWT_SECRET=your_secret
CLIENT_URL=https://expense-tracker-neon-gamma.vercel.app

🙌 Author
Jay Vyas
