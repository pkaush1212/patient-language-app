# Patient Language App - Backend

Express.js TypeScript backend server for the Patient Language App platform.

## Overview

The backend provides RESTful APIs to manage:
- **User Authentication** - Registration, login, email verification, password reset
- **Interpreters** - Manage interpreter profiles and qualifications
- **Requesters** - Manage requester profiles and medical facility information
- **Requests** - Create and manage interpretation requests with language and mode preferences
- **Appointments** - Match interpreters with requests and track appointments
- **Notifications** - Real-time notifications for new requests and appointment updates
- **Email Services** - Automated email notifications for user actions

## Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── auth.ts          # JWT payload structures
│   │   ├── email_config.ts  # Email service configuration
│   │   ├── properties.ts    # Email templates and constants
│   │   └── statusCodes.ts   # HTTP status code definitions
│   │
│   ├── controllers/         # Request handlers for each resource
│   │   ├── appointment.controller.ts
│   │   ├── interpreter.controller.ts
│   │   ├── notification.controller.ts
│   │   ├── request.controller.ts
│   │   ├── requester.controller.ts
│   │   └── userAuth.controller.ts
│   │
│   ├── database/
│   │   ├── db_config.ts     # MongoDB connection configuration
│   │   ├── interactions/    # Database queries and operations
│   │   │   ├── appointment.ts
│   │   │   ├── interpreter.ts
│   │   │   ├── notification.ts
│   │   │   ├── request.ts
│   │   │   ├── requester.ts
│   │   │   └── user.ts
│   │   └── models/          # MongoDB schema definitions
│   │       ├── appointment.ts
│   │       ├── interpreter.ts
│   │       ├── request.ts
│   │       ├── requester.ts
│   │       ├── user.ts
│   │       └── notifications/
│   │
│   ├── domain/              # TypeScript interfaces and types
│   │   ├── IAppointment.ts
│   │   ├── IInterpreter.ts
│   │   ├── IRequest.ts
│   │   ├── IRequester.ts
│   │   ├── IUser.ts
│   │   └── notifications/
│   │       ├── INotification.ts
│   │       ├── IProposedRequestNotification.ts
│   │       └── IRequestStateNotification.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth/            # Authentication middleware
│   │   ├── errors/          # Error handling middleware
│   │   └── validators/      # Request validation middleware
│   │
│   ├── routes/              # API route definitions
│   │   ├── appointment.ts
│   │   ├── interpreter.ts
│   │   ├── notification.ts
│   │   ├── request.ts
│   │   ├── requester.ts
│   │   ├── userAuth.ts
│   │   └── routes.ts        # Route configuration
│   │
│   ├── services/            # Business logic services
│   │   └── email-sender.ts  # Email notification service
│   │
│   ├── utils/               # Utility functions
│   │   ├── auth.ts          # JWT token generation and verification
│   │   ├── functions.ts     # Helper functions
│   │   ├── logger.ts        # Logging service
│   │   └── secrets.ts       # Environment variable management
│   │
│   └── index.ts             # Application entry point
│
├── Dockerfile               # Docker container configuration
├── package.json             # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
├── tslint.json              # TypeScript linting rules
└── README.md
```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/login/:userType` | Login user (interpreter/requester) | No |
| GET | `/verify/email/:token` | Verify email address | No |
| GET | `/verify/team/:token` | Approve interpreter by admin | No |
| POST | `/password/reset` | Reset password with token | No |
| POST | `/password/reset/form` | Reset password with old password | Yes |
| POST | `/verify/check` | Check if user email is verified | No |
| POST | `/verify/resend` | Resend verification email | Yes |
| POST | `/password/forgot` | Request password reset email | No |

### Interpreters (`/api/interpreter`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new interpreter profile | No |
| GET | `/` | Get all interpreters | Yes |
| GET | `/:interpreterId` | Get interpreter details | Yes |
| PUT | `/:interpreterId` | Update interpreter profile | Yes |
| DELETE | `/:interpreterId` | Delete interpreter account | Yes |
| GET | `/requests/proposed` | Get proposed requests for interpreter | Yes |
| GET | `/appointments` | Get appointments for interpreter | Yes |

### Requesters (`/api/requester`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new requester profile | No |
| GET | `/` | Get all requesters | Yes |
| GET | `/:requesterId` | Get requester details | Yes |
| PUT | `/:requesterId` | Update requester profile | Yes |
| DELETE | `/:requesterId` | Delete requester account | Yes |
| GET | `/requests` | Get requests created by requester | Yes |
| GET | `/appointments` | Get appointments for requester | Yes |

### Requests (`/api/request`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create new interpretation request | Yes |
| GET | `/:requestId` | Get request details | Yes |
| PUT | `/:requestId` | Update request details | Yes |
| PUT | `/cancel/:requestId` | Cancel interpretation request | Yes |
| DELETE | `/:requestId` | Delete request | Yes |

### Appointments (`/api/appointment`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create appointment (interpreter accepts request) | Yes |
| GET | `/:appointmentId` | Get appointment details | Yes |
| PUT | `/:appointmentId` | Update appointment status | Yes |
| DELETE | `/:appointmentId` | Cancel appointment | Yes |

### Notifications (`/api/notification`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/byReceiver` | Get notifications for logged-in user | Yes |
| PUT | `/read/:notificationId` | Mark notification as read | Yes |
| PUT | `/seen` | Mark all notifications as seen | Yes |

## Technologies

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email service
- **Winston** - Logging library
- **Jest** - Unit testing framework

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create `.env`, `.env.dev`, and `.env.prod` files with the following variables:

```env
NODE_ENV=dev
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
URI=http://localhost:8080/api/
FRONTEND_URI=http://localhost:3000/
```

### Build and Run

Development:
```bash
npm run start-dev
```

Production:
```bash
npm run build
npm start
```

### Run Tests
```bash
npm test
```

## Key Features

- **Email Verification** - Send verification emails to new users
- **Password Reset** - Secure password reset flow with token expiry
- **Request Matching** - Auto-propose requests to interpreters based on language skills
- **Real-time Notifications** - Notify users of new requests and appointment changes
- **Role-based Access Control** - Separate workflows for interpreters and requesters
- **Input Validation** - Comprehensive request validation middleware
- **Error Handling** - Centralized error handling and logging

## Database Models

- **User** - Base user with authentication info
- **Interpreter** - Interpreter profile with languages and qualifications
- **Requester** - Requester profile with facility information
- **Request** - Interpretation request with language and clinical details
- **Appointment** - Matched appointment between interpreter and requester
- **Notification** - User notifications for requests and appointment updates

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Email verification for accounts
- Request validation on all endpoints
- Environment-based configuration for secrets
- CORS protection with Helmet middleware
