# Web Page View Department

This repository is the implementation of a Web Page View Department application. It consists of one page and three main components, all integrated into the single page. The project includes both frontend and backend code.

---

## Getting Started

There are two ways to run this project:

### 1. Using npm (local setup)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the frontend development server:

   ```bash
   npm run dev
   ```
4. Open your browser and go to:

   ```
   http://localhost:5173
   ```

### 2. Using Docker Compose (recommended)

1. Make sure Docker is installed.
2. From the root of the project, run:

   ```bash
   docker compose up --build
   ```
3. Open your browser and go to:

   ```
   http://localhost:5173
   ```

Using Docker Compose automatically builds and runs both the frontend and backend.

---

## Technology Stack

**Frontend**

* React.js
* Vite
* TypeScript
* MUI (Material UI)

**Backend**

* Nest.js
* GraphQL (API and query language)

---

## Project Structure

### Backend

* `department/`

  * `department.model.ts` – Defines all models for department inputs
  * `department.json` – Acts as a static database
  * `department.module.ts` – Backend module
  * `department.resolver.ts` – GraphQL API resolvers
  * `department.service.ts` – Handles backend logic and functions
* `app.module.ts` – Main backend module
* `schema.gql` – Auto-generated GraphQL schema

The backend provides three APIs:

* Query: Retrieve department information
* Mutation: Update department information
* Mutation: Delete an employee

### Frontend

* `assets/` – Contains icons and static assets
* `components/`

  * AssignedEmployees – Table of assigned employees
  * DepartmentHeader – Breadcrumb placeholder (no routing implemented)
  * DepartmentInfo – Displays department information
  * Each component has its `main.tsx` file and `index.ts` for exporting
* `interfaces/`

  * `types.ts` – Type definitions for frontend
* `pages/`

  * ViewDepartment – Main page housing the three components

---

## Usage

* View department information
* Update department details
* Delete an assigned employee

All components and APIs are connected, and you can experiment with them via the frontend page at `http://localhost:5173`.

---

## Notes

* This implementation is a bare-bones version for demonstration purposes.
* Breadcrumbs in the header component are placeholders — no real routing is implemented.
* All code is visible for exploration; feel free to dive into components, services, or resolvers for more details.

---

## Running with Docker

* Frontend port: 5173
* Backend port: configured in Nest.js (default: 3000)
* Use:

  ```bash
  docker compose up --build
  ```
* Access the frontend at `http://localhost:5173`.

---

