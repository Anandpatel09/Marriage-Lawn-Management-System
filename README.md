from pathlib import Path

readme = r'''# Durga Marriage Lawn Management System (MLMS)

A full-stack **Marriage Lawn Management System** built to manage marriage lawn enquiries, customers, bookings, packages, authentication, and administration.

The project is divided into a **React + TypeScript frontend** and a **Node.js + Express + MySQL backend**.

---
---

## 📌 Project Overview

Durga Marriage Lawn Management System helps customers:

- Browse marriage lawns and packages
- Register and log in
- Verify their email
- Recover a forgotten password
- View their profile
- Submit booking enquiries
- Book a lawn
- View their bookings
- Log out securely

It also provides an admin area for managing the application's business operations.

### Main application flow

```text
Customer
   |
   +--> Register
   |      |
   |      +--> Email Verification
   |
   +--> Login
   |      |
   |      +--> Access Token + Refresh Token
   |
   +--> Home / Lawns / Packages
   |
   +--> Book Now
   |
   +--> My Bookings
   |
   +--> Profile
   |
   +--> Contact / Enquiry
   |
   +--> Logout


Admin
   |
   +--> Login
   |
   +--> Admin Dashboard
   |
   +--> Admin Profile
   |
   +--> Manage business data
```

---

## 🛠️ Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Zod
- Axios
- Lucide React
- React Day Picker
- Recharts

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- bcrypt
- JSON Web Token (JWT)
- Nodemailer
- cookie-parser
- CORS
- dotenv
- Nodemon

### Database

- MySQL

---

## 📁 Project Structure

```text
MLMS/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── components/
│   │   │   └── comman/
│   │   │       ├── Navbar.tsx
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── auth/
│   │   │   ├── profile/
│   │   │   └── admin/
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── AdminRoute.tsx
│   │   │
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── contact.controller.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── contact.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── email.service.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### Customer Features

- Customer registration
- Email verification using OTP
- Login and logout
- Forgot password
- Reset password
- Protected routes
- Customer profile
- Responsive navigation bar
- Dynamic logged-in user name in navbar
- Marriage lawn listing
- Package listing
- Booking page with calendar
- My bookings page
- Contact/enquiry form
- Email notification for enquiries

### Admin Features

- Admin login
- Admin-only route protection
- Admin dashboard
- Revenue and booking charts
- Admin profile
- Customer/admin role-based access
- Enquiry management foundation

---

# 🔐 Authentication

The project uses JWT-based authentication.

### Authentication flow

```text
Login
  |
  +--> Verify email/password
  |
  +--> Generate Access Token
  |
  +--> Generate Refresh Token
  |
  +--> Store refresh-token hash in sessions table
  |
  +--> Send refresh token as HttpOnly cookie
```

### Access Token

The access token is short-lived and is used for protected API requests.

Example payload:

```json
{
  "userId": 16,
  "role": "admin"
}
```

### Refresh Token

The refresh token is long-lived and is stored in an HttpOnly cookie.

It can be used to generate a new access token when the access token expires.

### Protected Routes

Customer protected routes use:

```text
ProtectedRoute
```

Admin protected routes use:

```text
AdminRoute
```

The backend should also protect admin APIs with authentication and role checks.

---

# 🗄️ Database

The main MySQL database is:

```text
marriage_lawn
```

### Main tables

```text
users
sessions
otp_verifications
password_resets
enquiries
```

Additional business tables can include:

```text
venues
packages
bookings
payments
```

depending on the current application implementation.

---

## 👤 Users Table

A typical `users` table contains:

```text
id
first_name
last_name
email
mobile
city
password_hash
role
is_verified
created_at
```

Roles:

```text
customer
admin
```

Public registration should create normal customers by default. Admin accounts should be created through a controlled process.

---

## 📩 Enquiries

Customer contact enquiries are stored in MySQL and can also be sent to the configured business email.

Example enquiry data:

```json
{
  "name": "Anand",
  "mobile": "9335056579",
  "email": "anand@gmail.com",
  "date": "2026-10-20",
  "message": "I want to book the lawn for my wedding."
}
```

The enquiry is stored in the `enquiries` table.

---

# 📧 Email Configuration

Nodemailer is used for sending emails.

For Gmail SMTP, use a Google **App Password** instead of your normal Gmail password.

Example `.env`:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=marriage_lawn

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

EMAIL_USER=yourgmail@gmail.com
EMAIL_APP_PASSWORD=your_16_character_app_password
```

### Important

Never commit `.env` to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 🚀 Getting Started

## 1. Clone or download the project

```bash
git clone <your-repository-url>
cd MLMS
```

---

# Frontend Setup

Go to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

---

# Backend Setup

Open another terminal and go to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev
```

The backend normally runs on:

```text
http://localhost:5000
```

---

# 🗄️ MySQL Setup

Create the database:

```sql
CREATE DATABASE marriage_lawn;

USE marriage_lawn;
```

Then create the required tables used by the application.

For example, the enquiry table:

```sql
CREATE TABLE enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(150) NOT NULL,
    booking_date DATE NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 🔗 API Overview

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/refresh-token
```

## Contact / Enquiry

```text
POST /api/contact/enquiry
GET  /api/contact/enquiries
```

Admin-only endpoints should be protected by authentication and admin authorization.

---

# 📱 Responsive Design

The frontend is designed for:

```text
Mobile
Tablet
Desktop
```

Tailwind responsive breakpoints are used throughout the application.

Typical patterns include:

```tsx
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
```

The navigation bar switches to a mobile sidebar on smaller screens.

---

# 🧩 Authentication Context

The frontend uses `AuthContext` to manage:

- Current logged-in user
- Loading state
- Authentication state
- Logout
- Restoring user state after refresh

Example:

```tsx
const { user, isAuthenticated, logout } = useAuth();
```

The Navbar can then display the current user's name:

```tsx
{user ? `Hi, ${user.first_name}` : "Sign in"}
```

---

# 📊 Admin Dashboard

The admin dashboard provides a foundation for displaying:

- Monthly revenue
- Confirmed bookings
- New customers
- Occupancy
- Revenue trends
- Monthly booking trends
- Upcoming bookings

Charts are implemented with **Recharts**.

The current dashboard can use demo data during development and later consume real backend data.

---

# 🔒 Security Considerations

- Passwords are hashed with bcrypt.
- JWT secrets are stored in environment variables.
- Refresh tokens are stored in HttpOnly cookies.
- Refresh token hashes are stored in the database.
- Protected frontend routes prevent unauthorized page access.
- Backend APIs should enforce authentication and admin authorization.
- Parameterized MySQL queries are used instead of string-concatenated SQL.
- Sensitive environment variables must not be committed to source control.

---

# 🧪 Development Notes

When developing locally, make sure:

```text
Frontend → http://localhost:5173
Backend  → http://localhost:5000
MySQL    → local MySQL server
```

The backend CORS configuration should allow the frontend origin:

```js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

Axios should be configured with credentials:

```ts
withCredentials: true
```

---

# 🛣️ Future Improvements

Possible next features include:

- Complete admin lawn management
- Complete package management
- Customer management
- Booking management
- Date-wise venue availability
- Payment integration
- Invoice generation
- Staff management
- Expense management
- Reports
- Admin enquiry management
- Profile editing
- Automatic access-token refresh
- Production deployment
- Cloud database and email configuration

---

# 👨‍💻 Author

**Durga Marriage Lawn Management System**

Built as a full-stack web application using React, TypeScript, Node.js, Express, and MySQL.

---

# 📄 License

This project is intended for educational and project-development purposes unless a separate license is provided.
'''

path = Path("/mnt/data/README.md")
path.write_text(readme, encoding="utf-8")
print(path)
