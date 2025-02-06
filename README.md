# blog-api

## Description

A RESTful API for managing blog posts and users.

## Features

- **User Authentication & Authorization** (JWT-based login & signup)
- **Secure Password Hashing** (bcrypt)
- **Blog Post & Category Management** (CRUD operations)
- **Error Handling & Logging**
- **MongoDB Integration** (Mongoose for data modeling)

## Technologies Used

- **Node.js**
- Express.js, MongoDB & Mongoose, JWT (JSON Web Token) for authentication, Bcrypt for password security

## API Endpoints

### Authentication

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| POST   | /auth/signup   | Register a user |
| POST   | /auth/login    | User login      |

### User Management

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | /users     | Get all users  |
| GET    | /users/:id | Get user by ID |

### Blog Post Management

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | /read                | Get all blog posts            |
| POST   | /creat               | Create a new blog post        |
| PATCH  | /PATECH/:id          | Update a blog post            |
| DELETE | /DELETE/:id          | Delete a blog post            |

### Category Management

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | /read        | Get all categories    |
| POST   | /creat       | Create a new category |
| PATCH  | /PATCH/:id   | Update a category     |
| DELETE | /DELETE/:id  | Delete a category     |

## Security Measures

- **JWT Authentication** for secure access.
- **Bcrypt Password Hashing** for storing passwords safely.
- **Input Validation & Error Handling** to prevent attacks.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd blog-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file.
4. Start the server:
   ```bash
   npm start
   ```

## Email Integration

- Sends confirmation emails on user registration.
- Notifies users about blog post updates.
