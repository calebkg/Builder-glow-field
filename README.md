# Expense Manager - Angular + ASP.NET Core + MySQL

A modern, responsive expense management system built with Angular 17 (frontend) and ASP.NET Core Web API (backend) with MySQL database and JWT authentication.

## Features

- **Dashboard**: Overview of expenses with statistics and charts
- **Expense Management**: Add, edit, delete, and view expenses
- **Categories**: Pre-defined expense categories with icons
- **Filtering & Sorting**: Search and filter expenses by various criteria
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material Design**: Clean, modern UI following Material Design principles
- **User Authentication**: Secure registration, login, and JWT-based session management
- **User-specific Data**: Each user only sees their own expenses

## Technology Stack

- **Frontend**: Angular 17, Angular Material
- **Backend**: ASP.NET Core Web API (.NET 8)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)

## Prerequisites

### Frontend
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Backend
- .NET 8 SDK
- MySQL Server

## Backend Setup (ASP.NET Core + MySQL)

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   cd backend/ExpenseManager.API
   ```
2. **Configure your database connection:**
   - Edit `appsettings.Development.json` and set your MySQL connection string:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "server=localhost;database=expense_manager;user=YOUR_USER;password=YOUR_PASSWORD;"
     }
     ```
3. **Apply database migrations:**
   ```bash
   dotnet ef database update
   ```
4. **Run the backend API:**
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5257` (or your configured port).

## Frontend Setup (Angular)

1. **Navigate to the frontend folder:**
   ```bash
   cd src
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set the API URL:**
   - Edit `src/environments/environment.ts` and set:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:5257/api'
     };
     ```
4. **Run the Angular app:**
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

## Authentication (JWT)
- Register and login with your email and password.
- The frontend stores the JWT token and sends it with every API request.
- All expense data is user-specific and protected.

## Quick Start (Full Stack)
1. Start MySQL and ensure your database is ready.
2. Start the backend API (`dotnet run`).
3. Start the Angular frontend (`ng serve`).
4. Open [http://localhost:4200](http://localhost:4200) in your browser.
5. Register a new user, log in, and start managing your expenses!

## Project Structure

```
root/
├── backend/ExpenseManager.API/   # ASP.NET Core Web API backend
├── src/                         # Angular frontend
│   ├── app/
│   ├── assets/
│   └── environments/
└── README.md
```

## API Endpoints (Backend)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/expenses` - Get all expenses for the logged-in user
- `POST /api/expenses` - Add a new expense
- `GET /api/expenses/stats` - Get expense statistics
- `GET /api/categories` - Get all categories

## License
This project is licensed under the MIT License.
