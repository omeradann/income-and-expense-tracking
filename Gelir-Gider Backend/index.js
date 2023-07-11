//Express.js
const express = require('express');
const app = express();

//Db Connect
require('./db/dbConnection');

//Json shredding
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Origin
const cors = require("cors");
app.use(cors());

//Error Middleware
const errorMiddleware = require('./middleware/errorMiddleware');


//Routes
const incomeRouter = require('./router/incomeRouter');
const expenseRouter = require('./router/expenseRouter');
const userRouter = require('./router/userRouter');

app.use('/api/incomes' , incomeRouter);
app.use('/api/expenses' , expenseRouter);
app.use('/api/users' , userRouter)



app.get("/", (req, res) => {
    res.json({"Message" : "This is backend!"});
})

app.use(errorMiddleware);

app.listen(3000, () => {
console.log("The server was booted from port 3000!");
})