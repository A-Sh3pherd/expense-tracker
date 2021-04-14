const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')

Router.post('/signup', async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const db = await dbService.getDbServiceInstance();
        const results = await db.signup(username, password,email)
        console.log(results)
        res.send({message: results})
    } catch (e) {
        console.log(`error is: `, e)
        res.send({message: e})
    }
});

module.exports = Router