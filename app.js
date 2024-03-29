const express = require('express');
const app = express();
const morgan = require('morgan');
const index = require('./views/index');
const model = require('./models/index');
const db = model.db;
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');


app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);



app.get('/', (req, res) => {
  res.redirect('/wiki');
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

var port = 3000;

const init = async () => {
  // await model.User.sync();
  // await model.Page.sync();

  await db.sync({force: true});

  // model.Page.beforeValidate(() => {

  // })


  app.listen(port, () => {
    console.log('app listening');
  });

}

init();



