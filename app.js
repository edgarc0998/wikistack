const express = require('express');
const app = express();
const morgan = require('morgan');
const index = require('./views/index');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.send(index.main(""));
})

var port = 3000;


app.listen(port, () => {
  console.log('app listening');
});
