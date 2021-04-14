const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')


Router.get('/categories', async (req, res) => {
    try {
        const db = dbService.getDbServiceInstance();
        const results = await db.getCategories()
        console.log(results)
        res.send({message: results})
    } catch (e) {
        console.log(`error is: `, e)
        res.send({message: e})
    }
});

module.exports = Router