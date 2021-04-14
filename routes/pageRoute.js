const router = require('express').Router();
const Page = require('../model/Page');



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

//GET
// router.get('/page',()=>{
//     const page = new Page({
//         title:req.body.title,
//         category:req.body.category,
//         author:req.body.author
//     });
//     try {
//         const userSave = await user.save();
//         res.send({user: user._id});
        
//     } catch (error) {
//         res.status(400).json({message:"Failed to add user"})
//     }
// });
module.exports = router;


    
