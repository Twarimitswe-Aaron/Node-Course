const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.send(courses);
    res.render('index',{title:'my node express' , header:'Welcome to this application'})
})

module.exports=router;