const EventEmmiter=require('events');
class Logger extends EventEmmiter{
     log(name){
        console.log(name);
        this.on('Called',(arg)=>{
            console.log(arg);
        })
}

}

module.exports=Logger;