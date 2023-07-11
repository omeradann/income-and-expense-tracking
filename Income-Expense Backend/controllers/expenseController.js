const Expense = require("../model/expenseModel");
var createError = require("http-errors");
const Joi = require("joi");

const listExpenses= async (req, res) => {
  const listedExpense = await Expense.find({});
  res.json(listedExpense);
};

const addExpense = async (req, res,next) => {
  try {
    const addedExpense = new Expense(req.body);

    const { error, value } = addedExpense.joiValidation(req.body);
  if (error) {
    next(error)
    console.log(error);
  } else {
     const result = await addedExpense.save();
    res.send(result);
  }
    
}catch (error) {
    console.log("Add expense error: " + error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { expense_id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(expense_id);
    if (deletedExpense) {
      return res.json({ message: " User deleted." });
    } else {
      throw createError(404, " User not found.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listExpenses,
  addExpense,
  deleteExpense
};
