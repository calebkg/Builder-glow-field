# Expense Manager - Angular Application

A modern, responsive expense management system built with Angular 17 and Angular Material.

## Features

- **Dashboard**: Overview of expenses with statistics and charts
- **Expense Management**: Add, edit, delete, and view expenses
- **Categories**: Pre-defined expense categories with icons
- **Filtering & Sorting**: Search and filter expenses by various criteria
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material Design**: Clean, modern UI following Material Design principles

## Technology Stack

- **Frontend**: Angular 17
- **UI Library**: Angular Material
- **Styling**: CSS with Material Design theming
- **Charts**: Chart.js with ng2-charts
- **Forms**: Reactive Forms with validation
- **Routing**: Angular Router
- **Testing**: Jasmine + Karma

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd expense-manager-angular
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Angular CLI globally (if not already installed):
   ```bash
   npm install -g @angular/cli
   ```

## Development

Start the development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:

```bash
npm test
# or
ng test
```

## Project Structure

```
src/
├── app/
│   ├── components/           # Feature components
│   │   ├── dashboard/        # Dashboard component
│   │   ├── expense-list/     # Expense list component
│   │   └── add-expense/      # Add/Edit expense component
│   ├── models/               # TypeScript interfaces/models
│   ├── services/             # Angular services
│   ├── app.component.*       # Root component
│   ├── app.module.ts         # Root module
│   └── app-routing.module.ts # Routing configuration
├── assets/                   # Static assets
├── environments/             # Environment configurations
└── styles.css               # Global styles
```

## Key Components

### Dashboard

- Expense statistics and overview
- Recent transactions
- Category breakdown
- Quick action buttons

### Expense List

- Comprehensive expense table
- Search and filtering capabilities
- Sorting options
- Edit/Delete actions

### Add/Edit Expense

- Reactive form with validation
- Category selection with icons
- Date picker integration
- Real-time form preview

## Services

### ExpenseService

- Manages expense CRUD operations
- Provides expense statistics
- Handles category management
- Uses RxJS observables for reactive data flow

## Backend Integration

The application is designed to work with a RESTful API. To integrate with your C# backend:

1. Update the `apiUrl` in `src/environments/environment.ts`
2. Modify the `ExpenseService` to make HTTP calls instead of using mock data
3. Add authentication if required
4. Handle error responses appropriately

Example API endpoints expected:

- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/categories` - Get categories

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
