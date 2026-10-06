require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const expenseRoutes = require("./src/routes/expense.routes");

const notFound = require("./src/middleware/notfound.middleware");
const errorHandler = require("./src/middleware/errorHandler.middleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Expense Management API is running"
    });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});