const express = require('express');
const Router = express.Router();
const dbService = require('../db/dbService')

Router.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getUserData();

    result
        .then(data => res.json({data}))
        .catch(err => console.log(err))
});

module.exports = Router