Bloggy - MERN Stack Blog Platform
Overview
Bloggy is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). It is a single-page application (SPA) with modular React components, integrated with Gemini API for advanced content processing and ImageKit for efficient image management. The app is deployed at skrsikop.vercel.app, with a live demo available at https://bloggy-iota-liart.vercel.app/. For inquiries, contact skrsikop@gmail.com.
Features

Single-Page Application: Fast, seamless navigation using React.
Authentication: Secure JWT-based admin authentication.
Image Handling: ImageKit for optimized image uploads and delivery.
AI Integration: Gemini API for enhanced content features.
Responsive UI: Tailwind CSS for a modern, mobile-friendly design.
Database: MongoDB for robust data storage.

Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Atlas)
Image Management: ImageKit
AI: Gemini API
Authentication: JSON Web Tokens (JWT)
Deployment: Vercel

Project Structure
Client
The client is a React-based SPA built with Vite. It uses reusable components for modularity. Key pages include:

Home: Displays all blog posts.
Blog Post: Shows individual post details with rich media.
Admin Dashboard: Manages posts and users (admin-only).
Create/Edit Post: Form for creating or editing posts with ImageKit support.

Server
The server, built with Node.js and Express.js, provides RESTful APIs for:

CRUD operations for blog posts.
JWT-based user authentication.
Image uploads via ImageKit.
MongoDB integration.
Gemini API for content processing.

Installation
Prerequisites

Node.js (v18.x+)
MongoDB (local or Atlas)
Git
ImageKit account
Gemini API key
Vercel CLI (optional for deployment)

Steps

Clone the Repository
git clone https://github.com/your-username/bloggy.git
cd bloggy


Set Up Client
cd client
npm install

Create a .env file in client:
VITE_BASE_URL=http://localhost:3000

Start the client:
npm run dev


Set Up Server
cd server
npm install

Create a .env file in server:
MONGODB_URI="mongodb+srv://skrsikop:blog-app@cluster0.tqaze8x.mongodb.net"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="skrsikop"
JWT_SECRET="secret@2025"
IMAGEKIT_PUBLIC_KEY="public_Sg9iNmkrYG4pO5sRpXrp0ksOmC0="
IMAGEKIT_PRIVATE_KEY="private_ZU9wqOIvcPjLqygvt2+5umoPBMI="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/skrsikop"
GEMINI_API_KEY="AIzaSyD9a8pHZoJsFVsF-t_xUG19Scq2_xb_n1g"

Start the server:
npm run start


Access the App

Client: http://localhost:3000
Server: http://localhost:5000 (or configured port)


Deploy to Vercel (Optional)
npm install -g vercel
cd client
vercel
cd ../server
vercel



Environment Variables
Client .env
VITE_BASE_URL=http://localhost:3000

Server .env
MONGODB_URI="mongodb+srv://skrsikop:blog-app@cluster0.tqaze8x.mongodb.net"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="skrsikop"
JWT_SECRET="secret@2025"
IMAGEKIT_PUBLIC_KEY="public_Sg9iNmkrYG4pO5sRpXrp0ksOmC0="
IMAGEKIT_PRIVATE_KEY="private_ZU9wqOIvcPjLqygvt2+5umoPBMI="
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/skrsikop"
GEMINI_API_KEY="AIzaSyD9a8pHZoJsFVsF-t_xUG19Scq2_xb_n1g"

Demo
Check out the live demo at https://bloggy-iota-liart.vercel.app/ or visit skrsikop.vercel.app.
Contributing

Fork the repository.
Create a branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push: git push origin feature/your-feature.
Submit a pull request.

Contact
Reach out at skrsikop@gmail.com for questions or feedback.