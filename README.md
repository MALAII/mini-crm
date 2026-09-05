# Mini CRM (Customer Relationship Management) System

A simple, clean, and fully functional **Mini CRM** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

## Purpose of the Project

This project was developed as a **self-learning MERN Stack project** to practically implement CRM concepts and full-stack application development. It is intended for demonstration during a MERN Stack internship evaluation and covers the core building blocks of a real-world full-stack application: authentication, protected routing, CRUD operations, REST APIs, database modeling, and a responsive UI.

## Technologies Used

**Frontend:** React.js, JavaScript, HTML5, CSS3, React Router, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Authentication:** JWT (JSON Web Tokens), bcrypt for password hashing

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication with protected backend routes and protected frontend pages
- Dashboard with live summary cards (Total Leads, New Leads, Contacted Leads, Converted Leads, Total Customers) computed from real MongoDB data
- Full Lead management: add, view, edit, delete
- Lead search (by name, email, company) and status filter (New / Contacted / Converted)
- Full Customer management: add, view, edit, delete
- Customer search (by name, email, company)
- One-click "Convert Lead to Customer" feature that copies lead data into the customers collection while preventing duplicate conversions
- Confirmation dialog before deleting a lead or customer
- Centralized Axios API service on the frontend (no repeated backend URLs)
- Loading states and error/success feedback messages throughout the app
- Fully responsive design with a collapsible sidebar for mobile and tablet screens

## Folder Structure

```
crm-project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # Register / Login logic
│   │   ├── leadController.js     # Lead CRUD + convert-to-customer
│   │   ├── customerController.js # Customer CRUD
│   │   └── dashboardController.js# Dashboard summary stats
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Customer.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── customerRoutes.js
│   │   └── dashboardRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.js
│   │   │   ├── ConfirmModal.js
│   │   │   ├── CustomerFormModal.js
│   │   │   ├── LeadFormModal.js
│   │   │   ├── Layout.js
│   │   │   ├── Loader.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── Sidebar.js
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth state (login/register/logout)
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Leads.js
│   │   │   └── Customers.js
│   │   ├── services/
│   │   │   └── api.js            # Centralized Axios instance + API calls
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.js                # React Router setup
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Installation Instructions

### Prerequisites

- Node.js (v16 or later)
- MongoDB installed locally, or a free MongoDB Atlas cluster
- npm (comes with Node.js)

### 1. Clone / download the project

Place the `crm-project` folder anywhere on your machine.

### 2. Backend Setup

```bash
cd crm-project/backend
npm install
cp .env.example .env
```

Edit `.env` and set your own values:

```
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=replace_this_with_a_long_random_secret_key
PORT=5000
```

Run the backend:

```bash
npm run dev
```

The API will start at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd crm-project/frontend
npm install
cp .env.example .env
```

Edit `.env` if your backend runs on a different URL:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm start
```

The app will open at `http://localhost:3000`.

## Environment Variables

| File               | Variable            | Description                                  |
|--------------------|---------------------|-----------------------------------------------|
| backend/.env        | `MONGO_URI`         | MongoDB connection string                     |
| backend/.env        | `JWT_SECRET`         | Secret key used to sign JWT tokens            |
| backend/.env        | `PORT`               | Port for the Express server (default 5000)    |
| frontend/.env        | `REACT_APP_API_URL`  | Base URL of the backend REST API              |

## How to Run (Quick Summary)

1. Start MongoDB (locally or via Atlas)
2. `cd backend && npm install && npm run dev` → runs on port 5000
3. `cd frontend && npm install && npm start` → runs on port 3000
4. Open `http://localhost:3000`, register a new account, and start managing leads and customers

## API Endpoints

| Method | Endpoint                  | Description                    | Protected |
|--------|----------------------------|---------------------------------|-----------|
| POST   | /api/auth/register          | Register a new user             | No        |
| POST   | /api/auth/login             | Login and receive a JWT token   | No        |
| GET    | /api/dashboard/stats        | Get dashboard summary counts    | Yes       |
| GET    | /api/leads                  | Get all leads (search/filter)   | Yes       |
| GET    | /api/leads/:id               | Get a single lead               | Yes       |
| POST   | /api/leads                  | Create a new lead               | Yes       |
| PUT    | /api/leads/:id                | Update a lead                   | Yes       |
| DELETE | /api/leads/:id                | Delete a lead                   | Yes       |
| POST   | /api/leads/:id/convert         | Convert a lead into a customer  | Yes       |
| GET    | /api/customers               | Get all customers (search)      | Yes       |
| GET    | /api/customers/:id             | Get a single customer           | Yes       |
| POST   | /api/customers                | Create a new customer           | Yes       |
| PUT    | /api/customers/:id              | Update a customer               | Yes       |
| DELETE | /api/customers/:id              | Delete a customer               | Yes       |

---

This project was developed as a **self-learning MERN Stack project to practically implement CRM concepts and full-stack application development**.
# mini-crm
