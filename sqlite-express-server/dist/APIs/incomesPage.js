"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseSetup_1 = require("../dbOperations/databaseSetup");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const result = await db.all("SELECT * FROM incomes");
        // Modify the income_date format for each income object in the result array
        const modifiedResult = result.map((income) => (Object.assign(Object.assign({}, income), { income_date: income.income_date ? new Date(income.income_date).toISOString() : null })));
        res.json(modifiedResult);
    }
    catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/", async (req, res) => {
    let { income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description, } = req.body;
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Convert fields to uppercase
        income_category = income_category.toUpperCase();
        payment_method = payment_method.toUpperCase();
        income_source_name = income_source_name.toUpperCase();
        description = description.toUpperCase();
        const query = "INSERT INTO incomes (income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [
            income_category,
            payment_method,
            income_amount,
            income_date,
            income_source_name,
            donor_id,
            description,
        ];
        await db.run(query, values);
        res.sendStatus(200);
    }
    catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/:id", async (req, res) => {
    const incomeId = req.params.id;
    let { income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description, } = req.body;
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        // Convert fields to uppercase
        income_category = income_category.toUpperCase();
        payment_method = payment_method.toUpperCase();
        income_source_name = income_source_name.toUpperCase();
        description = description.toUpperCase();
        const query = "UPDATE incomes SET income_category = ?, payment_method = ?, income_amount = ?, income_date = ?, income_source_name = ?, donor_id = ?, description = ? WHERE id = ?";
        const values = [
            income_category,
            payment_method,
            income_amount,
            income_date,
            income_source_name,
            donor_id,
            description,
            incomeId,
        ];
        await db.run(query, values);
        res.sendStatus(200);
    }
    catch (error) {
        console.error("Error updating income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.delete("/:id", async (req, res) => {
    const incomeId = req.params.id;
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const query = "DELETE FROM incomes WHERE id = ?";
        await db.run(query, [incomeId]);
        res.sendStatus(200);
    }
    catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
//# sourceMappingURL=incomesPage.js.map