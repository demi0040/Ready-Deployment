// File: monthlyReports.ts

import { Request, Response } from "express";
import { connectDatabase } from "../dbOperations/databaseSetup";

// Montly Income Report

export async function calculateMonthlyTotalIncomes(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    // Calculate monthly total incomes
    const query = `
      SELECT strftime('%Y-%m', income_date) AS month_year, SUM(income_amount) AS total_monthly_income
      FROM incomes
      GROUP BY month_year
      ORDER BY month_year DESC
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalIncomesByCategory(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    // Calculate monthly total incomes by category
    const query = `
      SELECT strftime('%m', income_date) AS month, income_category, SUM(income_amount) AS total_income_amount
      FROM incomes
      GROUP BY month, income_category
      ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total incomes by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalIncomesByPaymentMethod(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    // Calculate monthly total incomes by payment method
    const query = `
      SELECT strftime('%m', income_date) AS month, payment_method, SUM(income_amount) AS total_income_amount
      FROM incomes
      GROUP BY month, payment_method
      ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total incomes by payment method:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalIncomesByIncomeSource(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

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
  } catch (error) {
    console.error("Error calculating monthly total incomes by income source:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// Montly Expense Report

export async function calculateMonthlyTotalExpenses(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%Y-%m', expense_date) AS month_year, SUM(expense_amount) AS total_monthly_expense
        FROM expenses
        GROUP BY month_year
        ORDER BY month_year DESC
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalExpensesByCategory(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%m', expense_date) AS month, expense_category, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, expense_category
        ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total expenses by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalExpensesByPaymentMethod(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%m', expense_date) AS month, payment_method, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, payment_method
        ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total expenses by payment method:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalExpensesByExpenseName(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%m', expense_date) AS month, expense_name, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, expense_name
        ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total expenses by expense name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function calculateMonthlyTotalExpensesByPayee(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%m', expense_date) AS month, payee_information, SUM(expense_amount) AS total_expense_amount
        FROM expenses
        GROUP BY month, payee_information
        ORDER BY month
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total expenses by payee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// Montly Donation Report
export async function calculateMonthlyTotalDonations(
  req: Request,
  res: Response
) {
  try {
    const db = await connectDatabase();

    const query = `
        SELECT strftime('%Y-%m', income_date) AS month_year, SUM(income_amount) AS total_monthly_donations
        FROM incomes
        WHERE income_category = 'DONATION'
        GROUP BY month_year
        ORDER BY month_year DESC
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error calculating monthly total donations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
