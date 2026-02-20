# Live Polls — Frontend (React + Redux + Socket.IO)

[![Vercel](https://img.shields.io/badge/vercel-deployed-success?logo=vercel&logoColor=white)](https://live-polls-front-end.vercel.app)
![License](https://img.shields.io/github/license/vipulsawant8/live-polls-frontend)
![React](https://img.shields.io/badge/react-19.x-blue)
![Redux Toolkit](https://img.shields.io/badge/redux-toolkit-purple)
![Socket.IO](https://img.shields.io/badge/socket.io-realtime-black)
![Vite](https://img.shields.io/badge/vite-build-646CFF)

**Live App:** https://live-polls-front-end.vercel.app

Frontend for a Polling / Voting application, built with React, Redux Toolkit, and Socket.IO.

This application demonstrates authentication-aware UI, real-time updates, and layout-based route protection, integrating with a separately deployed backend API.

## Architecture Overview

The frontend is designed to stay UI-focused, with security and session handling delegated to the backend.

Key responsibilities:

- Rendering authenticated and public views.
- Managing global UI state using Redux Toolkit.
- Coordinating API calls and socket events.
- Handling real-time vote updates via WebSockets.
- Handling session expiry and forced logout gracefully.
- Ensuring authentication secrets are never stored on the client.

## Authentication & Session Handling

This frontend integrates with a **cookie-based authentication system with refresh token rotation** provided by the backend.
The client remains UI-focused and does not manage token storage directly.

### Registration Flow

New users complete a multi-step registration process:

1. Submit email to receive a one-time password (OTP)
2. Verify OTP
3. Complete account registration

All OTP validation, security checks, and account creation logic are handled exclusively by the backend.

### Key characteristics

- Tokens are stored in **HTTP-only cookies** (server-managed)
- No access or refresh tokens are stored in localStorage or Redux
- Redux stores only user identity and authentication state
- A persistent `deviceId` is generated client-side to support secure multi-device sessions

### Session lifecycle

1. On application load, authentication state is restored via `/auth/me`
2. Protected routes are guarded using layout-based access control
3. Axios interceptors automatically attempt token refresh on `401` responses from protected endpoints
4. Failed refresh triggers a **global logout**
5. Requests are retried **once** after a successful refresh to prevent loops

## Real-Time Poll Updates

This application uses Socket.IO for real-time behavior.

- Users receive live vote updates without refreshing
- Poll results update instantly across connected clients
- Socket logic is isolated in a dedicated socket/ module
- Socket lifecycle is managed using a SocketProvider
- All vote validation and persistence is handled by the backend; sockets are used only for broadcasting updates.

This allows stateless REST APIs to coexist with real-time UI updates.

## Routing & Access Control

Routing is layout-driven, not page-driven.

```bash
/login, /register, /register-email, /verify-email, /create-account
 └── PublicLayout

/polls
 └── AuthLayout (protected)
     ├── PollsListPage
     └── SinglePollPage
```

## Design decisions

- Public and authenticated routes are structurally separated
- Auth checks live in layouts, not inside pages
- Pages remain focused on rendering and interaction logic
- Route-level lazy loading improves performance

## Features

- Login / register / logout flow
- Protected routes using layout guards
- Create and view polls
- Cast votes on polls
- Real-time vote count updates
- Centralized toast notifications
- Reusable form system

## Demo Environment (For Reviewers)

To simplify evaluation:

- Demo accounts may be used for testing
- All polls & options are fictional
- No real user or production data is stored
- Demo data may reset periodically

This environment exists only for UI and UX evaluation.

A demo account is provided:

- **Email:** demo.user1.chariot057@aleeas.com
- **Password:** Demo@1234

Demo credentials are provided only for UI and UX evaluation.

## Project Structure

```bash
src
├── api
│   └── axios.js
├── app
│   ├── features
│   │   ├── auth
│   │   │   └── authSlice.js
│   │   └── poll
│   │       └── pollSlice.js
│   ├── logoutHandler.js
│   └── store.js
├── App.css
├── App.jsx
├── assets
│   ├── polling.png
│   └── react.svg
├── components
│   ├── auth
│   │   ├── AuthInitializer.jsx
│   │   ├── index.js
│   │   ├── LoginForm.jsx
│   │   ├── LogoutButton.jsx
│   │   └── RegisterForm.jsx
│   ├── common
│   │   └── PageLoader.jsx
│   ├── form
│   │   ├── CustomForm.jsx
│   │   ├── index.js
│   │   ├── InputCheckbox.jsx
│   │   ├── InputFile.jsx
│   │   ├── InputSelect.jsx
│   │   ├── InputText.jsx
│   │   ├── InputTextarea.jsx
│   │   └── SubmitButton.jsx
│   ├── navbar
│   │   └── NavbarComponent.jsx
│   └── poll
│       └── AddPoll.jsx
├── config
│   └── toast.config.js
├── index.css
├── layout
│   ├── AppLayout.jsx
│   ├── AuthLayout.jsx
│   └── PublicLayout.jsx
├── main.jsx
├── middleware
│   └── errorMiddleware.js
├── pages
│   ├── auth
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── NotFound.jsx
│   └── polls
│       ├── PollsListPage.jsx
│       └── SinglePollPage.jsx
├── router
│   └── router.jsx
├── socket
│   ├── emitters.js
│   ├── events.js
│   ├── receivers.js
│   ├── socket.js
│   └── SocketProvider.jsx
└── utils
    ├── asyncThunkWrapper.js
    ├── deviceId.js
    └── notify.js
```

## Environment Configuration

Create a local environment file:

```bash
cp .env.example .env
```

### Required variable:

- VITE_API_URL — backend API base URL
- VITE_SOCKET_URL - backend socket base URL

No secrets are stored in the frontend.

## Backend Integration

This frontend communicates with a separately deployed backend API.

- Backend Repository: https://github.com/vipulsawant8/live-polls-backend
- Backend Deployment: Render
- Auth Strategy: Cookie-based authentication with refresh token rotation
- Session Restoration: `/auth/me`
- Device Tracking: Client-generated `deviceId`
- Socket.IO is used for real-time vote updates
- Backend handles authentication and poll persistence

## License

This project is licensed under the MIT License.

## Final note

This frontend is designed for portfolio demonstration and technical evaluation.
It is not intended for real user data or production use.
