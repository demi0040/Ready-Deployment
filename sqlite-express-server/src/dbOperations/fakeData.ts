import { faker } from "@faker-js/faker";
import sqlite3 from "sqlite3";

function connectDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./data/database.db", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(db);
      }
    });
  });
}

async function generateFakeData(): Promise<void> {
  try {
    const db = await connectDatabase();

    const run = (query: string, params?: any[]): Promise<void> => {
      return new Promise((resolve, reject) => {
        db.run(query, params, function (error: Error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    };

    const generateDonors = async (): Promise<void> => {
      const insertDonorQuery = `
        INSERT INTO donors (
          first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      for (let i = 0; i < 20; i++) {
        let firstName = faker.person.firstName().toUpperCase();
        let lastName = faker.person.lastName().toUpperCase();
        let address = faker.location.streetAddress().toUpperCase();
        let postcode = faker.location.zipCode().toUpperCase();
        let phone = faker.phone.number();
        let email = faker.internet.email().toUpperCase();
        let donorArea = faker.number.int({ min: 1, max: 5 });
        let donorGroup = faker.number.int({ min: 1, max: 3 });
        let promisedAmount = faker.number.int({ min: 100, max: 1000 });
        let promisedDate = faker.date.between({
          from: "2023-01-01T00:00:00.000Z",
          to: "2024-01-01T00:00:00.000Z",
        });

        await run(insertDonorQuery, [
          firstName,
          lastName,
          address,
          postcode,
          phone,
          email,
          donorArea,
          donorGroup,
          promisedAmount,
          promisedDate,
        ]);
      }
    };

    const generateExpenses = async (): Promise<void> => {
      const insertExpenseQuery = `
        INSERT INTO expenses (
          expense_name, payment_method, expense_category, payee_information,
          expense_amount, expense_date, expense_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      for (let i = 0; i < 20; i++) {
        const expenseName = faker.commerce.productName().toUpperCase();
        const paymentMethod = faker.helpers
          .arrayElement(["CASH", "BANK"])
          .toUpperCase();
        const expenseCategory = faker.helpers
          .arrayElement(["FOOD", "TRANSPORTATION", "UTILITIES"])
          .toUpperCase();
        const payeeInformation = faker.company.name().toUpperCase();
        const expenseAmount = faker.number.int({ min: 500, max: 5000 });
        const expenseDate = faker.date.between({
          from: "2023-01-01T00:00:00.000Z",
          to: "2024-01-01T00:00:00.000Z",
        });
        const expenseDescription = faker.lorem.sentence().toUpperCase();

        await run(insertExpenseQuery, [
          expenseName,
          paymentMethod,
          expenseCategory,
          payeeInformation,
          expenseAmount,
          expenseDate,
          expenseDescription,
        ]);
      }
    };

    const generateIncomes = async (): Promise<void> => {
      const insertIncomeQuery = `
        INSERT INTO incomes (
          income_category, payment_method, income_amount, income_date,
          income_source_name, donor_id, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      for (let i = 0; i < 20; i++) {
        const incomeCategory = faker.helpers
          .arrayElement(["DONATION", "GOVERNMENTAL", "OTHER"])
          .toUpperCase();
        const paymentMethod = faker.helpers
          .arrayElement(["CASH", "BANK"])
          .toUpperCase();
        const incomeAmount = faker.number.int({ min: 500, max: 5000 });
        const incomeDate = faker.date.between({
          from: "2023-01-01T00:00:00.000Z",
          to: "2024-01-01T00:00:00.000Z",
        });
        const incomeSourceName = faker.company.name().toUpperCase();
        const donorId = faker.number.int({ min: 1, max: 20 });
        const description = faker.lorem.sentence().toUpperCase();

        await run(insertIncomeQuery, [
          incomeCategory,
          paymentMethod,
          incomeAmount,
          incomeDate,
          incomeSourceName,
          donorId,
          description,
        ]);
      }
    };

    await generateDonors();
    await generateExpenses();
    await generateIncomes();

    console.log("Fake data generation completed.");
  } catch (error) {
    console.error("An error occurred while generating fake data:", error);
  }
}

export { generateFakeData };
generateFakeData();
