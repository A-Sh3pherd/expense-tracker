const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')

Router.post('/addExpense/:username', async (req, res) => {
    const {name, price, date, category, user_id} = req.body;
    try {
        const db = dbService.getDbServiceInstance();
        const results = await db.addExpense(name, price, date, category, user_id)
        console.log(results)
        res.send({message: results})
    } catch (e) {
        console.log(`error is: `, e)
        res.send({message: e})
    }
});

module.exports = Router