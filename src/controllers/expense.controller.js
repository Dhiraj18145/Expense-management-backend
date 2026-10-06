const Expense = require("../models/expense.model");
const User = require("../models/user.model");

const { isValidId } = require("../utils/validate.utils");

// Create Expense
const createExpense = async (req, res, next) => {
    try {
        const {
            userId,
            title,
            amount,
            category,
            description
        } = req.body;

        if (!userId || !title || amount === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "userId, title, amount and category are required"
            });
        }

        if (!isValidId(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be greater than 0"
            });
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const expense = await Expense.create({
            userId,
            title,
            amount,
            category,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });

    } catch (error) {
        next(error);
    }
};


// Get Expenses
const getExpense = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            userId,
            category,
            fromDate,
            toDate
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (
            pageNumber < 1 ||
            limitNumber < 1 ||
            limitNumber > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid pagination"
            });
        }

        const filter = {};

        // Filter by user
        if (userId) {
            if (!isValidId(userId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID"
                });
            }

            filter.userId = userId;
        }

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Filter by date
        if (fromDate || toDate) {
            filter.createdAt = {};

            if (fromDate) {
                filter.createdAt.$gte = new Date(fromDate);
            }

            if (toDate) {
                const endDate = new Date(toDate);

                endDate.setHours(
                    23,
                    59,
                    59,
                    999
                );

                filter.createdAt.$lte = endDate;
            }
        }

        const skip = (pageNumber - 1) * limitNumber;

        const expenses = await Expense.find(filter)
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const total = await Expense.countDocuments(filter);

        return res.status(200).json({
            success: true,
            data: expenses,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total: total,
                totalPages: Math.ceil(total / limitNumber)
            }
        });

    } catch (error) {
        next(error);
    }
};


// Get Expense By ID
const getExpenseById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const expense = await Expense.findById(id)
            .populate("userId", "name email");

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: expense
        });

    } catch (error) {
        next(error);
    }
};


// Update Expense
const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        const {
            title,
            amount,
            category,
            description
        } = req.body;

        if (title !== undefined) {
            expense.title = title;
        }

        if (amount !== undefined) {
            if (Number(amount) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Amount must be greater than 0"
                });
            }

            expense.amount = amount;
        }

        if (category !== undefined) {
            expense.category = category;
        }

        if (description !== undefined) {
            expense.description = description;
        }

        await expense.save();

        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });

    } catch (error) {
        next(error);
    }
};


// Delete Expense
const deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid expense ID"
            });
        }

        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};


// Expense Summary
const getExpenseSummary = async (req, res, next) => {
    try {
        const { userId } = req.query;

        const filter = {};

        if (userId) {
            if (!isValidId(userId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID"
                });
            }

            filter.userId = userId;
        }

        const result = await Expense.aggregate([
            {
                $match: filter
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$amount"
                    },
                    totalExpenses: {
                        $sum: 1
                    }
                }
            }
        ]);

        const categoryResult = await Expense.aggregate([
            {
                $match: filter
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: {
                        $sum: "$amount"
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalAmount: result[0]?.totalAmount || 0,
                totalExpenses: result[0]?.totalExpenses || 0,
                byCategory: categoryResult
            }
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    createExpense,
    getExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
};