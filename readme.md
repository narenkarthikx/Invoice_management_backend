# 🧾 Invoice Management Backend API

A secure and scalable backend API built with **Express.js** and **MongoDB** for managing invoices. This project includes features like JWT-based user authentication, role-based access, and CRUD operations for invoices.

## 🚀 Features

- ✅ User Registration and Login (with JWT)
- 🔐 Protected Routes using Middleware
- 🧾 Auto-generated Invoice Numbers (with serial logic)
- 🧠 Role-based Access (Admin support)
- 🔄 Full CRUD Support for Invoices
- 🌐 CORS-enabled API
- 🔐 Passwords securely hashed with Bcrypt

## 🧰 Tech Stack

- **Node.js** --> JavaScript runtime environment
- **Express.js** --> Web framework for routing and middleware
- **MongoDB** --> NoSQL database for storing user and invoice data
- **Mongoose** --> ODM for MongoDB schemas and models
- **JWT (jsonwebtoken)** --> Secure authentication tokens
- **Bcrypt** --> Password hashing for user credentials
- **dotenv** --> Environment variable configuration
- **CORS** --> Cross-origin resource sharing middleware

## 📂 Project Structure

- `models/`  
  → Contains the Mongoose schema for `Invoice`

- `.env.example`  
  → Sample file for environment variables setup

- `server.js`  
  → Main backend application file

- `package.json`  
  → Project dependencies and scripts

- `.gitignore`  
  → Specifies which files/folders Git should ignore

- `README.md`  
  → Project overview and documentation

## 🔐 Environment Variables

Create a `.env` file in the root directory:

MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
TOKEN_EXPIRATION=86400
PORT=8080

## 🧾 Invoice Management

All endpoints below require a valid JWT token.

| Method | Endpoint                         | Description             |
|--------|----------------------------------|-------------------------|
| POST   | `/api/invoices`                 | Create a new invoice    |
| GET    | `/api/invoices`                 | Get all invoices        |
| GET    | `/api/invoices/:invoiceNumber`  | Get a specific invoice  |
| PUT    | `/api/invoices/:invoiceNumber`  | Update an invoice       |
| DELETE | `/api/invoices/:invoiceNumber`  | Delete an invoice       |

## 📦 Installation & Running Locally

# Clone the repo

git clone https://github.com/your-username/invoice-management-backend.git
cd invoice-management-backend

# Install dependencies

npm install

# Set up environment variables

Copy .env.example to .env and fill in your values.

# Start the server

node server.js

