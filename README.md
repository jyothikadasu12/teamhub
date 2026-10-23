# TeamHub – Employee Management Dashboard

TeamHub is a responsive employee management dashboard built with React, TypeScript, and Vite. It provides a centralized interface for viewing employee information, searching and filtering records, monitoring workforce status, and organizing employee-related documents.

## Features

- **Dashboard Overview** – Displays employee statistics, department distribution, and workforce status.
- **Employee Directory** – Displays employee information using reusable React components.
- **Search and Filtering** – Search employee records with debounced input and filter by status.
- **API Integration** – Fetches employee data from the DummyJSON API.
- **Infinite Scrolling** – Loads additional employee records as the user scrolls.
- **Reusable Components** – Uses shared UI components such as buttons, cards, and generic lists.
- **Custom Hooks** – Separates reusable logic for employee fetching, debouncing, and infinite scrolling.
- **Document Management** – Provides a structure for file selection, validation, upload status, and upload queue management.
- **Reports and Analytics** – Summarizes available employee and department information.
- **Responsive Design** – Supports desktop, tablet, and mobile layouts.
- **Environment Configuration** – Uses `.env` and `.env.example` for configurable application settings.
- **Type Safety** – Uses TypeScript interfaces and types to make employee and document data more predictable.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Building reusable user interface components |
| TypeScript | Static typing and safer code |
| Vite | Development server and production build |
| React Router | Client-side page navigation |
| CSS | Responsive application styling |
| DummyJSON API | Sample employee data |
| Fetch API | Making HTTP requests |
| Intersection Observer | Detecting when more records should load |

## Project Structure

```text
teamhub/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   ├── types/
│   │   ├── employee.ts
│   │   ├── document.ts
│   │   └── request.ts
│   ├── services/
│   │   ├── employeeApi.ts
│   │   └── documentApi.ts
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   ├── useEmployees.ts
│   │   └── useInfiniteEmployees.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── GenericList.tsx
│   │   ├── employees/
│   │   │   ├── EmployeeCard.tsx
│   │   │   ├── EmployeeSearch.tsx
│   │   │   └── EmployeeList.tsx
│   │   └── uploads/
│   │       ├── FileUploader.tsx
│   │       └── UploadQueue.tsx
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── EmployeesPage.tsx
│   │   ├── DocumentsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── utils/
│   │   ├── mapEmployee.ts
│   │   └── validateFile.ts
│   ├── styles/
│   │   ├── global.css
│   │   ├── employees.css
│   │   ├── uploads.css
│   │   ├── reports.css
│   │   └── dashboard.css
│   └── main.tsx
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

*Note: Adjust filenames in this tree to match the files actually present in your repository.*

## Prerequisites

Install the following before running the application:

- Node.js (a current LTS release is recommended)
- npm
- Visual Studio Code or another code editor
- Git, if you want to clone or push the project

Check your installation:

```bash
node -v
npm -v
git --version
```

## Installation

### 1. Clone the repository

Replace the example URL with your actual GitHub repository URL.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd teamhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://dummyjson.com
VITE_APP_NAME=TeamHub
VITE_APP_ENV=development
```

The `.env.example` file should contain the same variable names and example values, without private credentials.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal. The default is usually:

```text
http://localhost:5173/
```

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for the API | `https://dummyjson.com` |
| `VITE_APP_NAME` | Application name | `TeamHub` |
| `VITE_APP_ENV` | Environment label | `development` |

Vite exposes variables prefixed with `VITE_` to client-side code. Do not store passwords, private API keys, or other secrets in these variables.

Restart the development server after changing environment variables.

## API Integration

TeamHub uses DummyJSON as a source of sample user data.

**Base URL**

```text
https://dummyjson.com
```

**Users endpoint**

```text
https://dummyjson.com/users
```

The employee API service is responsible for making requests, handling unsuccessful HTTP responses, and providing data to the application.

The employee mapper converts API user records into the application's `Employee` type. This keeps API-specific fields separate from the fields used by the user interface.

DummyJSON provides sample data, not a production employee database. Employee statuses such as `Active`, `On Leave`, and `Inactive` require application mapping or a backend that stores those statuses.

## Application Pages

### Dashboard

- Employee count based on loaded records
- Active, On Leave, and Inactive status totals
- Department distribution
- Employee directory preview
- Navigation to other sections

### Employees

- Employee cards or list
- Search and status filtering
- Debounced search input
- API-powered employee data
- Infinite scrolling, when configured

### Documents

- File selection
- File type and size validation
- Upload queue and status display, where implemented

A working upload to persistent storage requires a backend or upload service. Client-side validation alone does not securely validate files.

### Reports

- Employee status summaries
- Department statistics
- Data-driven reports based on the employee records available to the application

## TypeScript and Custom Hooks

### Employee types

The `Employee` interface describes the fields expected by employee components and services. The `EmployeeStatus` type restricts status values to the application's supported options.

### Custom hooks

- `useDebounce` delays a value update until the user pauses typing.
- `useEmployees` encapsulates employee data fetching and related state.
- `useInfiniteEmployees` manages loading additional employee pages when configured.

These hooks help keep components focused on rendering and user interaction.

## Available Scripts

Run the scripts defined in your `package.json`:

```bash
npm run dev
npm run build
npm run preview
```

If your project defines a lint script, you can also run:

```bash
npm run lint
```

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` checks code according to the configured lint rules, if available.

## Production Build

Create a production build:

```bash
npm run build
```

Vite normally generates the output in the `dist/` directory.

To preview the build locally:

```bash
npm run preview
```

## Git and Environment File Safety

The `.gitignore` file should exclude local environment files while allowing `.env.example` to be committed.

```gitignore
.env
.env.*
!.env.example
node_modules/
dist/
```

If `.env` contains private credentials, do not commit it to GitHub. If it has already been pushed, remove the exposed credentials or rotate them; deleting the file in a later commit does not erase its history.

## Learning Outcomes

This project provides practical experience with:

- React components, props, and rendering
- TypeScript interfaces, union types, and type safety
- React Router and multi-page navigation
- API requests and error handling
- Custom hooks and reusable logic
- Search, filtering, and debouncing
- Infinite scrolling and `IntersectionObserver`
- File validation and upload-state management
- Responsive CSS
- Environment variables and Git workflow

## Future Improvements

- Connect employee records to a persistent backend database.
- Add employee creation, editing, and deletion.
- Add authentication and role-based access control.
- Implement server-side employee search and filtering.
- Connect document uploads to persistent storage.
- Add pagination controls and more comprehensive automated tests.
- Add report exports if required.

## License

This project is intended for learning and development. Add a license file if you plan to distribute or reuse the project publicly.
