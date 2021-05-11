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
    .use('/css', express.static(__dirname+'public/css'))
    //.use('/js', express.static(__dirname+'public/js'))
    //.use('/img', express.static(__dirname+'public/img'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .get('',(req,res) => {
        res.sendFile(__dirname + '/public/index.html')
    })

    .listen(Port, () => console.log('Server listening'));



//app.listen(Port, () => console.log('Server started'));