const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async (req,res)=>{

    const emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.status(400).json({message:'Email Already Exists'});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name:req.body.full_name,
        email:req.body.email,
        password:hashedPassword,
        group:req.body.group
    });
    try {
        const userSave = await user.save();
        res.send({user: user._id});
        
    } catch (error) {
        res.status(400).json({message:"Failed to add user"})
    }
});


router.post('/login',async (req,res)=>{
    console.log(req.body);

    //checks user exists or not
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:'User Not Exists'});  

    //checking password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json({message:'Invalid password'});

    const token = await jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn:'24h'});
    if(token) return res.status(200).json(token);

    res.json({message:'Logged in'});
})

module.exports = router;