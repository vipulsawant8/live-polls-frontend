![Vercel](https://vercelbadge.vercel.app/api/vipulsawant8/kanban-board-task-management-app-frontend)
![CI](https://github.com/vipulsawant8/live-real-time-poll-app-frontend/vercel-deploy.yml/badge.svg)

# Live Poll App — Frontend

A clean and modular **live polling frontend** built with React, Redux Toolkit, Socket.IO, and Vite.  
Designed to demonstrate real-world frontend architecture including authentication,
real-time updates, reusable form systems, and scalable state management.

> This repository contains the **frontend only**.  
> It communicates with a backend via REST APIs and Socket.IO.

---

## Features

### Polls
- Create new polls
- View active polls
- View individual poll details
- Live poll updates using WebSockets
- Optimistic UI updates with server sync

### Authentication
- User registration and login
- Auto session restoration on refresh
- Protected routes
- Centralized logout handling
- Graceful auth error handling

> Authentication is handled via **HTTP-only cookies** by the backend.  
> No tokens are stored in `localStorage`.

### Reusable Form System
- Dynamic form rendering
- `react-hook-form` integration
- Custom input components (text, textarea, checkbox, select, file)
- Resettable and extensible form architecture

### Real-Time Communication
- Socket.IO integration via context provider
- Centralized socket lifecycle management
- Event-based emitters and receivers

---

## Tech Stack
- React + Vite
- Redux Toolkit
- React Router v6
- Socket.IO Client
- Axios
- React-Bootstrap
- `react-hook-form`

---

## Folder Structure
```
src
├── api
│   └── axios.js
├── app
│   ├── features
│   │   ├── auth
│   │   └── poll
│   ├── logoutHandler.js
│   └── store.js
├── components
│   ├── auth
│   ├── poll
│   ├── form
│   ├── common
│   └── navbar
├── layout
├── middleware
├── pages
│   ├── auth
│   └── polls
├── router
├── socket
│   ├── socket.js
│   ├── events.js
│   ├── emitters.js
│   ├── receivers.js
│   └── SocketProvider.jsx
└── utils
```

---

## Authentication Flow
1. App loads → auth state initialized
2. Session restored via backend cookie
3. Unauthorized requests handled globally
4. Logout clears client state and redirects

---

## Real-Time Flow (Socket.IO)
1. Socket initialized via `SocketProvider`
2. Events registered centrally
3. Poll updates pushed from server
4. Redux store updated in real time

---

## Key Architecture Decisions
- Feature-based folder structure for scalability
- Centralized Axios instance and error handling
- Socket logic isolated from UI components
- Reusable form abstraction for rapid feature development
- Clear separation of REST and WebSocket concerns

---

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

---

## Environment Variables

```env
VITE_API_URL=http://localhost:4000
```

> `.env` is ignored by Git. Do not commit it.

---

## Notes for Reviewers

This project is built strictly for demonstration and interview purposes.  
All data is mock or test data. No real user information is stored.
