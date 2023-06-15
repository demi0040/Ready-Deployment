"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const donorsPage_1 = __importDefault(require("./APIs/donorsPage"));
const incomesPage_1 = __importDefault(require("./APIs/incomesPage"));
const expensesPage_1 = __importDefault(require("./APIs/expensesPage"));
const monthlyReports = __importStar(require("./APIs/monthlyReports"));
const joinedQueries = __importStar(require("./APIs/joinedQueriesAPI"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // Enable CORS
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve the Angular app
const angularAppPath = path_1.default.join(__dirname, "../../dist/angular-accounting");
app.use(express_1.default.static(angularAppPath));
// Middleware for API routes
app.use("/api/donors", donorsPage_1.default);
app.use("/api/incomes", incomesPage_1.default);
app.use("/api/expenses", expensesPage_1.default);
// Routes for monthly reports
// Reports for dashboard
app.get('/api/monthly-total-incomes', monthlyReports.calculateMonthlyTotalIncomes);
app.get('/api/monthly-total-expenses', monthlyReports.calculateMonthlyTotalExpenses);
app.get('/api/monthly-total-donations', monthlyReports.calculateMonthlyTotalDonations);
// Reports for reports page
// Income reports
app.get('/api/monthly-total-incomes-by-category', monthlyReports.calculateMonthlyTotalIncomesByCategory);
app.get('/api/monthly-total-incomes-by-payment-method', monthlyReports.calculateMonthlyTotalIncomesByPaymentMethod);
app.get('/api/monthly-total-incomes-by-income-source', monthlyReports.calculateMonthlyTotalIncomesByIncomeSource);
// Expense reports
app.get('/api/monthly-total-expenses-by-category', monthlyReports.calculateMonthlyTotalExpensesByCategory);
app.get('/api/monthly-total-expenses-by-payment-method', monthlyReports.calculateMonthlyTotalExpensesByPaymentMethod);
app.get('/api/monthly-total-expenses-by-expense-name', monthlyReports.calculateMonthlyTotalExpensesByExpenseName);
app.get('/api/monthly-total-expenses-by-payee', monthlyReports.calculateMonthlyTotalExpensesByPayee);
// Routes with joined queries
app.get('/api/donors-with-incomes', joinedQueries.donorsWithIncomes);
app.get('/api/donors-with-income-details', joinedQueries.getDonorsWithIncomeDetails);
// For all other routes, return the index.html file
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(angularAppPath, "index.html"));
});
// Start the server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Gracefully handle server shutdown
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server is gracefully shutting down');
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map