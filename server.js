const express = require('express');
const connectDB = require('./DB/Connection');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')

const JWT_SECRET= 'dsadsanbsd#@$@#$!!#$!fsdfhbj324vfxxcv'

const app = express();

/*mongoose.connect('mongodb+srv://adminDb:adminDb@cluster0.pxcwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
*/

connectDB();

app.use('/',express.static(path.join(__dirname,'public')));
app.get('/', function(req, res){
    res.sendFile('home.html',{root: path.join(__dirname, './HTML')})
});
app.use(express.json());
app.use(bodyParser.json())
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

    res.json({status:'error',error:'Invalid Username or Password'})
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

const Port = process.env.Port || 3000;

app.listen(Port, () => {
    console.log('Server started')
});