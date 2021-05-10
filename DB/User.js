const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
       //  required: [true, 'Users must have a name'],
       // trim: true
    },
    email: {
        type: String,
      //  required: [true, 'Users must have an email'],
       // unique: true,
      //  lowercase: true,trim: true
    },
    password: {
        type: String,
      //  required: [true, 'Users must provide a password'],
        //trim: true,
        //minlength: [8, 'Passwords must have a minimum of eight characters'],
        //select: false
    }
});

module.exports = User = mongoose.model('user', user);