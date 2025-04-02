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

app.listen(3000);