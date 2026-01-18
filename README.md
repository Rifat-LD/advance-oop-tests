# Product Inventory System

## Project Overview
This is a full-stack CRUD application developed for Lab Test One. It demonstrates a complete inventory management system allowing users to Create, Read, Update, and Delete products.

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Axios
- **Backend:** Java 17, Spring Boot, Spring Data JPA
- **Database:** H2 In-Memory Database
- **Environment:** GitHub Codespaces (DevContainer)

## How to Run (Codespaces)
1. Open the repository in **GitHub Codespaces**.
2. Wait for the `.devcontainer` to configure the environment (Java & Node install automatically).
3. Open two terminals:
   - **Backend:** 
     ```bash
     cd backend
     mvn spring-boot:run
     ```
   - **Frontend:** 
     ```bash
     cd frontend
     npm run dev
     ```
4. A popup will appear to open the application in the browser (Port 5173).

## Assumptions & Design Decisions
1.  **Vite Proxy:** A proxy was configured in `vite.config.ts` to bridge the Frontend (port 5173) and Backend (port 8080) within the Codespaces cloud environment.
2.  **Database:** H2 was chosen for simplicity (In-Memory). Data is volatile and will reset if the backend restarts.
3.  **Service Layer:** For the purpose of this 1-hour lab, business logic is handled directly in the Controller to minimize boilerplate code, while maintaining separation of concerns via the Repository pattern.
4.  **Patch Logic:** The PATCH endpoint performs a partial update by checking for null values before applying changes to the entity.