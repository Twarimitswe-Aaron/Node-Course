const express=require('express');
const Joi=require('joi');
const app=express();

const courses=[
    {id:1,name:"Eng"},
]


app.use(express.json());
app.get('/', (req,res)=>{
    res.send(courses);
})

app.get('/:id', (req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id));
    if(!course)res.status(404).send("course not found").end();
    res.send(course);
})

app.post('/newCourse', (req,res)=>{
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

app.put('/updateCourse/:id', (req,res)=>{
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

app.delete('/deleteCourse/:id',(req,res)=>{
    const course=courses.find(c=> c.id===parseInt(req.params.id));
    if(!course)res.status(404).send("course not found").end();

    const index=courses.indexOf(course);
    courses.splice(index,1);
    return res.send(course);

})

app.listen(3000,()=>{
    console.log("Server is runningg.....at http://localhost:3000");
});