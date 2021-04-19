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
        // res.status(400).json({message:"Failed to add page"})
        console.log("failed to add page");
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
        // res.status(400).json({message:"Failed to add category"})
        console.log("Failed to add category");
    }
});

router.get('/users/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await User.find().skip(offset).limit(5);
        const total= await User.countDocuments(); 
        return res.status(200).json({result:data,no:total});
    } catch (error) {
        // res.status(400).json({message:"No Data"});
        console.log("Failed to add user");
    }
});

router.get('/pages/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await Page.find().skip(offset).limit(5);
        const count = await Page.countDocuments();
        return res.status(200).json({result:data,no:count});
    } catch (error) {
        console.log("Failed to get page");
    } 
});

router.get('/categories/:offset',async (req,res)=>{
    try {
        const offset = parseInt(req.params.offset);
        const data = await categories.find().skip(offset).limit(5);
        const count = await categories.countDocuments();
        return res.status(200).json({result:data,no:count});
    } catch (error) {
        //  res.status(400).json({message:"error"});
        console.log("Failed to get category");
    }
});

router.get('/page/:id',async(req,res)=>{
    try {
        const data = await Page.findById({_id:req.params.id});  
        return res.status(200).json(data);
    } catch (error) {
        // res.status(400).json({message:"Error"});
        console.log("Failed to get page");
    }
});

router.get('/user/:id',async(req,res)=>{
    try {
        const data = await User.findById({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        // res.status(400).json({message:"Error"});
        console.log("Fail to find user");
    }
});

router.get('/category/:id',async(req,res)=>{
    try {
        const data = await categories.findById({_id:req.params.id});
        return res.status(200).json(data);
    } catch (error) {
        // res.status(400).json({message:"Error"});
        console.log("failed to get category");
    }
});

router.put('/pages/:id',async (req,res)=>{
    try {
        const data = await Page.findByIdAndUpdate(req.params.id,{
            $set:{title:req.body.title, category:req.body.category, author:req.body.author}
        },{useFindAndModify: false});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
        console.log("Failed to update page");
    }
})

router.put('/users/:id',async (req,res)=>{
    try {
        const data = await User.findByIdAndUpdate(req.params.id,{
            $set:{name:req.body.name, email:req.body.email, group:req.body.group}
        });
        return res.status(200).json({message:"Updated"});
    } catch (error) {
        console.log("Fail to update user");
    }
})

router.put('/categories/:id',async (req,res)=>{
    try {
        const data = await categories.findByIdAndUpdate(req.params.id,{
            $set:{title:req.body.title}
        },{useFindAndModify:false});
        return res.status(200).json({message:"Updated"});
    } catch (error) {
       console.log("Failed to update category");
    }
})

router.delete('/pages/:id',async (req,res)=>{
    try {
        const data  = await Page.findByIdAndDelete(req.params.id,{useFindAndModify:false});
        return res.status(200).json({message:"Page Deleted"});
    } catch (error) {
        // res.status(400).json({message:"Fail to delete Page"});
        console.log("Failed to delete page");
    }
})

router.delete('/categories/:id',async (req,res)=>{
    try {
        const data  = await categories.findByIdAndDelete(req.params.id,{useFindAndModify:false});
        return res.status(200).json({message:"Category Deleted"});
    } catch (error) {
        console.log("Failed to delete category");
    }
})

router.delete('/users/:id',async (req,res)=>{
    try {
        const data  = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"User Deleted"});
    } catch (error) {
        console.log("Failed to delete user");
    }
})

router.get('/users',async (req,res)=>{
    try {
        const data = await User.find().sort({$natural:-1}).limit(5);
        return res.status(200).json(data);
    } catch (error) {
        console.log("failed to get users");
    }
})

router.get('/pages',async (req,res)=>{
    try {
        const data = await Page.find().sort({$natural:-1}).limit(5);
        return res.status(200).json(data);
    } catch (error) {
        console.log("Failed to get pages");
    }
})
module.exports = router;
