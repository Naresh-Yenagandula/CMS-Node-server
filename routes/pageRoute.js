const router = require('express').Router();
const User = require('../model/User');

router.post('/page',()=>{
    
})

router.get('/user',async (req,res)=>{
    const data = await User.find();
    if(!data) return res.status(400).json({message:"No Data"});

    if(data) return res.status(200).json(data);
});


module.exports = router;