<div align="center">

# 📁 MediaShare

**Secure, time-limited media sharing — photos & documents, no permanent accounts required.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://media-sharing-system.vercel.app/)
[![Backend](https://img.shields.io/badge/backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/database-PostgreSQL-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/license-Educational-lightgrey)](#license)

[Live Demo](https://media-sharing-system.vercel.app/) · [API Docs](#api-endpoints) · [Report an Issue](https://github.com/SonuJaiswal6828/media-sharing-system/issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [User Flows](#user-flows)
- [Use Cases](#use-cases)
- [Learning Outcomes](#learning-outcomes)
- [Developer](#developer)
- [License](#license)

---

## Overview

MediaShare is a full-stack media sharing platform built around **temporary, revocable access** instead of permanent sharing links.

Tools like WhatsApp or Google Drive grant access that lasts forever unless manually cleaned up. MediaShare flips that default: an admin organizes **photos and documents** into **Groups** and **Sections**, and grants friends **exactly one hour** of access at a time — approved per request, and revocable instantly.

**Live app:** https://media-sharing-system.vercel.app/

### How it works

1. Admin creates a **Group** (e.g. *"Wedding 2026"*) — gets a unique group code + password.
2. Admin organizes media into **Sections** within the group (e.g. *"Haldi"*, *"Reception"*, *"Contracts"*).
3. Each section can hold **photos** or **documents** (PDF, DOCX, XLSX, PPTX, etc.).
4. A friend requests access with the group code + password.
5. Admin reviews and **approves** the request → friend receives a **1-hour session token**.
6. Friend views/downloads media until the session **expires** or the admin **revokes** it.

---

## Features

### Admin

- JWT-based signup & login, with bcrypt-hashed passwords
- Create, edit, and delete Groups (auto-generated, collision-safe group codes) and Sections
- Upload **photos** directly to Cloudinary via signed, backend-authorized uploads
- Upload **documents** (PDF, DOCX, XLSX, PPTX, TXT, CSV) with dedicated storage
- Review, approve, or reject incoming access requests
- View and revoke active sessions at any time
- Tabbed section view — switch between **Photos** and **Documents** in one page

### Friend (no account required)

- Request access with a group code + password
- Track request status via a short request code
- View and download photos **and** documents once approved
- Session expires automatically after 1 hour

### Security

- JWT authentication on all admin routes
- bcrypt password hashing with per-user salt
- Identical error responses for invalid group/username **or** password (prevents enumeration attacks)
- Unguessable, 32-character random session tokens
- Ownership verification enforced on every mutation (a Group/Section/Media can only be modified by the admin who owns it)
- Automatic session expiry + manual revoke, with lazy cleanup of stale pending requests
- CORS configured for the deployed frontend

---

## Tech Stack

### Backend

| Layer | Technology |
|---|---|
| Framework | FastAPI (Python) |
| Database | PostgreSQL |
| ORM | SQLAlchemy 2.0 |
| Auth | JWT (PyJWT) + bcrypt |
| Validation | Pydantic v2 |
| Media storage | Cloudinary (signed uploads, image + auto) |
| Server | Uvicorn |

### Frontend

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS |
| Logic | Vanilla JavaScript (Fetch API) |
| Fonts | Inter (Google Fonts) |
| Design | Modern dark theme, glassmorphism, gradient accents |
| Hosting | Vercel |

---

## Project Structure

```text
photo-sharing-access-system/
├── backend/
│   ├── admin/             # Admin auth (signup, login)
│   ├── groups/            # Group CRUD + sections listing
│   ├── sections/          # Section CRUD + photos listing
│   ├── photos/            # Cloudinary signature, save, delete (photos)
│   ├── documents/         # Document upload, save, list, delete
│   ├── access_requests/   # Request flow (create, approve, reject, status)
│   ├── sessions/          # Session status, revoke, list, media access
│   ├── models/            # SQLAlchemy models (one file per entity)
│   ├── utils/             # Security, JWT dependencies, code generation, Cloudinary config
│   ├── database.py        # DB engine, session, base
│   ├── create_tables.py   # Table creation script
│   ├── main.py            # FastAPI app, routers, CORS
│   ├── requirements.txt
│   └── .env               # Not committed
│
├── frontend/
│   ├── index.html             # Landing page
│   ├── about.html             # About + developer info
│   ├── login.html / signup.html
│   ├── dashboard.html         # Admin dashboard
│   ├── groups.html / group-detail.html / section-detail.html
│   ├── pending.html           # Pending access requests
│   ├── sessions.html          # Active sessions
│   ├── request-access.html    # Friend: request form
│   ├── request-status.html    # Friend: status check
│   ├── session-photos.html    # Friend: view/download media
│   ├── css/, js/              # Styling and API/UI logic
│   └── public/
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL
- A Cloudinary account (free tier is sufficient)
- A modern web browser

### 1. Clone the repository

```bash
git clone https://github.com/SonuJaiswal6828/photo-sharing-access-system.git
cd photo-sharing-access-system
```

### 2. Set up the backend

```bash
python -m venv venv

# Activate the environment
venv\Scripts\Activate.ps1      # Windows
source venv/bin/activate       # macOS/Linux

cd backend
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/mediashare
JWT_SECRET_KEY=your-super-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

Create the database tables:

```bash
python create_tables.py
```

Run the backend:

```bash
uvicorn main:app --reload
```

- Backend: http://127.0.0.1:8000
- Interactive API docs: http://127.0.0.1:8000/docs

### 3. Set up the frontend

```bash
cd frontend
python -m http.server 5500
```

- Frontend: http://localhost:5500

---

## API Endpoints

### Admin

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/signup` | Register a new admin |
| POST | `/admin/login` | Log in (returns JWT) |

### Groups

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/group/create` | ✅ | Create a group |
| GET | `/group/` | ✅ | List my groups |
| GET | `/group/{id}/sections` | ✅ | List a group's sections |
| PATCH | `/group/{id}` | ✅ | Edit a group |
| DELETE | `/group/{id}` | ✅ | Delete a group |

### Sections

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/section/create` | ✅ | Create a section |
| PATCH | `/section/{id}` | ✅ | Edit a section |
| DELETE | `/section/{id}` | ✅ | Delete a section |
| GET | `/section/{id}/photos` | ✅ | List a section's photos |

### Photos

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/photos/get-upload-signature` | ✅ | Get a signed Cloudinary upload signature |
| POST | `/photos/save_photo` | ✅ | Save an uploaded photo's URL |
| DELETE | `/photos/{id}` | ✅ | Delete a photo |

### Documents

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/documents/get-upload-signature` | ✅ | Get a signed Cloudinary upload signature |
| POST | `/documents/save` | ✅ | Save an uploaded document's metadata |
| GET | `/documents/section/{id}` | ✅ | List a section's documents |
| DELETE | `/documents/{id}` | ✅ | Delete a document |

### Access Requests

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| POST | `/access-request/create` | ❌ | Friend requests access |
| GET | `/access-request/pending` | ✅ | List pending requests |
| PATCH | `/access-request/{id}/approve` | ✅ | Approve → creates a session |
| PATCH | `/access-request/{id}/reject` | ✅ | Reject a request |
| GET | `/access-request/status/{code}` | ❌ | Friend checks request status |

### Sessions

| Method | Endpoint | Auth | Description |
|---|---|:---:|---|
| GET | `/session/all` | ✅ | List all sessions for the admin |
| GET | `/session/{id}/status` | ❌ | Check a session's status |
| PATCH | `/session/{id}/revoke` | ✅ | Revoke a session |
| GET | `/session/{token}/photos` | ❌ | View media via a session token |

---

## User Flows

### Admin

```text
Signup → Login → Dashboard
   → Create Group (code + password auto-generated)
   → Create Sections within the group
   → Upload photos and documents (via Cloudinary)
   → Review pending requests → Approve / Reject
   → Manage sessions → Revoke if needed
```

### Friend

```text
Enter group code + password → Request access
   → Receive a request code (e.g. "8419")
   → Check status periodically
   → Once approved: receive a session token
   → View + download photos and documents (valid for 1 hour)
```

---

## Use Cases

While MediaShare ships with a photo + document workflow, the underlying access-control pattern is generic. The same architecture can power:

- **Photographers** sharing event albums with clients on a time-limited basis
- **Lawyers** delivering case files to clients that expire after review
- **Doctors** granting patients temporary access to reports
- **Teachers** distributing course material for a limited window
- **Freelancers** sharing deliverables with clients and revoking after feedback

The core concept — temporary, per-request, revocable access to a resource — is what makes MediaShare different from generic file sharing tools.

---

## Learning Outcomes

This project was built to practice production-style backend engineering, including:

- REST API design with FastAPI
- SQLAlchemy ORM, relational modeling, and JOINs
- JWT authentication and dependency-based middleware
- Secure password handling with bcrypt
- Signed, direct-to-cloud file uploads via Cloudinary (image + document)
- Preventing enumeration attacks with consistent error responses
- Ownership-based authorization on every mutating endpoint
- Timezone-aware timestamp handling (UTC storage, local display)
- Frontend-backend integration via the Fetch API
- Clean, modular architecture (routers / controllers / schemas per feature)
- Modern responsive UI with Tailwind CSS

---

## Developer

**Sonu Jaiswal** — Full Stack Developer

- 📧 sonuj6828@gmail.com
- 📱 +91 77768 39491
- 📍 Vasai East, Maharashtra, India
- 💻 GitHub: [@SonuJaiswal6828](https://github.com/SonuJaiswal6828)
- 🌐 Portfolio: [sonuj-portfolio.netlify.app](https://sonuj-portfolio.netlify.app)

---

## License

Built for educational purposes as a college submission.