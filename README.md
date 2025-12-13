# 🛒 Modern POS System

> A comprehensive Point of Sale (POS) solution built for modern retail businesses, featuring a powerful dashboard, inventory management, and a seamless checkout experience.

![Project Banner](docs/screenshots/screencapture-pos-system-app-ahmedlotfy-site-1.png)

## 📖 Project Overview

This POS System is a full-stack web application designed to streamline retail operations. It provides a robust backend for managing products, categories, units, and users, coupled with a responsive and interactive frontend for point-of-sale transactions. The system is built to be scalable, secure, and user-friendly, catering to roles such as Admins and Cashiers.

### 🌟 Key Features

-   **Role-Based Access Control (RBAC)**: Secure authentication and authorization with distinct roles (Admin, Cashier, Viewer).
-   **Product Management**: comprehensive CRUD operations for products, categories, and units.
-   **Inventory Tracking**: Manage stock levels and product details.
-   **Point of Sale Interface**: Fast and intuitive checkout process with cart management.
-   **Dashboard Analytics**: Visual insights into sales performance and key metrics.
-   **Secure Authentication**: JWT-based auth with refresh token rotation and Argon2 password hashing.
-   **Image Uploads**: Integration with AWS S3/Cloudflare R2 for product and category images.
-   **Dockerized**: Fully containerized setup for easy development and deployment.

## 🛠 Tech Stack

### Frontend (Client)
-   **React 18**: Library for building user interfaces.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **TypeScript**: Static typing for better developer experience and code quality.
-   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
-   **Material Tailwind / Radix UI / MUI**: UI component libraries for polished design.
-   **Redux Toolkit**: State management for predictable application state.
-   **React Router**: Declarative routing for React applications.
-   **Axios**: Promise-based HTTP client for API requests.
-   **Recharts**: Composable charting library for dashboard analytics.
-   **Framer Motion**: Production-ready motion library for React.

### Backend (Server)
-   **NestJS**: Progressive Node.js framework for building efficient server-side applications.
-   **Prisma**: Next-generation ORM for Node.js and TypeScript.
-   **PostgreSQL**: Powerful, open-source object-relational database system.
-   **Passport & JWT**: Authentication middleware for Node.js.
-   **Argon2**: Secure password hashing algorithm.
-   **Swagger**: API documentation tool.
-   **AWS SDK**: For interacting with AWS services (S3/R2).

### Infrastructure
-   **Docker & Docker Compose**: Containerization for consistent development and production environments.

## 📂 Project Structure

```
pos-system/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── routes/         # Route definitions
│   │   ├── store/          # Redux slices and store config
│   │   └── types/          # TypeScript type definitions
│   └── Dockerfile          # Frontend Docker config
├── server/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── category/       # Category management
│   │   ├── product/        # Product management
│   │   ├── user/           # User management
│   │   ├── order/          # Order processing
│   │   └── main.ts         # Application entry point
│   ├── prisma/             # Database schema and seeds
│   └── Dockerfile          # Backend Docker config
├── docker-compose.yml      # Docker multi-container setup
└── README.md               # Project documentation
```

## � Installation & Setup

### Prerequisites
-   **Node.js**: v18+ (if running locally without Docker)
-   **Docker & Docker Compose**: Required for containerized setup.
-   **PostgreSQL**: (Optional if running locally, included in typical setups but project uses external DB in recent configs).

### Environment Variables

Create `.env` files in both `client` and `server` directories based on the following templates.

**Server (`server/.env`)**
```env
PORT=8000
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
AWS_ACCESS_KEY_ID="your_aws_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="your_bucket_name"
```

**Client (`client/.env`)**
```env
VITE_API_URL="http://localhost:8000"
```

### Running with Docker (Recommended)

1.  **Build and Start Containers**
    ```bash
    docker-compose up --build
    ```
    This command will build the images for both client and server and start them. Uses ports `3000` (Client) and `8000` (Server).

### Local Development

**Backend**
1.  Navigate to server directory: `cd server`
2.  Install dependencies: `npm install`
3.  Generate Prisma Client: `npx prisma generate`
4.  Start server: `npm run start:dev`

**Frontend**
1.  Navigate to client directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start dev server: `npm run dev`

## 📚 API Documentation

The backend provides a Swagger UI for exploring the API.
Once the server is running, visit:
**[http://localhost:8000/api](http://localhost:8000/api)** (Check your `main.ts` for the exact path, usually `/api` or `/docs`).

### Key Endpoints
*   `POST /auth/signin`: Login user.
*   `POST /auth/signup`: Register new user.
*   `GET /product/getAll`: Fetch all products.
*   `POST /order`: Create a new order.

## 📸 Features & Screenshots

### 1. Dashboard Overview
Gain insights into your business performance with interactive charts and real-time statistics.
![Dashboard Screenshot](docs/screenshots/screencapture-pos-system-app-ahmedlotfy-site-4.png)

### 2. Point of Sale (POS)
A streamlined interface for cashiers to process orders quickly. Add items to cart, select variants, and complete transactions.
![POS Screenshot](docs/screenshots/screencapture-pos-system-app-ahmedlotfy-site-2.png)

### 3. Product Management
Easily add, edit, and categorize products. Manage inventory stock and upload product images.
![Product Management Screenshot](docs/screenshots/screencapture-pos-system-app-ahmedlotfy-site-5.png)

### 4. Order History
View and track past orders. Filter by status, date, or customer.
![Order History Screenshot](docs/screenshots/screencapture-pos-system-app-ahmedlotfy-site-6.png)

## 🧱 Architecture & Design Decisions

*   **Monorepo-style Structure**: Keeps frontend and backend code in the same repository for better code visibility and shared context.
*   **NestJS Modular Architecture**: Ensures separation of concerns and maintainability.
*   **Prisma ORM**: Provides type-safe database access and easy schema management.
*   **Redux Toolkit**: Chosen for global state management to handle complex cart and user session states efficiently.

## 🤝 Contributing

Contributions are welcome!
1.  Fork the repository.
2.  Create your feature branch: `git checkout -b feature/AmazingFeature`
3.  Commit your changes: `git commit -m 'Add some AmazingFeature'`
4.  Push to the branch: `git push origin feature/AmazingFeature`
5.  Open a Pull Request.

## � License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Maintainer - [ahmed-lotfy-dev]
Project Link: [https://github.com/ahmed-lotfy-dev/pos-system](https://github.com/yourusername/pos-system)
