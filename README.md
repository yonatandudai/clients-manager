# 🧾 Client Management App (CRM)

A full-stack client management system (CRM) built with **React**, **Node.js**, **Express**, and **MongoDB**.  
Includes authentication, role-based access, client CRUD operations, and CSV export.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT, bcrypt)
- 👥 **Role-based access** (Admin/User)
- 📋 **Client Management** (Create, Read, Update, Delete)
- 🔍 **Search/filter clients**
- 📤 **Export to CSV**
- 🎨 **Responsive UI** (Tailwind CSS)
- 🔒 **Protected Routes** via React Context

---

## 🛠️ Technologies

**Frontend:**
- React (Vite)
- React Router
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- Bcrypt for password hashing
- Joi for validation

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/client-management-app.git
cd client-management-app
```

### 2. Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 3. Environment variables

In `backend/.env`, add your MongoDB connection string:

```env
PORT=5000
JWT_SECRET=your_super_secret_key
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/client-manager?retryWrites=true&w=majority
```

### 4. Run the app

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

App will be running at:  
👉 Frontend: `http://localhost:5173`  
👉 Backend: `http://localhost:5000`

---

## 👤 Roles

- **Admin** – Full access: add, edit, delete clients
- **User** – Read-only access

---

## 📂 Folder Structure

```
client-management-app/
├── frontend/         # React app (Vite + Tailwind)
└── backend/          # Node.js + Express + MongoDB API
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Author

Created by [Yonatan Dudai](https://github.com/yonatandudai)  
Feel free to fork, star, or contribute!
