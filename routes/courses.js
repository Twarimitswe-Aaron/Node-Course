const express=require('express')
const router=express.Router();

router.get('/:id', (req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id));
    if(!course)res.status(404).send("course not found").end();
    res.send(course);
})

router.post('/newCourse', (req,res)=>{
    const {error}=ValidateCourse(req.body)
    if(error){
        return res.status(404).send(error.details[0].message); 
    }
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);

})

router.put('/updateCourse/:id', (req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course){res.status(404).send("course is not available");return};

    const {error}=ValidateCourse(req.body);
    if(error){
        return res.status(404).send(error)
        
    }
    course.name=req.body.name;
    res.status(200).send(course);
})

function ValidateCourse(data){
    const result=Joi.object({
        name:Joi.string().required().min(3)
    })

    return result.validate(data);
}

router.delete('/deleteCourse/:id',(req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id));
    if(!course)res.status(404).send("course not found").end();

    const index=courses.indexOf(course);
    courses.splice(index,1);
    return res.send(course);

})

router.listen(3000,()=>{
    console.log("Server is runningg.....at http://localhost:3000");
});

module.exports=router;