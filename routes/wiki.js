const express = require('express');
const router = express.Router();
const index = require('../views/index');
const model = require('../models/index');
const db = model.db;


router.get("/", async(req,res,next) => {
    try {
        res.send(index.main());

    }
    catch(error) {
        next(error);
    }
})

router.post('/', async(req,res,next) => {


    try {



        // res.send('got to post /wiki');
        const author = req.body.author;
        const authorEmail = req.body.email;
        const title = req.body.title;
        const content = req.body.content;
        const status = req.body.status;

        const page = new model.Page({
            title: title, 
            content: content,
            status: status
        })

        await page.save();

        res.redirect('/');

        // res.json({author, authorEmail, title, content, status});

        // console.log("AUTHOR", res.body);
        // console.log("\nSTATUS", status);



    }
    catch(error) {
        next(error);
    }})

router.get('/add', async(req,res,next) => {
    try {
        res.send(index.addPage());

    }
    catch(error) {
        next(error);
    }
})

module.exports = router;