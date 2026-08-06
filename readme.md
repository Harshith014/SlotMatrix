# 🚀 SlotMatrix

> A full-stack MERN coworking workspace booking platform that enables visitors to browse workspaces, members to reserve desks and meeting rooms, and administrators to manage spaces, maintenance schedules, and booking approvals with concurrency-safe booking protection.

![License](https://img.shields.io/badge/License-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-Express-success)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

# 📖 Overview

SlotMatrix is a workspace reservation system inspired by modern coworking management platforms.

The application allows organizations to efficiently manage desks and meeting rooms while preventing scheduling conflicts through backend validation and concurrency-safe booking logic.

The system supports three user perspectives:

* **Visitor** – Browse available spaces and check availability.
* **Member** – Reserve workspaces and manage personal bookings.
* **Admin** – Manage spaces, approve/reject bookings, and schedule maintenance windows.

The backend is built using **Node.js**, **Express.js**, and **MongoDB**, while the frontend is developed with **React**, **Axios**, **React Router**, and **Tailwind CSS**.

---

# ✨ Key Features

## 👤 Visitor

* Browse available workspaces
* Search spaces by name
* Filter by:

  * Type
  * Capacity
  * Availability Date
* Pagination
* View detailed workspace information
* View availability for selected date
* Login prompt before booking

---

## 👥 Member

* Secure JWT Authentication
* Refresh Token Authentication
* Book desks or meeting rooms
* Select custom date and time slot
* Prevent overlapping bookings
* View booking history
* Booking statuses:

  * Pending
  * Approved
  * Rejected
  * Cancelled
* Cancel future bookings

---

## 🛠 Admin

* Dashboard
* Create Space
* Edit Space
* Delete Space
* View all bookings
* Filter bookings by:

  * Status
  * Space
  * Date
* Approve bookings
* Reject bookings
* Automatic rejection of overlapping pending bookings
* Maintenance Management
* Block workspace availability during maintenance

---

# 🔒 Security Features

* JWT Authentication
* Refresh Tokens
* Password Hashing using bcrypt
* Protected Routes
* Role Based Authorization
* Request Validation
* Centralized Error Handling
* Rate Limiting
* MongoDB Transactions
* Concurrency-safe booking logic

---

# 🏗 Technology Stack

## Frontend

* React
* React Router DOM
* Axios
* React Hook Form
* React Hot Toast
* Tailwind CSS

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator
* express-rate-limit

---

## Database

* MongoDB Atlas

---

## Deployment

Frontend

* Render Static Site

Backend

* Render Web Service

Database

* MongoDB Atlas

---

# 📂 Project Structure

```text
SlotMatrix
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── validators
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── features
│   │   ├── layouts
│   │   ├── routes
│   │   ├── utils
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🎯 User Roles

```text
                 Visitor
                    │
        Browse Workspaces
                    │
              View Details
                    │
              Check Availability
                    │
          Login to Continue Booking
                    │
          ┌─────────┴─────────┐
          │                   │
      Member              Admin
          │                   │
    Reserve Space      Manage Spaces
    View Bookings      Manage Bookings
    Cancel Booking     Maintenance
                       Approvals
```

---

# 🧠 Core Business Workflow

```text
Admin Creates Workspace
            │
            ▼
Visitor Browses Spaces
            │
            ▼
Member Books Workspace
            │
            ▼
Booking Status = Pending
            │
            ▼
Admin Reviews Booking
      ┌───────────────┐
      │               │
Approve          Reject
      │               │
      ▼               ▼
Auto Reject      Member Notified
Conflicting
Pending Requests
```

---

# ⚡ Booking Concurrency Workflow

One of the major highlights of this project is preventing duplicate bookings when multiple users attempt to reserve the same workspace simultaneously.

```text
Member A
        │
        │
        ▼
Create Booking
        │
        │
MongoDB Transaction + Lock
        │
        ▼
Booking Created
        │
        ▼
Lock Released

──────────────────────────────

Member B
        │
        ▼
Attempts Same Slot
        │
        ▼
Booking Conflict Detected
        │
        ▼
Booking Rejected
```

This guarantees that only one booking succeeds for overlapping time slots.

# 🌐 REST API Documentation

## Base URL

### Local Development

```http
http://localhost:5000/api/v1
```

### Production

```http
https://<your-render-backend>.onrender.com/api/v1
```

---

# Authentication

Most APIs require a valid JWT Access Token.

### Authorization Header

```http
Authorization: Bearer <access_token>
```

---

# Authentication Module

---

## Register User

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Password@123"
}
```

### Success Response

```json
{
    "success": true,
    "message": "User Registered Successfully",
    "data": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "member"
    }
}
```

---

## Login

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
    "email": "john@example.com",
    "password": "Password@123"
}
```

### Success Response

```json
{
    "success": true,
    "message": "Login Successful",
    "data": {
        "user": {
            "_id": "...",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "member"
        },
        "accessToken": "<JWT_ACCESS_TOKEN>",
        "refreshToken": "<JWT_REFRESH_TOKEN>"
    }
}
```

---

## Get Logged In User

### Endpoint

```http
GET /auth/profile
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Response

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "member"
    }
}
```

---

## Refresh Token

### Endpoint

```http
POST /auth/refresh
```

### Request Body

```json
{
    "refreshToken": "<refresh_token>"
}
```

### Response

```json
{
    "success": true,
    "data": {
        "accessToken": "<new_access_token>"
    }
}
```

---

# Workspace Module

---

## Get All Spaces

### Endpoint

```http
GET /spaces
```

### Query Parameters

| Parameter | Description         |
| --------- | ------------------- |
| page      | Page Number         |
| limit     | Records Per Page    |
| search    | Search by Name      |
| type      | desk / meeting-room |
| capacity  | Minimum Capacity    |
| date      | Availability Date   |

### Example

```http
GET /spaces?page=1&limit=6&type=meeting-room
```

### Response

```json
{
    "success": true,
    "data": {
        "total": 12,
        "currentPage": 1,
        "totalPages": 2,
        "data": [
            {
                "_id": "...",
                "name": "Meeting Room A",
                "type": "meeting-room",
                "capacity": 10,
                "amenities": [
                    "TV",
                    "Projector",
                    "Whiteboard"
                ]
            }
        ]
    }
}
```

---

## Get Space Details

### Endpoint

```http
GET /spaces/:id
```

### Response

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "Meeting Room A",
        "capacity": 10,
        "description": "...",
        "amenities": [
            "TV",
            "Projector",
            "Whiteboard"
        ]
    }
}
```

