const express = require('express');
const router = express.Router();
const index = require('../views/index');
const model = require('../models/index');
const db = model.db;
// let page;

function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  }


router.get("/", async(req,res,next) => {
    try {
        const pages = await model.Page.findAll();
        res.send(index.main(pages));

    }
    catch(error) {
        next(error);
    }
})

router.post('/', async(req,res,next) => {

    try {
        const author = req.body.author;
        const authorEmail = req.body.email;
        const title = req.body.title;
        const content = req.body.content;
        const status = req.body.status.toLowerCase();

        const [user, wasCreated] = await model.User.findOrCreate({
            where: {
                name: author,
                email: authorEmail
            }
        });

        const page = new model.Page({
            title: title,
            slug: generateSlug(title),
            content: content,
            status: status
        })

        page.setAuthor(user);

        await page.save();

        res.redirect(`/wiki/${page.slug}`);


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

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await model.Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        res.send(index.wikiPage(page,page.author));

    } catch(err){
        next(err);
    }
    // res.send(`hit dynamic route at ${req.params.slug}`);
  });

module.exports = router;
