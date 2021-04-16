const router = require('express').Router();
const User = require('../model/User');
const categories = require('../model/category');
const Page = require('../model/Page');


router.post('/pages',async (req,res)=>{
    console.log(req.body);
    const pages = new Page({
        title:req.body.title,
        category:req.body.category,
        author:req.body.author
    });
    try {
        const pageSave = await pages.save();
        res.json({message:"Added"});
    } catch (error) {
        res.status(400).json({message:"Failed to add page"})
    }
});

router.post('/categories',async (req,res)=>{
    const catg = new categories({
        title:req.body.title,
    });
    try {
        const categorySave = await catg.save();
        res.json({message:"Added"});
    } catch (error) {
        res.status(400).json({message:"Failed to add category"})
    }
});

router.get('/users/:offset/:limit',async (req,res)=>{
    const offset = parseInt(req.params.offset);
    const limit  = parseInt(req.params.limit);

    const data = await User.find({}).skip(offset).limit(limit);
    const total= await User.countDocuments();

    if(!data) return res.status(400).json({message:"No Data"});
    if(data) return res.status(200).json({result:data,no:total});
    
});

router.get('/pages/:offset/:limit',async (req,res)=>{
    const offset = parseInt(req.params.offset);
    const limit  = parseInt(req.params.limit);
    const data = await Page.find().skip(offset).limit(limit);
    const count = await Page.countDocuments();
    if(!data) return res.status(400).json({message:"error"});
    if(data) return res.status(200).json({result:data,no:count});
    
});

router.get('/categories/:offset/:limit',async (req,res)=>{
    const offset = parseInt(req.params.offset);
    const limit=parseInt(req.params.limit);
    const data = await categories.find().skip(offset).limit(limit);
    const count = await categories.countDocuments();
    if(!data) return res.status(400).json({message:"error"});
    if(data) return res.status(200).json({result:data,no:count});
});

router.get('/page/:id',async(req,res)=>{
    const data = await Page.findById({_id:req.params.id});
    if(!data) return res.status(400).json({message:"Error"});
    if(data) return res.status(200).json(data);
});

router.get('/user/:id',async(req,res)=>{
    const data = await User.findById({_id:req.params.id});
    if(!data) return res.status(400).json({message:"Error"});
    if(data) return res.status(200).json(data);
});

router.get('/category/:id',async(req,res)=>{
    const data = await categories.findById({_id:req.params.id});
    if(!data) return res.status(400).json({message:"Error"});
    if(data) return res.status(200).json(data);
});

router.put('/pages/:id',async (req,res)=>{
    const data = await Page.findByIdAndUpdate(req.params.id,{
        $set:{title:req.body.title, category:req.body.category, author:req.body.author}
    },{useFindAndModify: false});
    if(data) return res.status(200).json({message:"Updated"});
    if(!data) return res.status(400).json({message:"Fail to update"});
})

router.put('/users/:id',async (req,res)=>{
    const data = await User.findByIdAndUpdate(req.params.id,{
        $set:{name:req.body.name, email:req.body.email, group:req.body.group}
    });
    if(data) return res.status(200).json({message:"Updated"});
    if(!data) return res.status(400).json({message:"Fail to update"});
})

router.put('/categories/:id',async (req,res)=>{
    const data = await categories.findByIdAndUpdate(req.params.id,{
        $set:{title:req.body.title}
    });
    if(data) return res.status(200).json({message:"Updated"});
    if(!data) return res.status(400).json({message:"Fail to update"});
})

router.delete('/pages/:id',async (req,res)=>{
    const data  = await Page.findByIdAndDelete(req.params.id);
    if(!data) return res.json(400).json({message:"Fail to delete Page"});
    if(data) return res.json(200).json({message:"Page Deleted"});
})

module.exports = router;
