const router = require('express').Router();
const User = require('../model/User');
const categories = require('../model/category');


router.post('/pages',async (req,res)=>{
    const pages = new Page({
        title:req.body.title,
        category:req.body.category,
        author:req.body.author
    });
    try {
        const pageSave = await pages.save();
        res.send({pages: pages._id});
        
    } catch (error) {
        res.status(400).json({message:"Failed to add page"})
    }
});

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
