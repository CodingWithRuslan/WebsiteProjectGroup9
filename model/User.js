const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    email: {
        type: String,
    },

},
{collection:'users'}
);

const User = mongoose.model('user',user);
module.exports = User;