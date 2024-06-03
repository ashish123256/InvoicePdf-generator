"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import Request and Response types from express
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const invoiceRoutes_1 = __importDefault(require("./routes/invoiceRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_DB)
    .then(() => {
    console.log("MongoDB Connected");
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});
const app = (0, express_1.default)();
const port = parseInt((process.env.PORT || '5000'), 10);
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/invoices', invoiceRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
app.listen(port, () => {
    console.log("Server is running on port 5000");
});
exports.default = app;
