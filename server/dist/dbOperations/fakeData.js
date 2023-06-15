"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeData = void 0;
const faker_1 = require("@faker-js/faker");
const sqlite3_1 = __importDefault(require("sqlite3"));
function connectDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3_1.default.Database("./data/database.db", (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(db);
            }
        });
    });
}
async function generateFakeData() {
    try {
        const db = await connectDatabase();
        const run = (query, params) => {
            return new Promise((resolve, reject) => {
                db.run(query, params, function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        const generateDonors = async () => {
            const insertDonorQuery = `
        INSERT INTO donors (
          first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            for (let i = 0; i < 20; i++) {
                let firstName = faker_1.faker.person.firstName().toUpperCase();
                let lastName = faker_1.faker.person.lastName().toUpperCase();
                let address = faker_1.faker.location.streetAddress().toUpperCase();
                let postcode = faker_1.faker.location.zipCode().toUpperCase();
                let phone = faker_1.faker.phone.number();
                let email = faker_1.faker.internet.email().toUpperCase();
                let donorArea = faker_1.faker.number.int({ min: 1, max: 5 });
                let donorGroup = faker_1.faker.number.int({ min: 1, max: 3 });
                let promisedAmount = faker_1.faker.number.int({ min: 100, max: 1000 });
                let promisedDate = faker_1.faker.date.between({
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
        const generateExpenses = async () => {
            const insertExpenseQuery = `
        INSERT INTO expenses (
          expense_name, payment_method, expense_category, payee_information,
          expense_amount, expense_date, expense_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
            for (let i = 0; i < 20; i++) {
                const expenseName = faker_1.faker.commerce.productName().toUpperCase();
                const paymentMethod = faker_1.faker.helpers
                    .arrayElement(["CASH", "BANK"])
                    .toUpperCase();
                const expenseCategory = faker_1.faker.helpers
                    .arrayElement(["FOOD", "TRANSPORTATION", "UTILITIES"])
                    .toUpperCase();
                const payeeInformation = faker_1.faker.company.name().toUpperCase();
                const expenseAmount = faker_1.faker.number.int({ min: 500, max: 5000 });
                const expenseDate = faker_1.faker.date.between({
                    from: "2023-01-01T00:00:00.000Z",
                    to: "2024-01-01T00:00:00.000Z",
                });
                const expenseDescription = faker_1.faker.lorem.sentence().toUpperCase();
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
        const generateIncomes = async () => {
            const insertIncomeQuery = `
        INSERT INTO incomes (
          income_category, payment_method, income_amount, income_date,
          income_source_name, donor_id, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
            for (let i = 0; i < 20; i++) {
                const incomeCategory = faker_1.faker.helpers
                    .arrayElement(["DONATION", "GOVERNMENTAL", "OTHER"])
                    .toUpperCase();
                const paymentMethod = faker_1.faker.helpers
                    .arrayElement(["CASH", "BANK"])
                    .toUpperCase();
                const incomeAmount = faker_1.faker.number.int({ min: 500, max: 5000 });
                const incomeDate = faker_1.faker.date.between({
                    from: "2023-01-01T00:00:00.000Z",
                    to: "2024-01-01T00:00:00.000Z",
                });
                const incomeSourceName = faker_1.faker.company.name().toUpperCase();
                const donorId = faker_1.faker.number.int({ min: 1, max: 20 });
                const description = faker_1.faker.lorem.sentence().toUpperCase();
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
    }
    catch (error) {
        console.error("An error occurred while generating fake data:", error);
    }
}
exports.generateFakeData = generateFakeData;
generateFakeData();
//# sourceMappingURL=fakeData.js.map