const express=require('express');
const prod=require('./prod/prod');
const config=require('config');
const Joi=require('joi');
const app=express();
const helmet =require('helmet')
const morgan=require('morgan');
const courses=require('./routes/courses')
const home=require('./routes/home')
const logger=require('./middleware/logger')

const courses=[
    {id:1,name:"Eng"},
]

console.log(`The name: ${config.get.name}`);
console.log(`The host: ${config.get.mail.host}`);

app.set('view engine','pug');
app.set('views','views')

app.use(logger);
app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'));

if(app.get('env')==='development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled...>>>')
    console.log(app.get('env'))
}

app.use('/api/courses', courses);
app.use('/home',home);





