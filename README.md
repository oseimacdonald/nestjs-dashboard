# Next.js Dashboard Application

This project was built by completing the **Next.js App Router Fundamentals** tutorial from the official Next.js documentation.

It demonstrates modern Next.js features including the App Router, Server Components, authentication, data mutations, and metadata handling.

---

## 🚀 Features Implemented

- **App Router architecture** (`/app`)
- **Server Components & Server Actions**
- **Authentication with NextAuth (Credentials provider)**
- **Protected routes using Next.js Proxy**
- **Dashboard with invoices and customers**
- **Form validation using Zod**
- **PostgreSQL (Neon) database integration**
- **Optimized fonts and images**
- **Metadata API (titles, descriptions, favicon)**
- **Error, loading, and not-found handling**
- **Deployed to Vercel**

---

## 🔐 Authentication

- Public routes: `/`, `/login`
- Protected routes: `/dashboard/*`
- Unauthenticated users are redirected to `/login`
- Login credentials used in the tutorial:
  - **Email:** `user@nextmail.com`
  - **Password:** `123456`

---

## 🧪 Running Locally

```bash
pnpm install
pnpm dev
