# Patient Language App

A comprehensive platform connecting requesters with language interpreters. This monorepo contains both the backend API server and the React web application.

## 🎯 Project Overview

Patient Language App is a full-stack application that streamlines the process of matching requesters with qualified language interpreters. The platform enables:

- **Requesters** to submit interpretation requests with specific language and clinical requirements
- **Interpreters** to browse and accept eligible requests matching their language skills
- **Real-time communication** between interpreters and requesters through integrated chat
- **Appointment management** with calendar scheduling and notifications
- **Email notifications** for request proposals and appointment updates

## 📁 Repository Structure

This is a monorepo containing two main projects:

```
patient-language-app/
├── backend/                 # Express.js TypeScript API server
│   ├── src/
│   ├── package.json
│   ├── README.md           # Backend documentation
│   └── Dockerfile
│
├── frontend/               # React TypeScript web application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── README.md           # Frontend documentation
│   └── Dockerfile
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (for backend)

### Backend Setup

```bash
cd backend
npm install
npm run start-dev
```

The backend will run at `http://localhost:8080`

See [backend/README.md](backend/README.md) for detailed documentation.

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run at `http://localhost:3000`

See [frontend/README.md](frontend/README.md) for detailed documentation.

## 🏗️ Architecture

### Backend Stack
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database with Mongoose
- **JWT** - Token-based authentication
- **Nodemailer** - Email service
- **Winston** - Logging

### Frontend Stack
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Component library
- **React Router** - Client-side routing
- **CometChat** - Real-time messaging
- **Formik & Yup** - Form management and validation

## 📚 Documentation

- **[Backend Documentation](backend/README.md)** - API endpoints, setup, architecture, database models
- **[Frontend Documentation](frontend/README.md)** - Components, modules, features, setup instructions

## 🔐 Security

### Authentication
- JWT-based authentication with token expiry
- Password hashing with bcrypt
- Email verification for new accounts
- Password reset with secure token flow

## 📋 API Endpoints Overview

The backend provides REST APIs organized by resource:

| Base Path | Resource | Operations |
|-----------|----------|-----------|
| `/api/auth` | Authentication | Login, verify, password reset |
| `/api/interpreter` | Interpreters | CRUD, appointments, requests |
| `/api/requester` | Requesters | CRUD, appointments, requests |
| `/api/request` | Requests | CRUD, cancel, list |
| `/api/appointment` | Appointments | CRUD, status updates |
| `/api/notification` | Notifications | List, read, seen |

See [backend/README.md](backend/README.md) for complete API documentation.

## 🎨 Frontend Features

| Module | Description |
|--------|-------------|
| **Authentication** | Registration, login, email verification, password reset |
| **Dashboard** | Overview of appointments and requests |
| **Requests** | Create, manage, and track interpretation requests |
| **Calendar** | Schedule and view appointments |
| **Chat** | Real-time messaging with CometChat |
| **Notifications** | Real-time updates for new requests and changes |
| **Profile** | Manage user information and preferences |
| **Settings** | Account and notification preferences |

See [frontend/README.md](frontend/README.md) for complete feature documentation.

## 🗄️ Database Schema

Key models:
- **User** - Authentication and base user information
- **Interpreter** - Professional profile with languages and qualifications
- **Requester** - Medical facility/professional profile
- **Request** - Interpretation request with language and clinical details
- **Appointment** - Matched interpreter-requester appointment
- **Notification** - User notifications for requests and updates

## 🤝 User Roles

### Interpreter
- Browse proposed requests matching language skills
- Accept/reject appointment requests
- View upcoming appointments
- Message requesters through chat
- Manage profile and language qualifications

### Requester
- Create interpretation requests with language and clinical details
- View request status and matched interpreters
- Schedule appointments
- Message interpreters through chat
- Manage facility and profile information

## ✨ Key Features

- **Smart Matching** - Automated proposal system based on language skills
- **Real-time Chat** - Integrated messaging platform
- **Email Notifications** - Automated updates via email
- **Calendar Integration** - Visual appointment management
- **Role-based Access** - Different workflows for interpreters and requesters
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Input Validation** - Comprehensive form and request validation
- **Error Handling** - User-friendly error messages and logging

## 🚢 Deployment

### Backend Deployment
- Environment: Heroku / AWS / Cloud provider
- Database: MongoDB Atlas
- Dependencies: Node.js runtime

### Frontend Deployment
- Environment: Vercel / Netlify / Static hosting
- Build: `npm run build`
- Environment variables required for CometChat integration

## 📞 Support

For issues, feature requests, or documentation improvements, please open an issue in the repository.

## 📄 License

ISC License

---

**For detailed documentation:**
- Backend: See [backend/README.md](backend/README.md)
- Frontend: See [frontend/README.md](frontend/README.md)
