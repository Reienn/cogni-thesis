const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const DB_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : require('./settings.conf.json').db.url;

const app = express();
const port = process.env.PORT || 8080;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist/client'));
require('./routes/routes')(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/client/index.html'));
});

const server = app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Server is listening on port ${port}`);
});

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connected');
});