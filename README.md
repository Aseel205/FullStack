# 📝 Full Stack Notes App with User Verification

A full stack web application for managing personal notes, with user authentication and verification features. Built using React, Node.js, and a JSON-based backend.

## 🚀 Features

- Create, view, and paginate notes
- User registration and login
- Simple authentication and session handling
- Persistent storage using JSON server

## 🧩 Tech Stack

### 🔧 Frontend
- **React** (with Vite)
- **Axios** for API communication
- **Tailwind CSS** for styling
- **React Router** for navigation

### 🔧 Backend
- **JSON Server** (mock REST API)
- Custom routes and middleware for authentication
- (Optional) **Express.js** if extended beyond JSON Server

### 🗃️ Database
- Flat-file storage using `db.json` or `data/notes.json`, `data/users.json`

## 📁 Folder Structure

```
FullStack-Notes-App/
├── backend/
│   ├── data/
│   │   ├── notes.json
│   │   └── users.json
│   └── server.js (optional if using Express)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
└── README.md
```

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/FullStack-Notes-App.git
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start the JSON server

```bash
cd backend
npx json-server --watch data/notes.json --port 3001
```

> Add `--routes routes.json` and `--middlewares auth.js` if needed

### 4. Start the frontend app

```bash
cd frontend
npm run dev
```

## 📌 Notes

- Notes and user data are stored in flat `.json` files.
- Authentication is implemented using frontend logic and mock APIs.
- Project is suitable for learning full stack architecture.

## 📸 Screenshots

_Add UI screenshots here if available_

## 👤 Author

**Aseel Nassim Biadsy**  
[GitHub Profile](https://github.com/Aseel205)

---

Feel free to open issues or contribute improvements via pull requests.
