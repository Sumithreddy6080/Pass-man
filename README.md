# PassMan

A secure, modern, and minimal password manager web application built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## Features

- User authentication (JWT-based sign up/sign in)
- Secure password storage (backend with MongoDB)
- Add, edit, delete, and view saved passwords
- Toggle password visibility
- Responsive, modern UI with light/dark mode (Tailwind CSS)
- Protected dashboard (only accessible when logged in)
- Modular React codebase with context and hooks

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Context API, custom hooks
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd Pass-man
```

### 2. Backend Setup

```sh
cd backend
cp .env.example .env # Edit .env with your MongoDB URI and JWT secret
npm install
npm start
```

- The backend will run on `http://localhost:3000` by default.

#### Backend Environment Variables (`.env`)
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/passman
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d
```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
npm run dev
```
- The frontend will run on `http://localhost:5173` (or as shown in your terminal)

---

## Usage

1. Open the frontend in your browser.
2. Register a new account or sign in.
3. Add, view, edit, or delete your passwords securely.
4. Toggle between light and dark mode.

---

## Project Structure

```
Pass-man/
├── backend/
│   ├── controllers/         # Express controllers (auth, user)
│   ├── middlewares/         # JWT auth middleware
│   ├── models/              # Mongoose models (User, Data)
│   ├── routes/              # Express routes (auth, user)
│   ├── config/              # DB connection
│   ├── server.js            # Entry point
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/      # React UI components (PasswordList, AuthModal, etc.)
│   │   ├── context/         # AuthContext (authentication state)
│   │   ├── contex/          # (legacy/simple context, not used in main app)
│   │   ├── hooks/           # Custom hooks (useTheme)
│   │   ├── pages/           # Page components (Dashboard, Welcome)
│   │   ├── services/        # API service modules (passwordService, authService)
│   │   ├── App.jsx          # Main app with routing
│   │   └── ...
│   └── ...
└── ...
```

---

## Key Files & Concepts

### Frontend
- `src/context/AuthContext.jsx`: Handles authentication state, login/logout, and user fetching.
- `src/App.jsx`: Main app, sets up routes and context provider.
- `src/components/PasswordList.jsx`: Displays saved passwords with show/hide, edit, and delete actions.
- `src/services/passwordService.jsx`: Handles API calls for password CRUD operations.
- `src/hooks/useTheme.jsx`: Custom hook for dark/light mode.

### Backend
- `server.js`: Express app entry point.
- `middlewares/auth.js`: JWT authentication middleware.
- `controllers/auth.controller.js`: Handles registration and login.
- `controllers/user.controller.js`: Handles password CRUD for authenticated users.
- `models/User.js`, `models/Data.js`: Mongoose schemas for users and passwords.

---

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Passwords (Protected)
- `GET /api/user/data` — Get all passwords
- `POST /api/user/data` — Add a new password
- `PUT /api/user/data` — Update a password
- `DELETE /api/user/data` — Delete a password

> All protected routes require `Authorization: Bearer <token>` header.

---

## Customization & Theming
- Easily switch between dark and light mode using the toggle in the UI (see `useTheme.jsx`).
- All UI is built with Tailwind CSS for easy customization.

---

## Security Notes
- Passwords are stored securely in the backend database.
- JWT is used for authentication; keep your JWT secret safe.
- Never expose your `.env` or secrets in public repos.

---

## License
MIT

---

## Credits
- Built by Sumith Reddy 
- Inspired by modern password managers.
