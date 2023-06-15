import { Router, Request, Response } from "express";
import { connectDatabase } from "../dbOperations/databaseSetup";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const db = await connectDatabase();
    const result = await db.all("SELECT * FROM expenses");

    // Modify the promised_date format for each expense object in the result array
    const modifiedResult = result.map((expense) => ({
      ...expense,
      expense_date: expense.expense_date ? new Date(expense.expense_date).toISOString() : null,
    }));

    res.json(modifiedResult);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  let {
    expense_name,
    payment_method,
    expense_category,
    payee_information,
    expense_amount,
    expense_date,
    expense_description,
  } = req.body;

  try {
    const db = await connectDatabase();

    // Convert fields to uppercase
    expense_name = expense_name.toUpperCase();
    payment_method = payment_method.toUpperCase();
    expense_category = expense_category.toUpperCase();
    payee_information = payee_information.toUpperCase();
    expense_description = expense_description.toUpperCase();

    const query =
      "INSERT INTO expenses (expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      expense_name,
      payment_method,
      expense_category,
      payee_information,
      expense_amount,
      expense_date,
      expense_description,
    ];
    await db.run(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const expenseId = req.params.id;
  let {
    expense_name,
    payment_method,
    expense_category,
    payee_information,
    expense_amount,
    expense_date,
    expense_description,
  } = req.body;

  try {
    const db = await connectDatabase();

    // Convert fields to uppercase
    expense_name = expense_name.toUpperCase();
    payment_method = payment_method.toUpperCase();
    expense_category = expense_category.toUpperCase();
    payee_information = payee_information.toUpperCase();
    expense_description = expense_description.toUpperCase();

    const query =
      "UPDATE expenses SET expense_name = ?, payment_method = ?, expense_category = ?, payee_information = ?, expense_amount = ?, expense_date = ?, expense_description = ? WHERE id = ?";
    const values = [
      expense_name,
      payment_method,
      expense_category,
      payee_information,
      expense_amount,
      expense_date,
      expense_description,
      expenseId,
    ];
    await db.run(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const expenseId = req.params.id;

  try {
    const db = await connectDatabase();
    const query = "DELETE FROM expenses WHERE id = ?";
    await db.run(query, [expenseId]);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
