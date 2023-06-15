import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDatabase } from "./dbOperations/databaseSetup";
import donorsPage from "./APIs/donorsPage";
import incomesPage from "./APIs/incomesPage";
import expensesPage from "./APIs/expensesPage";
import * as monthlyReports from './APIs/monthlyReports';
import * as joinedQueries from './APIs/joinedQueriesAPI';


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the Angular app
const angularAppPath = path.join(
  __dirname,
  "../../dist/angular-accounting"
);
app.use(express.static(angularAppPath));

// Middleware for API routes
app.use("/api/donors", donorsPage);
app.use("/api/incomes", incomesPage);
app.use("/api/expenses", expensesPage);

// Routes for monthly reports
// Reports for dashboard
app.get('/api/monthly-total-incomes', monthlyReports.calculateMonthlyTotalIncomes);
app.get('/api/monthly-total-expenses', monthlyReports.calculateMonthlyTotalExpenses);
app.get('/api/monthly-total-donations', monthlyReports.calculateMonthlyTotalDonations);

// Reports for reports page
// Income reports
app.get('/api/monthly-total-incomes-by-category', monthlyReports.calculateMonthlyTotalIncomesByCategory);
app.get('/api/monthly-total-incomes-by-payment-method', monthlyReports.calculateMonthlyTotalIncomesByPaymentMethod);
app.get('/api/monthly-total-incomes-by-income-source', monthlyReports.calculateMonthlyTotalIncomesByIncomeSource);

// Expense reports
app.get('/api/monthly-total-expenses-by-category', monthlyReports.calculateMonthlyTotalExpensesByCategory);
app.get('/api/monthly-total-expenses-by-payment-method', monthlyReports.calculateMonthlyTotalExpensesByPaymentMethod);
app.get('/api/monthly-total-expenses-by-expense-name', monthlyReports.calculateMonthlyTotalExpensesByExpenseName);
app.get('/api/monthly-total-expenses-by-payee', monthlyReports.calculateMonthlyTotalExpensesByPayee);

// Routes with joined queries
app.get('/api/donors-with-incomes', joinedQueries.donorsWithIncomes);
app.get('/api/donors-with-income-details', joinedQueries.getDonorsWithIncomeDetails);

// For all other routes, return the index.html file
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(angularAppPath, "index.html"));
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Gracefully handle server shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is gracefully shutting down');
    process.exit(0);
  });
});