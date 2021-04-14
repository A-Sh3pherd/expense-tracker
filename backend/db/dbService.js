const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})
connection.connect((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('db ' + connection.state)
    }
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async query(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (err) {
                    return reject(err.message)
                }
                resolve(results)
            })
        })
    }

    //Get User Data
    async getUserData() {
        try {
            return this.query("select * from users");
        } catch (err) {
            console.log(err)
        }
    }

    //Get User Expenses
    async getUserExpenses(user_id) {
        return await this.query(
            `SELECT expenses.name, expenses.price, categories.name as category, expenses.date, expenses.user_id as username
                  FROM expenses 
                  INNER JOIN categories
                  ON expenses.category_id = categories.id
                  WHERE expenses.user_id = ${user_id}
                  ORDER BY date asc
                 `)
    }

    //Login
    async login(username, password, res) {
        const results = await this.query(`SELECT * FROM users WHERE username = '${username}'  AND password = '${password}'`);
        if (results.length) {
            res.json({msg: 'User Found!', user: results[0]})
        } else {
            res.send({message: "Username or password are incorrect!"})
        }
    }

    //Signup
    async signup(username, password, email) {
        const users = await this.query(`SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`)
        if (users.length) {
            throw new Error('user already exist')
        } else {
            await this.query(`INSERT INTO users(username,email,password) VALUES ('${username}', '${email}', '${password}')`)
            return 'User Created!'
        }
    }

    //Get Categories
    async getCategories() {
        return this.query(`SELECT * FROM categories`)
    }

    //Add Expense
    async addExpense(name, price, date, category, user_id) {
        await this.query(`INSERT INTO expenses(name, price, date, category_id, user_id) 
                              VALUES('${name}', ${price}, '${date}', '${category}', ${user_id})`)
        return 'Expense created!'

    }
}

module.exports = DbService