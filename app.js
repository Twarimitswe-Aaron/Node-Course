const EventEmmiter=require('events');
const Logger=require('./logger');
const logger=new Logger();


logger.on("Called",(arg)=>{
    console.log('envoked now');
    console.log(arg);   
})

logger.log("Aaron");
logger.emit("Called",{id:1,name:"Art"})

