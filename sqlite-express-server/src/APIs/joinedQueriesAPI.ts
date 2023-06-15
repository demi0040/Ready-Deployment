// File: joinedQueriesAPI.ts

import { Request, Response } from "express";
import { connectDatabase } from "../dbOperations/databaseSetup";

export async function donorsWithIncomes(req: Request, res: Response) {
  try {
    const db = await connectDatabase();

    // Retrieve donors with incomes
    const query = `
      SELECT d.*,
      COALESCE(SUM(i.income_amount), 0) AS total_actual_income,
      COALESCE(d.promised_amount - SUM(i.income_amount), d.promised_amount) AS difference
      FROM donors d LEFT JOIN incomes i ON d.id = i.donor_id
      GROUP BY d.id
    `;
    const result = await db.all(query);

    res.json(result);
  } catch (error) {
    console.error("Error retrieving donors with incomes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getDonorsWithIncomeDetails(req: Request, res: Response) {
    try {
      const db = await connectDatabase();
      const query = `
        SELECT  d.first_name, d.last_name, d.promised_amount, 
        COALESCE(SUM(i.income_amount), 0) AS total_actual_income, 
        COALESCE(d.promised_amount - SUM(i.income_amount), d.promised_amount) AS difference, 
        d.donor_area AS "area", 
        d.donor_group AS "group"
        FROM donors d
        LEFT JOIN incomes i ON d.id = i.donor_id
        GROUP BY d.id
        ORDER BY d.donor_area, d.donor_group
      `;
      const result = await db.all(query);
      res.json(result);
    } catch (error) {
      console.error("Error retrieving donors with income by area, group:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  