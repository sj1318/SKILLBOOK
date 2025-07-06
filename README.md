# 💡 Skillbook

Skillbook is a full-stack web application designed to help users share skills, view stories, and connect through interactive learning and collaboration. Built as a portfolio project, it showcases both frontend and backend capabilities.

---

## 📌 Features

- 👤 User Registration & Login (JWT Auth)
- 📝 Create & Edit User Profiles
- 🎯 Share Your Skills with Image/Video
- 🔄 Find a Skill Swap
- 📚 View Recent Stories from Other Users
- 🔐 Protected Routes & Secure API
- 🎨 Responsive, interactive UI (React)

---

## 🛠️ Tech Stack

### 🔹 Frontend:
- React.js
- CSS
- Axios
- LocalStorage for token storage

### 🔹 Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt for password hashing
- JWT for authentication

---

## 📁 Project Structure

skillbook/
├── backend/ # Express API & MongoDB models
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── index.js
│
├── .gitignore
└── README.md
