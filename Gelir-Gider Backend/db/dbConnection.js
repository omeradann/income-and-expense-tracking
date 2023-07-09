const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0/IncomeandExpense")
.then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("database connection error"+ err);
});