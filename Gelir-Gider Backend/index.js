const express = require('express');
const app = express();

//Db Connect
require('./db/dbConnection');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// const bodyparser = require("body-parser");
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());

const cors = require("cors");
app.use(cors());

//Error Middleware
const hataMiddleware = require('./middleware/hataMiddleware');


//Routes
const incomeRouter = require('./router/incomeRouter');
const expenseRouter = require('./router/expenseRouter');
const userRouter = require('./router/userRouter');



app.use('/api/incomes' , incomeRouter);
app.use('/api/expenses' , expenseRouter);
app.use('/api/users' , userRouter)







app.use(hataMiddleware);




app.get("/", (req, res) => {
    res.json({"Mesaj" : "Burası backend"});
})













app.use(hataMiddleware);

app.listen(3000, () => {
console.log("Server 3000 portundan ayaklandırıldı");
})