const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')

Router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const db = dbService.getDbServiceInstance();
        const results = await db.login(username, password, res);

    } catch (e) {
        console.log(e)
        res.send({status: 'BAD'})
    }
});

module.exports = Router