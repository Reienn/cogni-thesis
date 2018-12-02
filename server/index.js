const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const SETTINGS = require('./settings.conf.json');

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/../client/dist/client'));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./routes/routes')(app);

const server = app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server is listening on port ${port}`);
});

mongoose.connect(SETTINGS.db.address);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connected');
});