"use strict";
// File: monthlyReports.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMonthlyTotalDonations = exports.calculateMonthlyTotalExpensesByPayee = exports.calculateMonthlyTotalExpensesByExpenseName = exports.calculateMonthlyTotalExpensesByPaymentMethod = exports.calculateMonthlyTotalExpensesByCategory = exports.calculateMonthlyTotalExpenses = exports.calculateMonthlyTotalIncomesByIncomeSource = exports.calculateMonthlyTotalIncomesByPaymentMethod = exports.calculateMonthlyTotalIncomesByCategory = exports.calculateMonthlyTotalIncomes = void 0;
const databaseSetup_1 = require("../dbOperations/databaseSetup");
// Montly Income Report
async function calculateMonthlyTotalIncomes(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Calculate monthly total incomes
        const query = `
      SELECT strftime('%Y-%m', income_date) AS month_year, SUM(income_amount) AS total_monthly_income
      FROM incomes
      GROUP BY month_year
      ORDER BY month_year DESC
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total incomes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalIncomes = calculateMonthlyTotalIncomes;
async function calculateMonthlyTotalIncomesByCategory(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Calculate monthly total incomes by category
        const query = `
      SELECT strftime('%m', income_date) AS month, income_category, SUM(income_amount) AS total_income_amount
      FROM incomes
      GROUP BY month, income_category
      ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total incomes by category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalIncomesByCategory = calculateMonthlyTotalIncomesByCategory;
async function calculateMonthlyTotalIncomesByPaymentMethod(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Calculate monthly total incomes by payment method
        const query = `
      SELECT strftime('%m', income_date) AS month, payment_method, SUM(income_amount) AS total_income_amount
      FROM incomes
      GROUP BY month, payment_method
      ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total incomes by payment method:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalIncomesByPaymentMethod = calculateMonthlyTotalIncomesByPaymentMethod;
async function calculateMonthlyTotalIncomesByIncomeSource(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Calculate monthly total incomes by income source
        const query = `
      SELECT month, income_source_name, SUM(total_income_amount) AS total_income_amount
      FROM (
        SELECT strftime('%m', income_date) AS month, 
               CASE WHEN income_category = 'DONATION' THEN 'DONATION' ELSE income_source_name END AS income_source_name, 
               SUM(income_amount) AS total_income_amount
        FROM incomes
        GROUP BY month, income_source_name
      ) AS subquery
      GROUP BY month, income_source_name
      ORDER BY month;
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total incomes by income source:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalIncomesByIncomeSource = calculateMonthlyTotalIncomesByIncomeSource;
// Montly Expense Report
async function calculateMonthlyTotalExpenses(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%Y-%m', expense_date) AS month_year, SUM(expense_amount) AS total_monthly_expense
        FROM expenses
        GROUP BY month_year
        ORDER BY month_year DESC
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total expenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalExpenses = calculateMonthlyTotalExpenses;
async function calculateMonthlyTotalExpensesByCategory(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%m', expense_date) AS month, expense_category, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, expense_category
        ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total expenses by category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalExpensesByCategory = calculateMonthlyTotalExpensesByCategory;
async function calculateMonthlyTotalExpensesByPaymentMethod(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%m', expense_date) AS month, payment_method, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, payment_method
        ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total expenses by payment method:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalExpensesByPaymentMethod = calculateMonthlyTotalExpensesByPaymentMethod;
async function calculateMonthlyTotalExpensesByExpenseName(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%m', expense_date) AS month, expense_name, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, expense_name
        ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total expenses by expense name:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalExpensesByExpenseName = calculateMonthlyTotalExpensesByExpenseName;
async function calculateMonthlyTotalExpensesByPayee(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%m', expense_date) AS month, payee_information, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, payee_information
        ORDER BY month
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total expenses by payee:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalExpensesByPayee = calculateMonthlyTotalExpensesByPayee;
// Montly Donation Report
async function calculateMonthlyTotalDonations(req, res) {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = `
        SELECT strftime('%Y-%m', income_date) AS month_year, SUM(income_amount) AS total_monthly_donations
        FROM incomes
        WHERE income_category = 'DONATION'
        GROUP BY month_year
        ORDER BY month_year DESC
    `;
        const result = await db.all(query);
        res.json(result);
    }
    catch (error) {
        console.error("Error calculating monthly total donations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.calculateMonthlyTotalDonations = calculateMonthlyTotalDonations;
//# sourceMappingURL=monthlyReports.js.map