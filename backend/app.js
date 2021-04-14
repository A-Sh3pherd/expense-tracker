const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT
//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Routes
const LoginRoute = require('./routes/login')
const GetAllRoute = require('./routes/getAll')
const SignupRoute = require('./routes/signup')
const AddExpenseRoute = require('./routes/addExpense')
const CategoriesRoute = require('./routes/categories')
const GetUserExpensesRoute = require('./routes/getUserExpenses')
//Server:

app.get('/', (req, res) => {
    res.send('hello world')
})
//Get All Users Data
app.get('/getAll', GetAllRoute)

//Login
app.post('/login', LoginRoute)

//Signup
app.post('/signup', SignupRoute)

//Get Categories
app.get('/categories', CategoriesRoute)

//Add Expense
app.post('/addExpense/:username', AddExpenseRoute)

//Get All User Expenses
app.get('/getExpenses/:user_id', GetUserExpensesRoute)
//
app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})