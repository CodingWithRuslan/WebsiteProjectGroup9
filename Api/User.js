/*const express = require('express');
const User = require('../DB/User');
const route = express.Router();


route.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});
*/


// Show the list of users.
/*route.post('/index', async (req, res) => {
    User.find()
        .then(res => {
            res.json({res})
        })
        .catch(() =>{
            res.json({message: 'An error Occurred!'})
        })
});*/