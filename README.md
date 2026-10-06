# Expense Management API

A simple and beginner-friendly **Expense Management REST API** built using **Node.js, Express.js, MongoDB, and Mongoose**.

This project provides APIs to manage users and their expenses, including creating, viewing, updating, deleting, filtering, pagination, and expense summary.

---

## 🚀 Features

### User Management
- Create a new user
- Get all users
- Get a user by ID
- Email validation
- Prevent duplicate email registration

### Expense Management
- Create an expense
- Get all expenses
- Get an expense by ID
- Update an expense
- Delete an expense
- Filter expenses by:
  - User
  - Category
  - Date range
- Pagination support
- Expense summary

### Other Features
- MongoDB database integration
- Mongoose schemas and models
- Input validation
- Error handling middleware
- 404 route handling
- CORS support
- Environment variables using `.env`

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- REST API
- Postman
- Git & GitHub

---

## 📁 Project Structure

```text
expense-management/
│
├── controllers/
│   ├── user.controller.js
│   └── expense.controller.js
│
├── routes/
│   ├── user.routes.js
│   └── expense.routes.js
│
├── models/
│   ├── User.js
│   └── Expense.js
│
├── config/
│   └── db.js
│
├── middleware/
│   ├── errorHandler.middleware.js
│   └── notFound.middleware.js
│
├── utils/
│   └── validate.utils.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
