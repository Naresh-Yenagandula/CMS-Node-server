const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//import routes
const authRoute = require('./routes/authRoute');
const verifyRoute = require('./routes/dashboard');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log("Connected to DB");
})

app.use(cors());
//Middleware

app.use(express.json());

//Middleware Route
app.use('/api/user',authRoute);
app.use('/verify',verifyRoute);


app.listen(3000,()=>console.log("Server is running at 3000"))