---

## Get Availability

### Endpoint

```http
GET /spaces/:id/availability
```

### Query

```http
?date=2026-08-10
```

### Response

```json
{
    "success": true,
    "data": {
        "bookings": [
            {
                "startTime": "...",
                "endTime": "...",
                "status": "approved"
            }
        ],
        "maintenance": [
            {
                "startTime": "...",
                "endTime": "...",
                "reason": "Projector Replacement"
            }
        ]
    }
}
```

---

# Booking Module

---

## Create Booking

### Endpoint

```http
POST /bookings
```

### Authentication

Member Required

### Request Body

```json
{
    "space": "SPACE_ID",
    "startTime": "2026-08-10T09:00:00Z",
    "endTime": "2026-08-10T11:00:00Z"
}
```

### Success

```json
{
    "success": true,
    "message": "Booking Created",
    "data": {
        "_id": "...",
        "status": "pending"
    }
}
```

### Possible Errors

```text
400 Booking overlaps existing booking

400 Space under maintenance

400 Invalid Time Slot

400 Past Booking Not Allowed
```

---

## Get My Bookings

### Endpoint

```http
GET /bookings/my
```

### Response

```json
{
    "success": true,
    "data": [
        {
            "space": {
                "name": "Meeting Room A"
            },
            "status": "approved",
            "startTime": "...",
            "endTime": "..."
        }
    ]
}
```

