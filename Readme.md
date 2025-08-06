# Bloggy 📝 – MERN Stack Blog Platform

## 🌐 Live Demo

🔗 [Visit Live App](https://bloggy-iota-liart.vercel.app/)
🔗 [Developer Website](https://skrsikop.vercel.app/)

---

## 📖 Overview

**Bloggy** is a full-stack blog application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It's a modern, responsive, single-page application (SPA) that enables content creation, management, and display using powerful tools like **Gemini AI** and **ImageKit**.

---

## 🚀 Features

* ⚛️ **SPA Architecture:** Smooth navigation with React + Vite.
* 🔐 **Authentication:** JWT-based secure admin login.
* 🖼️ **Image Uploads:** Handled via [ImageKit](https://imagekit.io/).
* 🤖 **AI Support:** Integrated Gemini API for smart content assistance.
* 📱 **Mobile-Friendly:** Built with Tailwind CSS.
* 🗄️ **Database:** MongoDB for scalable data storage.

---

## 🛠️ Tech Stack

| Layer        | Tech                      |
| ------------ | ------------------------- |
| Frontend     | React, Vite, Tailwind CSS |
| Backend      | Node.js, Express.js       |
| Database     | MongoDB Atlas             |
| Image CDN    | ImageKit.io               |
| AI Assistant | Gemini API                |
| Auth         | JSON Web Tokens (JWT)     |
| Deployment   | Vercel                    |

---

## 📁 Project Structure

### 🖥️ Client (React + Vite)

* `Home Page`: Lists all blogs.
* `Single Blog View`: Detailed blog with media.
* `Admin Dashboard`: Manage content.
* `Create/Edit Blog`: Forms with image upload support.

### 🌐 Server (Node.js + Express)

* RESTful APIs:

  * CRUD operations for blog posts.
  * JWT-based admin authentication.
  * ImageKit integration.
  * Gemini-powered content handling.

---

## ⚙️ Installation Guide

### 🔸 Prerequisites

* Node.js (v18+)
* MongoDB (Atlas or Local)
* Git
* ImageKit Account
* Gemini API Key
* (Optional) Vercel CLI

---

### 🧱 Clone the Project

```bash
git clone https://github.com/your-username/bloggy.git
cd bloggy
```

---

### 📦 Client Setup

```bash
cd client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_BASE_URL=http://localhost:3000
```

Start the client:

```bash
npm run dev
```

---

### 🧩 Server Setup

```bash
cd ../server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGODB_URI="your_mongodb_connection_uri"
ADMIN_EMAIL="your_admin_email"
ADMIN_PASSWORD="your_admin_password"
JWT_SECRET="your_jwt_secret"
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="your_imagekit_url"
GEMINI_API_KEY="your_gemini_api_key"
```

Start the server:

```bash
npm run start
```

---

## 💻 Access the App

* **Client**: [http://localhost:3000](http://localhost:3000)
* **Server**: [http://localhost:5000](http://localhost:5000)

---

## ☁️ Deploy to Vercel (Optional)

Install Vercel CLI:

```bash
npm install -g vercel
```

Deploy client:

```bash
cd client
vercel
```

Deploy server:

```bash
cd ../server
vercel
```

---

## 🔒 Environment Variables Summary

| File        | Variable(s)                                                       |
| ----------- | ----------------------------------------------------------------- |
| client/.env | `VITE_BASE_URL=http://localhost:3000`                             |
| server/.env | `MONGODB_URI`, `JWT_SECRET`, `IMAGEKIT_*`, `GEMINI_API_KEY`, etc. |

> ⚠️ **Do not commit `.env` files or sensitive credentials to GitHub!**

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📬 Contact

📧 Email: [skrsikop@gmail.com](mailto:skrsikop@gmail.com)

---

## ⭐️ Show Your Support

If you like this project, give it a ⭐️ on GitHub!
