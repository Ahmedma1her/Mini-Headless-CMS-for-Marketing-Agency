# 🧠 Mini Headless CMS for Marketing Agency

A full-stack Mini Headless Content Management System (CMS) designed for marketing agencies to manage content efficiently and deliver it via APIs.

---

## 🚀 Project Overview

This project provides a simple and user-friendly CMS that allows non-technical users to create, edit, and manage content such as blog posts and marketing campaigns.

The system follows a **Headless Architecture**, separating content management from content delivery, making it flexible for integration with any frontend.

---

## 🎯 Features

### 🖥️ Admin Dashboard
- View all posts in a structured table
- Add new posts
- Edit existing posts
- Delete posts

### 📝 Post Management
Each post includes:
- Title
- Body Content
- Category
- Status (Draft / Published)

### 🔐 Content Status Logic
- **Draft** → Not visible in Public API  
- **Published** → Available via API  

### 🔌 API (Backend Services)
- Create Post
- Retrieve Posts
- Update Post
- Delete Post
- Retrieve Published Posts (Public API)

---

## 🏗️ Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB

---

## 📡 API Endpoints

### Admin API
| Method | Endpoint        | Description        |
|--------|----------------|--------------------|
| POST   | /posts         | Create new post    |
| GET    | /posts         | Get all posts      |
| PUT    | /posts/:id     | Update post        |
| DELETE | /posts/:id     | Delete post        |

### Public API
| Method | Endpoint              | Description              |
|--------|----------------------|--------------------------|
| GET    | /posts/published     | Get published posts only |

---

## 🧩 System Architecture

```
Frontend (React)
        ↓
Backend (Node.js / Express)
        ↓
Database (MongoDB)
```

---

## 🗃️ Database Schema (Post)

| Field      | Type    | Description              |
|------------|--------|--------------------------|
| id         | String | Unique identifier        |
| title      | String | Post title               |
| body       | Text   | Post content             |
| category   | String | Content category         |
| status     | Enum   | Draft / Published        |
| createdAt  | Date   | Creation timestamp       |

---

## 📅 Project Plan

### Week 1 – Structure & Project Setup

#### 🔹 General
- Requirements analysis
- UI/UX design (Figma)
- Database & API design
- GitHub setup & branching strategy

#### 🔹 Backend (2 Developers)
- Setup project structure (MVC)
  - models / controllers / routes / middleware / validation
- Create Post schema
- Setup MongoDB connection
- Create routes
- Add empty controller functions (CRUD placeholders)

#### 🔹 Frontend (2 Developers)
- Setup React project
- Create project structure (components, pages, services)
- Create basic components (e.g., Login, Button, Input)
- One member handles Git workflow
- One member builds initial UI structure

---

### Week 2 – Backend Logic & Frontend Components

#### 🔹 Backend
- Implement controller logic (CRUD operations)
- Add validation using Joi
- Implement middleware (error handling, validation)
- Ensure backend is fully functional (tested via Postman)

#### 🔹 Frontend
- Continue building UI components
- Create remaining pages (Dashboard, Forms)
- Improve component structure & reusability
- No API integration yet (UI only)

---

### Week 3 – Integration & Functionality

#### 🔹 Frontend
- Connect to backend APIs (CRUD operations)
- Handle API states (loading, error, success)
- Form validation (frontend side)

#### 🔹 Backend
- Minor fixes & improvements based on integration
- Optimize responses & error handling

#### 🔹 Integration
- Full connection between frontend & backend
- Test full user flow (Create / Read / Update / Delete)

---

### Week 4 – Testing, Refactoring & Finalization

#### 🔹 Testing
- Functional testing
- API testing
- Integration testing

#### 🔹 Improvements
- Refactoring based on new concepts learned
- UI enhancements
- Code cleanup & optimization

#### 🔹 Final Delivery
- Final project review
- Documentation update
- Prepare for presentation

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mini-headless-cms.git
cd mini-headless-cms
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Run the project

#### Backend
```bash
npm run dev
```

#### Frontend
```bash
npm start
```

---

## 👥 Team Members

- Ahmed Maher 
- Mohammed Saeed (team leader)
- Amany Elsayed
- Basma Abdelmoniem

---

## 🧪 Testing

- Functional Testing
- API Testing
- Integration Testing

---

## 📌 Constraints

- No coding before UI/UX approval
- Clean code practices must be followed
- Work under supervision

---

## 📄 License

This project is for educational purposes (Capstone Project).

---

## 💡 Future Improvements

- Authentication & Authorization
- Role-based access (Admin / Editor)
- Media upload support
- Rich text editor
- Deployment (Docker + Cloud)
