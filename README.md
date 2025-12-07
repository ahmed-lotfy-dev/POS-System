# Modern POS System

A full-stack Point of Sale (POS) application built with modern web technologies. This project demonstrates a scalable architecture for managing products, categories, orders, and user authentication.

## 🚀 Tech Stack

### Frontend (Client)

- **Framework:** [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
  - **Why:** For building a fast, interactive, and component-based user interface. Vite ensures lightning-fast build times.
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
  - **Why:** To manage complex global state (user sessions, cart items, theme preferences) efficiently across the application.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  - **Why:** For rapid UI development using utility-first classes, ensuring a consistent and responsive design system.
- **Routing:** [React Router v6](https://reactrouter.com/)
  - **Why:** To handle client-side navigation with advanced features like loaders and protected routes.
- **HTTP Client:** [Axios](https://axios-http.com/)
  - **Why:** For robust API communication with the backend.

### Backend (Server)

- **Framework:** [NestJS](https://nestjs.com/)
  - **Why:** A progressive Node.js framework that provides a modular architecture (Modules, Controllers, Services) inspired by Angular. It enforces code organization and scalability.
- **Database ORM:** [Prisma](https://www.prisma.io/)
  - **Why:** For type-safe database access. Prisma's schema definition is intuitive, and its client provides auto-completion for database queries, reducing runtime errors.
- **Database:** [PostgreSQL](https://www.postgresql.org/)
  - **Why:** A powerful, open-source relational database known for reliability and data integrity.
- **Authentication:** [Passport.js](https://www.passportjs.org/) & [JWT](https://jwt.io/)
  - **Why:** To secure the API using stateless JSON Web Tokens. `Argon2` is used for secure password hashing.

## 🛠️ Features

- **Authentication:** Secure Sign Up and Sign In functionality with JWT.
- **Dashboard:** Admin dashboard for managing store resources.
- **Product Management:** Create, read, update, and delete (CRUD) products.
- **Category Management:** Organize products into categories.
- **Order System:** Process orders and track sales.
- **Responsive Design:** Works seamlessly on desktop and tablet devices.
- **Theme Support:** Light and Dark mode toggle.

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running
- Bun or PNPM (optional, but recommended)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pos-system
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Set up Environment Variables
# Create a .env file in the server directory and add:
# DATABASE_URL="postgresql://user:password@localhost:5432/pos_db?schema=public"
# JWT_SECRET="your_super_secret_key"

# Run Database Migrations
npx prisma migrate dev

# Start the Server
npm run start:dev
```

The server will start on `http://localhost:3000` (default NestJS port).

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Set up Environment Variables
# Create a .env file in the client directory and add:
# VITE_BACKEND_URL="http://localhost:3000"

# Start the Development Server
npm run dev
```

The client will start on `http://localhost:5173` (default Vite port).

## 🧪 How It Works

1.  **Request Flow:** The React client sends HTTP requests (via Axios) to the NestJS server.
2.  **Validation:** The server uses DTOs (Data Transfer Objects) and `class-validator` to ensure incoming data is correct.
3.  **Business Logic:** Services in NestJS handle the business logic (e.g., calculating totals, hashing passwords).
4.  **Data Persistence:** Prisma translates the logic into SQL queries to interact with the PostgreSQL database.
5.  **Response:** The server returns JSON data, which the React client uses to update the Redux store and UI.

## 📝 License

This project is licensed under the MIT License.
