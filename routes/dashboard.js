const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');


router.get('',verify,(req,res)=>{
    // res.send(req.user);
    User.findById({_id:req.user._id},(a,b)=>{
        res.send(b);
    });

})

module.exports = router;