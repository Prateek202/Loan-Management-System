# Loan Management System

A full-stack Loan Management System built using MERN Stack + Next.js + TypeScript.

This system allows borrowers to apply for loans and enables internal teams to manage loans across their lifecycle through role-based dashboards.

---

# Features

## Borrower Portal

- User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- Personal Details Form
- Business Rule Engine (BRE) Validation
- Salary Slip Upload (PDF/JPG/PNG)
- Loan Configuration using Sliders
- Live Interest Calculation
- Loan Application Submission

---

## Operations Dashboard

### Sales Module
- View registered borrowers who have not applied for loans

### Sanction Module
- View applied loans
- Approve loan
- Reject loan with rejection reason

### Disbursement Module
- View sanctioned loans
- Mark loans as disbursed

### Collection Module
- View disbursed loans
- Record payments
- Prevent duplicate UTR numbers
- Prevent overpayment
- Auto-close loan when repayment completed

---

# Role-Based Access Control (RBAC)

Roles Supported:

- ADMIN
- SALES
- SANCTION
- DISBURSEMENT
- COLLECTION
- BORROWER

Features:
- Backend route protection
- Frontend route protection
- Admin can access all modules
- Borrowers can only access borrower portal

---

# Tech Stack

## Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer

---

# Project Structure

```bash
loan-management-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── seed/
│   │   └── server.ts
│   │
│   ├── uploads/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

---

# Loan Lifecycle

```txt
APPLIED
→ SANCTIONED
→ DISBURSED
→ CLOSED
```

Rejected loans are marked as:

```txt
REJECTED
```

---

# Business Rule Engine (BRE)

The system validates borrower eligibility using the following rules:

| Rule | Validation |
|------|------------|
| Age | Must be between 23 and 50 |
| Salary | Must be above ₹25,000 |
| PAN | Must match valid PAN regex |
| Employment | Applicant cannot be unemployed |

If any rule fails, the application is rejected.

---

# Interest Calculation

Simple Interest Formula:

```txt
SI = (P × R × T) / (365 × 100)
```

Where:
- P = Principal Amount
- R = Interest Rate (12%)
- T = Tenure in Days

Total Repayment:

```txt
Total Repayment = Principal + Interest
```

---

# Environment Variables

## Backend `.env`

Create:

```bash
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

## Frontend `.env.local`

Create:

```bash
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository_url>
```

---

## 2. Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

# MongoDB Setup

Use MongoDB Atlas or local MongoDB.

Update:

```env
MONGO_URI=
```

inside backend `.env`.

---

# Seed Script

Run seed script to create demo accounts.

```bash
npm run seed
```

---

# Demo Credentials

## Borrower

```txt
Email: borrower@test.com
Password: 123456
```

---

## Sales

```txt
Email: sales@test.com
Password: 123456
```

---

## Sanction

```txt
Email: sanction@test.com
Password: 123456
```

---

## Disbursement

```txt
Email: disbursement@test.com
Password: 123456
```

---

## Collection

```txt
Email: collection@test.com
Password: 123456
```

---

## Admin

```txt
Email: admin@test.com
Password: 123456
```

---

# API Modules

## Auth APIs
- Register
- Login

## Borrower APIs
- Create Profile
- Upload Salary Slip

## Loan APIs
- Apply Loan
- Fetch Borrower Loans

## Sales APIs
- Fetch Leads

## Sanction APIs
- Approve Loan
- Reject Loan

## Disbursement APIs
- Disburse Loan

## Collection APIs
- Add Payment

---

# Validations Implemented

- JWT Authentication
- Role-Based Authorization
- Duplicate UTR Prevention
- Overpayment Prevention
- Negative Payment Prevention
- BRE Validation
- File Type Validation
- File Size Validation

---

---

# Evaluation Requirements Covered

- End-to-End Working Flow
- RBAC (Frontend + Backend)
- BRE Validation
- Loan Math
- Role-Based Dashboards
- File Upload
- Loan Lifecycle
- Payment Collection
- Auto Loan Closure

---

# Future Improvements

- Better dashboard analytics
- Email notifications
- EMI schedule generation
- Pagination & filtering
- Better UI/UX
- Audit logs
- Docker support

---

# .env.example Files

## backend/.env.example

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

---

## frontend/.env.example

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# Author

Prateek Thakur