---

## Cancel Booking

### Endpoint

```http
PATCH /bookings/:id/cancel
```

### Success

```json
{
    "success": true,
    "message": "Booking Cancelled"
}
```

### Business Rules

* Pending bookings can be cancelled.
* Approved bookings can be cancelled.
* Past bookings cannot be cancelled.
* Only booking owner can cancel.

---

# Booking Approval Workflow

```text
Member Creates Booking
        │
        ▼
Status = Pending
        │
        ▼
Admin Reviews
        │
   ┌────┴────┐
   │         │
Approve   Reject
   │         │
   ▼         ▼
Approved  Rejected
   │
   ▼
Reject Other Pending
Overlapping Bookings
```

---

# Concurrency Protection

When two members attempt to reserve the same workspace simultaneously:

```text
Member A
        │
        ▼
Acquire Lock
        │
        ▼
Booking Created
        │
        ▼
Release Lock

────────────────────────

Member B
        │
        ▼
Acquire Lock
        │
        ▼
Conflict Detected
        │
        ▼
Booking Rejected
```

This ensures duplicate bookings cannot occur under concurrent requests.

# 👨‍💼 Admin Module

The Admin module is responsible for managing the coworking environment. Administrators have complete control over workspaces, booking approvals, and maintenance scheduling.

---

# Workspace Management APIs

## Get All Spaces

### Endpoint

```http
GET /spaces
```

Returns all available workspaces with pagination support.

---

## Create Space

### Endpoint

```http
POST /spaces
```

### Authentication

Admin Only

### Request Body

```json
{
    "name": "Meeting Room A",
    "type": "meeting-room",
    "capacity": 10,
    "amenities": [
        "Projector",
        "Whiteboard",
        "TV"
    ],
    "description": "Large conference room"
}
```

### Response

```json
{
    "success": true,
    "message": "Space Created Successfully",
    "data": {
        "_id": "...",
        "name": "Meeting Room A"
    }
}
```

---

## Update Space

### Endpoint

```http
PUT /spaces/:id
```

### Authentication

Admin Only

### Request Body

```json
{
    "capacity": 12,
    "description": "Updated Description"
}
```

---

## Delete Space

### Endpoint

```http
DELETE /spaces/:id
```

### Authentication

Admin Only

---

# Booking Administration APIs

---

## View All Bookings

### Endpoint

```http
GET /admin/bookings
```

### Authentication

Admin Only

---

### Supported Query Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| page      | Current Page                              |
| limit     | Records Per Page                          |
| status    | pending / approved / rejected / cancelled |
| space     | Workspace ID                              |
| member    | Member ID                                 |
| date      | Filter by booking date                    |

### Example

```http
GET /admin/bookings?page=1&status=pending&space=SPACE_ID&date=2026-08-10
```

### Response

```json
{
    "success": true,
    "data": {
        "total": 15,
        "currentPage": 1,
        "totalPages": 2,
        "data": [
            {
                "_id": "...",
                "member": {
                    "name": "John Doe",
                    "email": "john@example.com"
                },
                "space": {
                    "name": "Meeting Room A"
                },
                "status": "pending"
            }
        ]
    }
}
```

---

## Approve Booking

### Endpoint

```http
PATCH /admin/bookings/:id/approve
```

### Business Rules

* Booking must exist.
* Booking must not overlap with maintenance.
* Booking must not conflict with an already approved booking.
* All overlapping pending bookings are automatically rejected.

### Success Response

```json
{
    "success": true,
    "message": "Booking Approved"
}
```

---

## Reject Booking

### Endpoint

```http
PATCH /admin/bookings/:id/reject
```

### Request Body

```json
{
    "reason": "Room unavailable"
}
```

### Response

```json
{
    "success": true,
    "message": "Booking Rejected"
}
```

---

# Maintenance APIs

Maintenance blocks a workspace from being booked during a specified time period.

