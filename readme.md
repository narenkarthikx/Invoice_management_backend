# edAdmin

A brief description of your project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

# Invoice Management System

A secure and efficient system for managing invoices, including user registration, authentication, and invoice creation. This system is built using Node.js, Express, and MongoDB, providing a robust solution for handling financial transactions.

## Features

- User registration and login with secure password hashing
- Role-based access control, allowing admin-only access to certain functionalities
- Creation and storage of invoices with a unique invoice number
- Retrieval of all invoices or a specific invoice by its number
- Deletion of invoices with admin privileges


## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
   Ensure that you have a `.env` file configured with your MongoDB connection string and other necessary environment variables.

## Configuration

Create a `.env` file in the project root with the following:

DB_URL=your_mongodb_connection_string
SECRET_KEY=your_secret_key
TOKEN_EXPIRATION=3600  # token expiration time in seconds
PORT=8080  # or your preferred port


## Usage
Run the application:

npm start


## API Endpoints

- `POST /register`: User registration
- `POST /login`: User login
- `POST /api/invoices`: Add an invoice
- `GET /api/invoices`: Get all invoices
- `GET /api/invoices/:invoiceNumber`: Get a single invoice
- `DELETE /api/invoices/:invoiceNumber`: Delete an invoice (Admin access required)


## Testing

Run tests:

npm test


## Contributing

Feel free to contribute! Please follow our [Contribution Guidelines]


## License

This project is licensed under the [MIT License]
