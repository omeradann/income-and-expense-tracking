const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Joi = require('joi');

const incomeSchema = new Schema({
    user:{
        type: String,
        require: true,
    },
    date:{
        type: String,
        require: true,
        trim: true,
    },
    amount:{
        type: String,
        require: true,
        trim: true,
        maxlength: 10
    },
    explanation:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    category:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    }
}, {collection: 'income', timestamps : true})

incomeSchema.methods.joiValidation = function (userObject) {

    const schema = Joi.object({
        user: Joi.string().trim().min(3).max(100),
        date: Joi.string().trim().min(3).max(10),
        amount: Joi.string().trim().max(10),
        explanation: Joi.string().trim().min(3).max(20),
        category: Joi.string().trim().min(3).max(10)

    })

    return schema.validate(userObject);
}


const Income = mongoose.model('Income' , incomeSchema)

module.exports = Income;