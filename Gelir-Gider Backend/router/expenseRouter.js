const router = require('express').Router();
const expenseController = require('../controllers/expenseController')

router.get("/" , expenseController.listExpenses);
router.post("/" , expenseController.addExpense);
router.delete("/:expense_id" , expenseController.deleteExpense);

module.exports = router;