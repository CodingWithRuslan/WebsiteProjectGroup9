const express = require('express');
const connectDB = require('./DB/Connection');
const app = express();
//const UserRoutes = require('./routes/userRoutes')
const AgentRoute = require('./routes/AgentRoute')

connectDB();


app.use(express.json({ extended: false }));
//app.use('/api/userModel',require('./Api/User'));
app.use('api/agent',AgentRoute);
const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server started'));
