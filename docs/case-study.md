# POS System Case Study

**Role:** Full Stack Developer
**Tech Stack:** React 18, Vite, NestJS, Prisma, PostgreSQL, Docker, Tailwind CSS
**Live Demo:** [View Demo](http://localhost:3000) *(Replace with actual link)*

---

## 🚀 The Context & Evolution

This project holds a special place in my journey. It started as one of my **first major full-stack applications**, built to master the fundamentals of web development. Initially, it was a proof of concept to understand how complex data flows between a React frontend and a Node.js backend.

However, software (and developers) must evolve. Recently, I decided to **modernize and revitalize** this codebase rather than letting it gather dust. This wasn't just a maintenance update; it was a complete overhaul:
*   **Performance:** migrated from *Create React App* to **Vite** for instant server starts and optimized builds.
*   **Database:** Upgraded to the latest **Prisma** version to leverage improved type safety and performance.
*   **UI/UX:** Completely redesigned the interface using **HEROUI** and modern design principles, moving away from a "bootstrappy" look to a polished, professional aesthetic.
*   **Strictness:** Enforced stricter TypeScript configurations to eliminate legacy "any" types and improve reliability.

## 🎯 The Challenge

Retail businesses need speed, accuracy, and reliability. Use cases like a cashier processing a line of customers or a manager checking stock levels cannot tolerate lag or data inconsistencies.

My goal was to build a system that solves these core problems while serving as a playground for advanced architectural patterns. The technical challenge was dual-faceted:
1.  **Business Logic:** Handling complex relationships between Products, Categories, Units, and Orders while maintaining data integrity.
2.  **Modernization:** Refactoring a legacy code structure into a clean, modular **Monorepo** without breaking existing functionality.

## 🏗 Technical Architecture

I adopted a **Monorepo** structure to keep the client and server closely aligned.

### Backend (The Backbone)
*   **NestJS**: Chosen for its scalable, modular architecture. It forces good habits like dependency injection and separation of concerns.
*   **Prisma ORM**: A game-changer for working with PostgreSQL. Its type-safe generated client means database queries are validated at compile time, drastically reducing runtime errors.
*   **Authentication**: A robust JWT implementation with **Refresh Tokens**. This ensures users stay logged in securely without constantly re-entering credentials, a critical feature for POS terminals.

### Frontend (The Experience)
*   **React 18 & Vite**: Leveraging concurrent features and lightning-fast HMR.
*   **Redux Toolkit**: Used for complex global state, specifically managing the **POS Cart**. When a cashier adds items, applies discounts, or holds an order, Redux ensures this state is predictable and persistent.
*   **Design System**: Built with Tailwind CSS and Radix UI primitives (via Shadcn), ensuring accessibility and responsiveness.

## 💡 Solving Real Problems

### 1. The "Drift" Problem (Inventory Management)
**Problem:** In a busy store, two cashiers might sell the last item simultaneously, leading to negative stock.
**Solution:** capable of handling high concurrency. I utilized proper database transactions via Prisma. When an order is placed, the stock deduction and order creation happen within a single atomic transaction. If one fails, both roll back.

### 2. Secure Access Control
**Problem:** A cashier should not be able to delete products or view sensitive admin analytics.
**Solution:** I implemented a robust **Role-Based Access Control (RBAC)** system. Using NestJS Guards (`@Roles('ADMIN')`), I secured endpoints so that only authorized personnel can perform sensitive actions, while Cashiers have a streamlined, restricted interface for sales only.

## ✨ Key Features

*   **Modern POS Interface:** A keyboard-friendly, fast interface for processing sales efficiently.
*   **Interactive Dashboard:** Real-time visualization of sales trends using **Recharts**, helping owners make data-driven decisions.
*   **Multi-Unit Support:** Flexible product management that handles different units (pcs, kg, etc.) and categories.
*   **Dockerized Deployment:** The entire stack (Frontend, Backend, Database) spins up with a single `docker-compose up` command, eliminating "it works on my machine" issues.

## 🧠 What I Learned

Revisting this project taught me that **code is a living thing**. The difference between my initial implementation and the current version is night and day.
*   **Refactoring is a skill:** Learning how to migrate a live database and swap out build tools without downtime is as valuable as writing new code.
*   **Type Safety is king:** Moving to strict TypeScript saved me from countless bugs that would have only appeared in production.
*   **User Experience Matters:** A powerful backend is useless if the frontend is clunky. Investing time in a proper design system paid off in usability.
