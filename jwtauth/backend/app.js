const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');

const users = require('./routes/user');

mongoose.connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true }).then(
    () => { console.log('Database is Connected') },
    err => { console.log('Cannot Connect to the database' + err) }
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', function (req, res) {
    res.send('Node server Running on 5000 Port in this Url');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})