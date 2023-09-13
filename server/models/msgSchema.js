// const mongoose= require('mongoose');


// const msgSchema=new mongoose.Schema({
//     Firstname:{
//         type:String,
//         required:true
//     },

//     Lastname:{
//         type:String,
//         required:true
//     },

//     username:{
//         type:String,
//         required:true
//     },
    
//     city:{
//         type:String,
//         required:true
//     },
//     Zip:{
//         type:Number,
//         required:true
    


//     }
// });

// const Message=new mongoose.model("MESSAGE",msgSchema)
// module.exports=Message;
const mongoose =require('mongoose');
const msgSchema=new mongoose.Schema({
  name:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
      

    },
    subject:{
        type:String,
        required:true,
       
    },
   message:{
        type:String,
        required:true,
       
    }
});
const Message= new mongoose.model("MESSAGE",msgSchema)
module.exports=Message;