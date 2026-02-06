# Patient Language App - Web Frontend

React TypeScript web application for the Patient Language App platform - connecting medical professionals with language interpreters.

## Overview

The frontend provides a comprehensive web interface for:
- **Authentication** - User registration, login, email verification, password reset
- **Dashboard** - View upcoming appointments and requests
- **Request Management** - Create, view, and manage interpretation requests
- **Appointment Calendar** - Schedule and track appointments
- **Real-time Chat** - Communicate with interpreters/requesters using CometChat
- **Notifications** - Real-time notifications for new requests and appointment updates
- **User Profiles** - Manage interpreter and requester profiles
- **Settings** - User account and preference management

## Project Structure

```
frontend/
├── src/
│   ├── api/                 # API client services
│   │   ├── api.ts           # Axios configuration
│   │   ├── appointment.ts   # Appointment API calls
│   │   ├── auth.ts          # Authentication API calls
│   │   ├── endpoint.ts      # API endpoint definitions
│   │   ├── interpreter.ts   # Interpreter API calls
│   │   ├── notification.ts  # Notification API calls
│   │   ├── request.ts       # Request API calls
│   │   └── requester.ts     # Requester API calls
│   │
│   ├── assets/              # Static assets
│   │   └── languages.json   # Supported languages list
│   │
│   ├── config/              # Configuration files
│   │   ├── APIConfig.ts     # API configuration
│   │   ├── APIRoute.ts      # API route constants
│   │   ├── appointmentMode.ts
│   │   ├── clinicalSetting.ts
│   │   ├── colors.ts        # Color palette constants
│   │   ├── constants.ts     # App constants
│   │   ├── frontendRoutes.ts   # Client-side routes
│   │   ├── languages.ts     # Language configurations
│   │   ├── positions.ts     # Position types
│   │   ├── properties.ts    # App properties
│   │   ├── statusCodes.ts   # Status code mappings
│   │   └── types/           # TypeScript type definitions
│   │
│   ├── modules/             # Feature modules (organized by feature)
│   │   ├── account/         # User account management
│   │   ├── auth/            # Authentication pages
│   │   ├── calendar/        # Calendar/appointment scheduling
│   │   ├── cards/           # Reusable card components
│   │   ├── chat/            # Chat/messaging components
│   │   ├── dashboard/       # Dashboard overview
│   │   ├── landing-page/    # Landing page
│   │   ├── layouts/         # Layout components
│   │   ├── navigation/      # Navigation components
│   │   ├── notification/    # Notification components
│   │   ├── request/         # Request management components
│   │   ├── settings/        # Settings management
│   │   └── upcoming/        # Upcoming appointments/requests
│   │
│   ├── pages/               # Next.js pages (routing)
│   │   ├── _app.tsx         # App wrapper and providers
│   │   ├── index.tsx        # Home page
│   │   ├── account/         # Account pages
│   │   ├── calendar/        # Calendar pages
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── messages/        # Messages pages
│   │   ├── password/        # Password reset pages
│   │   ├── request/         # Request pages
│   │   └── settings/        # Settings pages
│   │
│   ├── shared/              # Shared utilities and components
│   │   ├── ResponsiveLayout.tsx
│   │   ├── components/      # Reusable shared components
│   │   ├── contexts/        # React Context for state
│   │   ├── hoc/             # Higher-order components
│   │   ├── hooks/           # Custom React hooks
│   │   └── reducers/        # State reducers
│   │
│   ├── ui/                  # UI component library
│   │   ├── theme.ts         # Material-UI theme
│   │   ├── Elements/        # Custom UI elements
│   │   ├── Form/            # Form components
│   │   └── navigation/      # Navigation UI
│   │
│   ├── utils/               # Utility functions
│   │   ├── authUtils.ts     # Authentication utilities
│   │   ├── functions.ts     # Helper functions
│   │   ├── secrets.ts       # Environment variable management
│   │   └── validators.ts    # Form validation functions
│   │
│   ├── vendor/              # Third-party library customizations
│   │   └── cometchat-pro-react-ui-kit/
│   │
│   ├── App.tsx              # Root App component
│   └── index.tsx            # React entry point
│
├── public/                  # Static files
│   ├── index.html
│   ├── manifest.json        # PWA manifest
│   └── favicon.ico
│
├── Dockerfile               # Docker container configuration
├── package.json             # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## Technologies

### Core Frameworks
- **React** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **React Router** - Client-side routing for single-page application
- **Formik & Yup** - Form management and validation

### UI / Styling
- **Material-UI (MUI)** - Component library for UI elements
- **Styled Components** - CSS-in-JS for component styling
- **DevExpress Scheduler** - Calendar and appointment scheduling
- **Notistack** - Toast notifications

### Real-time Communication
- **CometChat Pro** - Chat messaging and user presence
- **Axios** - HTTP client for API requests

### Utilities
- **React Helmet** - Manage document head (SEO)
- **Date-fns** - Date manipulation and formatting
- **Firebase** - Backend-as-a-service (optional)

## Feature Modules

### Authentication Module (`/auth`)
- User registration (interpreter/requester)
- Email verification flow
- Login page
- Password reset and forgot password flows

### Dashboard Module (`/dashboard`)
- Overview of appointments and requests
- Quick actions for creating new requests
- Role-specific dashboards for interpreters and requesters

### Request Management Module (`/request`)
- Create new interpretation requests with language selection
- View request details and status
- Cancel or modify pending requests
- Filter and search requests

### Calendar & Appointments (`/calendar`)
- View appointments in calendar view
- Schedule appointments with interpreters
- Accept/reject appointment proposals
- Reschedule appointments

### Chat Module (`/chat`)
- Real-time messaging with CometChat integration
- User presence indicators
- Message history

### Notifications Module (`/notification`)
- Display new request notifications
- Appointment status updates
- Real-time notification center
- Mark notifications as read

### User Account Module (`/account`)
- View and edit profile information
- Manage languages spoken (for interpreters)
- Update facility information (for requesters)
- View verification status

### Settings Module (`/settings`)
- Account preferences
- Notification preferences
- Security settings

## Component Architecture

### Layouts
- **ResponsiveLayout** - Adaptive layout for different screen sizes
- Navigation patterns for desktop and mobile

### Custom Hooks
- `useAuth` - Authentication state management
- `useNotifications` - Notification handling
- `useFetch` - Data fetching with loading/error states

### Context
- **AuthContext** - Global authentication state
- **ThemeContext** - UI theme configuration

### UI Components
- **Forms** - Input fields, selects, date pickers
- **Cards** - Request cards, appointment cards, profile cards
- **Modals** - Dialogs and popups
- **Navigation** - Header, sidebar, bottom navigation

## Setup and Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create `.env.development` and `.env.production` files:

```env
REACT_APP_COMET_CHAT_APP_ID=your_app_id
REACT_APP_COMET_CHAT_REGION=your_region
REACT_APP_COMET_CHAT_AUTH_KEY=your_auth_key
```

### Build and Run

Development:
```bash
npm start
```

Production build:
```bash
npm run build
```

Run tests:
```bash
npm test
```

## Key Features

- **Responsive Design** - Mobile, tablet, and desktop support
- **Real-time Notifications** - WebSocket-based instant updates
- **Appointment Matching** - Smart proposal system based on language skills
- **Role-based Views** - Different UI for interpreters and requesters
- **Calendar Integration** - Visual appointment scheduling
- **Direct Messaging** - Built-in chat with messaging platform
- **Form Validation** - Client-side and server-side validation
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliance considerations

## Styling Customization

### Material-UI Theme
Located in [src/ui/theme.ts](src/ui/theme.ts) - customize colors, typography, and component variants.

### Color Palette
Located in [src/config/colors.ts](src/config/colors.ts) - centralized color definitions.

## Building for Production

```bash
npm run build
```

The build is optimized and ready for deployment. See the deployment section in package.json for hosting options.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
