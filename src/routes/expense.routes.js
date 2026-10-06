const express = require("express");

const {
    createExpense,
    getExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
} = require("../controllers/expense.controller");

const router = express.Router();

router.post("/", createExpense);

// IMPORTANT: summary must come before /:id
router.get("/summary", getExpenseSummary);

router.get("/", getExpense);

router.get("/:id", getExpenseById);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;