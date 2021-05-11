const express = require('express');
const User = require('../model/User');
const route = express.Router();


route.post('/', async (req, res) => {
    const { username, password,email } = req.body;
    let user = {};
    user.username = username;
    user.password = password;
    user.email=email;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});

module.exports = route;