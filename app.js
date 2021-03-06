const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//import routes
const authRoute = require('./routes/authRoute');
const verifyRoute = require('./routes/dashboard');
const pageRoute = require('./routes/pageRoute');

//loads environment variables
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log("Connected to DB");
})

//allow cross origin requests
app.use(cors());

//middleware function which parses incoming requests
app.use(express.json());

//Middleware Route
app.use('/api/user',authRoute);
app.use('/verify',verifyRoute);
app.use('/getdata',pageRoute);

app.get('/' ,(req,res)=>{
    res.send("Welcome to CMS App Node server");
})

// const port = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000,()=>console.log("Server is running" ));