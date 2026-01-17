
## ECX Week 5 Project

This project is a Node.js/TypeScript application. Follow the steps below to set up and run it on your computer.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- MySQL (for local database)

### 1. Clone the Repository

```
git clone <repo-url>
cd week5
```

### 2. Install Dependencies

```
npm install
```

### 3. Database Setup

The database uses MySQL. To set up the database:

1. Make sure you have MySQL installed.
2. Run the schema SQL file to create the tables:

```
mysql -u unilag -p < ./src/database/schema.sql
```

You will be prompted to input a pasword, input the password you used when instaling mysql

### 4. Run the Project

To start the development server:

```
npm run dev
```

The server should now be running. By default, it will listen on [http://localhost:3000](http://localhost:3000) (or the port specified in your code).

### 5. API Endpoints

See the `src/routes/` directory for available endpoints for courses, enrollments, and students.

---

If you encounter any issues, ensure all prerequisites are installed and the database is set up correctly.
