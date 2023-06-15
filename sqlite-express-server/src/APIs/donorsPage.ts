import { Router, Request, Response } from "express";
import { connectDatabase } from "../dbOperations/databaseSetup";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const db = await connectDatabase();
    const result = await db.all("SELECT * FROM donors");

    // Modify the promised_date format for each donor object in the result array
    const modifiedResult = result.map((donor) => ({
      ...donor,
      promised_date: donor.promised_date ? new Date(donor.promised_date).toISOString() : null,
    }));

    res.json(modifiedResult);
  } catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  let {
    first_name,
    last_name,
    address,
    postcode,
    phone,
    email,
    donor_area,
    donor_group,
    promised_amount,
    promised_date,
  } = req.body;

  try {
    const db = await connectDatabase();

    // Convert fields to uppercase
    first_name = first_name.toUpperCase();
    last_name = last_name.toUpperCase();
    address = address.toUpperCase();
    email = email.toUpperCase();

    const query =
      "INSERT INTO donors (first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      first_name,
      last_name,
      address,
      postcode,
      phone,
      email,
      donor_area,
      donor_group,
      promised_amount,
      promised_date,
    ];
    await db.run(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const donorId = req.params.id;
  let {
    first_name,
    last_name,
    address,
    postcode,
    phone,
    email,
    donor_area,
    donor_group,
    promised_amount,
    promised_date,
  } = req.body;

  try {
    const db = await connectDatabase();

    // Convert fields to uppercase
    first_name = first_name.toUpperCase();
    last_name = last_name.toUpperCase();
    address = address.toUpperCase();
    email = email.toUpperCase();

    const query =
      "UPDATE donors SET first_name = ?, last_name = ?, address = ?, postcode = ?, phone = ?, email = ?, donor_area = ?, donor_group = ?, promised_amount = ?, promised_date = ? WHERE id = ?";
    const values = [
      first_name,
      last_name,
      address,
      postcode,
      phone,
      email,
      donor_area,
      donor_group,
      promised_amount,
      promised_date,
      donorId,
    ];
    await db.run(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const donorId = req.params.id;

  try {
    const db = await connectDatabase();
    const query = "DELETE FROM donors WHERE id = ?";
    await db.run(query, [donorId]);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
