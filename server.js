const express = require('express');
const connectDB = require('./DB/Connection');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/User');
const bcrypt = require('bcryptjs')

const app = express();

/*mongoose.connect('mongodb+srv://adminDb:adminDb@cluster0.pxcwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
*/

connectDB();

app.use('/',express.static(path.join(__dirname,'HTML')));
app.get('/', function(req, res){
    res.sendFile('Registration.html',{root: path.join(__dirname, './HTML')})
});
app.use(express.json());
app.use(bodyParser.json())
app.post('/api/register',async (req,res)=>{
    console.log(req.body)

    const {username,password:plainTextPassword,email}=req.body;
    const password=await bcrypt.hash(plainTextPassword,10)
    try{
       const response = await User.create({
            username,
            password,
            email
        })
        console.log('User Created Successfully:',response)
    } catch(error){
        console.log(error)
        return res.json({status:error})
    }

    res.json({status: 'ok'})
    }
)

const Port = process.env.Port || 3000;

app.listen(Port, () => {
    console.log('Server started')
});