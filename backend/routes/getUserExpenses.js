const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')


Router.get('/getExpenses/:user_id', async (req, res) => {
    const {user_id} = req.params
    try {
        const db = dbService.getDbServiceInstance();
        const results = await db.getUserExpenses(user_id)
        res.send({message: results})
    } catch (e) {
        console.log(`error is: `, e)
        res.send({message: e})
    }
});

module.exports = Router