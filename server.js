const express = require('express');
const connectDB = require('./DB/Connection');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const passport = require('passport')
const flash = require('express-flash')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const ejs= require('ejs')
const JWT_SECRET= 'dsadsanbsd#@$@#$!!#$!fsdfhbj324vfxxcv'

const app = express();

/*mongoose.connect('mongodb+srv://adminDb:adminDb@cluster0.pxcwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
*/

connectDB();

app.use('/',express.static(path.join(__dirname,'views')));
app.get('/', function(req, res){
        res.render('home.ejs',{root: path.join(__dirname, './views')})
});
app.get('/login', function(req, res){
    res.render('login.ejs',{root: path.join(__dirname, './views')})
});
app.get('/Registration', function(req, res){
    res.render('Registration.ejs',{root: path.join(__dirname, './views')})
});
app.get('/Vacations', function(req, res){
    res.render('Vacations.ejs',{root: path.join(__dirname, './views')})
});
app.get('/Detailsp', function(req, res){
    res.render('Detailsp.ejs',{root: path.join(__dirname, './views')})
});
app.get('/Detailse', function(req, res){
    res.render('Detailse.ejs',{root: path.join(__dirname, './views')})
});
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);

app.post('/api/login',async (req,res)=>{
    const{username,password}=req.body
    const user=await User.findOne({username}).lean()

    if(!user){
        return res.json({status: 'error',error:'Invalid Username or Password'})
    }

    if(await bcrypt.compare(password,user.password)){
        // username,password combination is successful

        const token= jwt.sign({
            id:user._id,
            username:user.username

            },
            JWT_SECRET
        )
        return  res.json({status:'ok',data: token})
    }
    /* tried to implement session
    const jwtToken = await jwt.sign({ user: user }, process.env.SECRET_JWT_KEY);

    if (jwtToken) {
        const cookie = req.cookies.jwtToken;

        if (!cookie) {
            res.cookie('jwtToken', jwtToken, { maxAge: 360000000, httpOnly: true });
        }
        req.flash('success_msg', 'You are now logged in!');
        return res.redirect('/');
    }
    */

    res.json({status:'error',error:'Invalid Username or Password'})
})


app.post('/api/change-password',async (req,res)=>{
    const {token,newpassword: plainTextPassword}=req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if (plainTextPassword.length<7){
        return res.json({
            status: 'error',
            error: 'Password too short, should be at least 8 characters'
        })
    }
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        console.log('JWT decoded:',user)
        const password = await bcrypt.hash(plainTextPassword,10)
        await User.updateOne({_id}, {
            $set: {password}
        })

        console.log(user)
        res.json({status: 'ok'})
    }catch (error){
        res.json({status:'error',error: ';))'})
    }
})

app.post('/api/register',async (req,res)=> {


    const {username, password: plainTextPassword, email} = req.body;

    if (!username || typeof username !== 'string'){
        return res.json({status: 'error', error: 'Invalid username'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if (plainTextPassword.length<7){
        return res.json({
            status: 'error',
            error: 'Password too short, should be at least 8 characters'
        })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)
    try {
        const response = await User.create({
            username,
            password,
            email
        })
        console.log('User Created Successfully:', response)
    } catch (error) {
        if (error.code === 11000) {
            // duplicate error
            return res.json({status: error, error: 'Username already in use'})
         }

        throw error
    }
    res.json({status: 'ok'})
})

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log('Server started')
});