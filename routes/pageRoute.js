const router = require('express').Router();
const User = require('../model/User');
const categories = require('../model/category');

router.post('/page',()=>{
    
})

router.get('/user',async (req,res)=>{
    const data = await User.find();
    if(!data) return res.status(400).json({message:"No Data"});

    if(data) return res.status(200).json(data);
});

router.post('/categories',async (req,res)=>{
    const catg = new categories({
        title:req.body.title,
    });
    try {
        const categorySave = await catg.save();
        res.send({catg: catg._id});
        
    } catch (error) {
        res.status(400).json({message:"Failed to add category"})
    }
});


module.exports = router;