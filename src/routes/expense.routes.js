const express= require('express')

const{
    createExpense,
    getExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary
}= require('../controllers/expense.controller')

const router = express.Router()

router.post('/',createExpense)

router.get('/summary',getExpenseSummary)

router.get('/summary',getExpense)

router.get('/',getExpenseById)

router.put('/:id',updateExpense)

router.delete('/:id',deleteExpense)

module.exports = router
