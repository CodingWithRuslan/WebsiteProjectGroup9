const express = require('express');
const connectDB = require('./DB/Connection');
const morgan = require('morgan');
const { Prohairesis } = require('prohairesis');
const bodyParser = require('body-parser');

const app = express();
const Port = process.env.Port || 3000;

connectDB();

//app.use(express.json({ extended: false }));
//app.use('/api/userModel', require('./Api/User'));

app
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .listen(Port, () => console.log('Server listening'));



//app.listen(Port, () => console.log('Server started'));