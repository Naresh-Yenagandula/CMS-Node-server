const router = require('express').Router();
const Category = require('../model/category');
const jwt = require('jsonwebtoken');

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