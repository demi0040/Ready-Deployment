"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseSetup_1 = require("./databaseSetup");
async function setupDatabase() {
    try {
        await (0, databaseSetup_1.createTables)();
        console.log('Database setup completed successfully.');
    }
    catch (error) {
        console.error('Error setting up the database:', error);
    }
}
setupDatabase();
//# sourceMappingURL=createDB.js.map