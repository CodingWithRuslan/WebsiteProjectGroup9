const mongoose = require('mongoose')

const URI = "mongodb+srv://adminDb:adminDb@cluster0.pxcwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB =() => {
    mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
    console.log('db connected..!');
};

module.exports = connectDB;