---

## Get Maintenance Windows

### Endpoint

```http
GET /maintenance
```

---

## Create Maintenance

### Endpoint

```http
POST /maintenance
```

### Authentication

Admin Only

### Request Body

```json
{
    "space": "SPACE_ID",
    "startTime": "2026-08-10T09:00:00Z",
    "endTime": "2026-08-10T18:00:00Z",
    "reason": "Projector Replacement"
}
```

### Business Rules

* Cannot overlap existing bookings.
* Prevents future bookings during the maintenance window.
* Prevents approval of pending bookings overlapping the maintenance period.

---

## Delete Maintenance

### Endpoint

```http
DELETE /maintenance/:id
```

---

# Database Design

## Collections

```text
users
spaces
bookings
maintenances
```

---

## User

```text
_id
name
email
password
role
createdAt
updatedAt
```

---

## Space

```text
_id
name
type
capacity
amenities
description
location
isActive
createdAt
updatedAt
```

---

## Booking

```text
_id
member
space
startTime
endTime
status
rejectionReason
createdAt
updatedAt
```

---

## Maintenance

```text
_id
space
startTime
endTime
reason
createdAt
updatedAt
```

---

# Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=<mongodb_connection_string>

JWT_SECRET=<jwt_secret>

JWT_REFRESH_SECRET=<refresh_secret>

CLIENT_URL=http://localhost:5173
```

---

## Frontend

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

# Running Locally

## Backend

```bash
npm install
npm run dev
```

---

## Frontend

```bash
npm install
npm run dev
```

---

# Deployment

## Backend

Deploy using Render Web Service.

Configure:

* Build Command

```bash
npm install
```

* Start Command

```bash
npm start
```

Environment Variables:

* MONGO_URI
* JWT_SECRET
* JWT_REFRESH_SECRET
* CLIENT_URL

---

## Frontend

Deploy using Render Static Site.

Build Command

```bash
npm install && npm run build
```

Publish Directory

```text
dist
```

Environment Variable

```env
VITE_API_URL=https://your-backend.onrender.com/api/v1
```

---

# Screenshots

Replace these placeholders with actual application screenshots.

## Visitor

* Home Page
* Search & Filters
* Space Details
* Availability View

---

## Member

* Login
* Dashboard
* Book Workspace
* My Bookings

---

## Admin

* Dashboard
* Manage Spaces
* Booking Queue
* Maintenance Management

---

# Future Improvements

* Session restoration after browser refresh using refresh-token flow.
* Interactive calendar with hourly slot visualization.
* Email notifications for booking approval and rejection.
* Booking reminders.
* Workspace image uploads.
* Analytics dashboard.
* Soft delete support for spaces.
* Audit logs.
* Dark mode.
* Real-time booking updates using WebSockets.

---

# Key Highlights

* MERN Stack Architecture
* RESTful API Design
* JWT Authentication
* Refresh Token Flow
* Role-Based Authorization
* MongoDB Transactions
* Concurrency-Safe Booking
* Maintenance Scheduling
* Automatic Conflict Resolution
* Pagination
* Search & Filtering
* Centralized Error Handling
* Input Validation
* Rate Limiting
* Responsive UI

---

# License

This project is licensed under the MIT License.

---

# Author

**Sai Harshith**

**GitHub:** [Harshith014](https://github.com/Harshith014)

**LinkedIn:** [Sai Harshith](https://www.linkedin.com/in/sai-harshith-m-4409b831a/)

---

# Conclusion

SlotMatrix demonstrates the implementation of a production-inspired coworking space reservation platform using the MERN stack. The application focuses on secure authentication, role-based access control, concurrency-safe booking, maintenance scheduling, booking approval workflows, and scalable REST API design.

The project emphasizes clean architecture by separating controllers, services, models, middleware, and utilities, making it maintainable, extensible, and suitable for real-world applications while showcasing backend engineering concepts such as transactions, conflict detection, and workflow automation.
