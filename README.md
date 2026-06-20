#  SmartSpend - Personal Expense Tracker

##  Project Overview

SmartSpend is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that helps users manage their personal finances efficiently.

Users can:

* Register and login securely
* Track income and expenses
* Monitor total balance
* Set monthly budgets
* Analyze spending patterns
* Download expense reports
* View personalized dashboards

The application uses JWT Authentication to ensure that each user can access only their own financial data.

---

#  Features

##  Authentication & Authorization

* User Registration
* User Login
* Password Hashing using bcryptjs
* JWT Token Generation
* Protected Routes
* User-Specific Data Access

---

# 📸 Screenshots

Add screenshots here after deployment.

Examples:

* Login Page
![img](https://github.com/Malateshgouda813/SmartSpend/blob/1920ca0ad2654335ad46d38bd8d60ec124cf5401/login.png)
* Registration Page
![img](https://github.com/Malateshgouda813/SmartSpend/blob/3ea6b2713c071c204abfec7ce558188be452d4a9/register.png)
* Dashboard
* Budget Management
* Expense Analytics
* Expense Management

---

##  Expense Management

Users can:

* Add Expenses
* Add Income
* Edit Transactions
* Delete Transactions
* View Transaction History

Each transaction contains:

* Title
* Amount
* Category
* Type (Income / Expense)
* Date

---

## Financial Summary Dashboard

Dashboard automatically calculates:

* 💰 Total Balance
* 📈 Total Income
* 📉 Total Expenses
* Total Transactions

Formula:

Balance = Total Income − Total Expenses

---

##  Budget Management

Users can:

* Set Monthly Budget
* Save Budget
* Track Spending
* View Remaining Budget
* Receive Alerts when Budget Limit is Exceeded

Example:

Budget: ₹15,000

Spent: ₹13,200

Remaining: ₹1,800

---

##  Expense Analytics

Interactive Pie Chart Visualization:

* Category-wise Expense Distribution
* Dynamic Updates
* Real-Time Data Analysis

Example Categories:

* Food
* Travel
* Shopping
* Bills
* Entertainment

---

##  Expense Report Download

Users can download their personal expense history as a CSV file.

Downloaded Report Includes:

* Title
* Amount
* Category
* Type

This feature enables users to maintain offline records of their financial activities.

---

#  Technology Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Recharts

---

## Backend

* Node.js
* Express.js

---

## Database

* MongoDB Atlas
* Mongoose

---

## Authentication & Security

* JWT (JSON Web Token)
* bcryptjs

---

## Development Tools

* VS Code
* Git
* GitHub
* MongoDB Compass
* Postman

---

#  Project Structure

```
SmartSpend
│
├── backend
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   └── expenseController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Expense.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── .env
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

#  Installation Guide

## Clone Repository

```bash
git clone https://github.com/Malateshgouda813/SmartSpend.git
```

```bash
cd SmartSpend
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

Start backend server:

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

#  API Endpoints

## Authentication

### Register User

```
POST /api/auth/register
```

### Login User

```
POST /api/auth/login
```

---

## Expenses

### Get Expenses

```
GET /api/expenses
```

### Add Expense

```
POST /api/expenses
```

### Update Expense

```
PUT /api/expenses/:id
```

### Delete Expense

```
DELETE /api/expenses/:id
```

---

#  Security Features

## Password Hashing

Passwords are securely hashed using bcryptjs before storing them in the database.

Example:

```
$2b$10$Lqxe.j31rVmXJxW...
```

---

## JWT Authentication

After login:

1. JWT token is generated.
2. Token is stored in browser localStorage.
3. Protected routes verify the token.
4. Unauthorized access is blocked.

---

#  Challenges Faced

## 1. MongoDB Database Confusion

### Problem

Initially, data appeared in API responses but not inside MongoDB Compass.

### Cause

Backend was connected to a different database than expected.

### Solution

Verified database connection using:

```javascript
mongoose.connection.name
```

and ensured all operations were performed on the correct database.

---

## 2. Protected Route Authentication

### Problem

Protected APIs returned unauthorized errors.

### Cause

JWT token was not included in request headers.

### Solution

Added Authorization header:

```javascript
Authorization: Bearer token
```

and validated it through middleware.

---

## 3. Password Security

### Problem

Passwords were stored in plain text.

### Risk

Sensitive user information could be exposed.

### Solution

Integrated bcryptjs hashing before saving users.

---

## 4. User-Specific Expense Filtering

### Problem

Need to ensure users cannot view others' expenses.

### Solution

Filtered records using:

```javascript
Expense.find({
  user: req.user.id
});
```

This guarantees complete user isolation.

---

## 5. Dashboard State Synchronization

### Problem

Dashboard was not updating after CRUD operations.

### Solution

Implemented reusable fetchExpenses() function and refreshed data after every successful operation.

---

#  Future Enhancements

Planned improvements:

* Profile Image Upload
* Monthly Reports
* PDF Report Generation
* Dark Mode
* Category Filters
* Search Transactions
* Export to Excel
* Email Reports
* AI Spending Insights
* Mobile Responsive UI
* Multi-Currency Support

---

#  Learning Outcomes

Through this project, I gained hands-on experience with:

* MERN Stack Development
* REST API Design
* Authentication & Authorization
* MongoDB Atlas Integration
* JWT Security
* React State Management
* CRUD Operations
* Data Visualization
* Git & GitHub Workflow
* Full-Stack Deployment Concepts

---


#  Author

**Malatesh Gouda R H**

* Full Stack Developer
* MERN Stack Enthusiast
* Problem Solver

GitHub:
https://github.com/Malateshgouda813



# Conclusion

SmartSpend demonstrates the implementation of a secure and scalable personal finance management system using modern web technologies.

The project combines authentication, expense tracking, budget management, analytics, and reporting features into a single platform. It highlights practical full-stack development skills and provides a strong foundation for future enhancements such as AI-powered financial insights, PDF reporting, and cloud deployment.

This project reflects real-world software development practices including secure authentication, RESTful API design, database management, data visualization, and version control using Git and GitHub.
