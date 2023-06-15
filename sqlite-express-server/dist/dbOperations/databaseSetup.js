"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = exports.connectDatabase = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DB_PATH = 'data/database.db';
function createDataDirectoryIfNotExists() {
    const dataDir = path_1.default.dirname(DB_PATH);
    if (!fs_1.default.existsSync(dataDir)) {
        fs_1.default.mkdirSync(dataDir, { recursive: true });
    }
}
async function connectDatabase() {
    try {
        const db = await (0, sqlite_1.open)({
            filename: DB_PATH,
            driver: sqlite3_1.default.Database,
        });
        return db;
    }
    catch (error) {
        console.error('An error occurred while connecting to the database:', error);
        throw error;
    }
}
exports.connectDatabase = connectDatabase;
async function createTables() {
    try {
        const exists = fs_1.default.existsSync(DB_PATH);
        if (!exists) {
            createDataDirectoryIfNotExists();
            fs_1.default.writeFileSync(DB_PATH, '');
            const db = await connectDatabase();
            await db.exec(`
        CREATE TABLE IF NOT EXISTS donors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT,
          last_name TEXT,
          address TEXT,
          postcode TEXT,
          phone TEXT,
          email TEXT,
          donor_area INTEGER,
          donor_group INTEGER,
          promised_amount NUMERIC,
          promised_date DATE
        );

        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expense_name TEXT,
          payment_method TEXT,
          expense_category TEXT,
          payee_information TEXT,
          expense_amount NUMERIC,
          expense_date DATE,
          expense_description TEXT
        );

        CREATE TABLE IF NOT EXISTS incomes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          income_category TEXT,
          payment_method TEXT,
          income_amount NUMERIC,
          income_date DATE,
          income_source_name TEXT,
          donor_id INTEGER,
          description TEXT,
          FOREIGN KEY (donor_id) REFERENCES donors (id)
        );
      `);
            console.log('Tables created successfully!');
        }
        else {
            console.log('Database file already exists.');
        }
    }
    catch (error) {
        console.error('An error occurred while creating tables:', error);
        throw error;
    }
}
exports.createTables = createTables;
//# sourceMappingURL=databaseSetup.js.map