const express = require('express');
const router = express.Router();
const index = require('../views/index');
const model = require('../models/index');
const db = model.db;

router.get('/', async(req, res, next) => {

    try {
        const users = await model.User.findAll();
        res.send(index.userList(users))
    }

    catch(err) {
        next(err);
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const user = await model.User.findOne( {
            where: {
                id: req.params.id
            }
        })

        const pages = await model.Page.findAll({
            where: {
                authorId: req.params.id
            }
        })

        res.send(index.userPages(user,pages));
    }
    catch(err) {
        next(err);
    }
})




module.exports = router;