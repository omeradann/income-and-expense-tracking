const Income = require('../model/incomeModel')
var createError = require('http-errors')
const Joi = require('joi');


const listIncome = async (req, res) => {
    const allIncome = await Income.find({});
    res.json(allIncome);
};

const addIncome = async (req, res, next) => {
    try {
        const addedIncome = new Income(req.body);
         const {error, value} = addedIncome.joiValidation(req.body)
        if (error) {
            next(error);
            console.log(error);
        } else {
            const result = await addedIncome.save();
            res.send(result);
        }
       
    } catch (error) {
        console.log("error while adding income" + error);
    }
   
};

const deleteIncome = async (req, res, next) => {
    const {income_id} = req.params;

    try {
        const deletedIncome = await Income.findByIdAndDelete(income_id);
        res.send("  User deleted  " +  deletedIncome)
    } catch (error) {
        next(error)
    }
};


module.exports = {
    listIncome,
    addIncome,
    deleteIncome
}