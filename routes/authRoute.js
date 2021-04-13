const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async (req,res)=>{
    
    //Checks email exists in db or not
    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).send('Email Already Exists');

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //creating new user
    const user = new User({
        name:req.body.full_name,
        email:req.body.email,
        password:hashedPassword,
        group:req.body.group
    });
    try {
        //store data
        const userSave = await user.save();
        res.send({user: user._id});
        
    } catch (error) {
        res.status(400).send(error)
    }
});


router.post('/login',async (req,res)=>{
    console.log(req.body);

    //checks user exists or not
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('User Not Exists');  

    //checking password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token);

    res.send('Logged in');
})

module.exports = router;