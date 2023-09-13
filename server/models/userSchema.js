const mongoose= require('mongoose');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

// document structure
const userSchema=new mongoose .Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{

        token:{
            type:String,
            required:true
        }


    }]
});
//hashing the password
userSchema.pre("save" ,async function(next){
    if(this.isModified('password')){
        this.password=bcryptjs.hashSync(this.password,10);
    }
    next();
});
//generate token
userSchema.methods.generateToken=async function(){
    try{
        let generatedToken=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:generatedToken});
        await this.save();
        return generatedToken;
    }catch(error){
        console.log(error)
    }
}







const Users=new mongoose.model("USERS",userSchema)
module.exports=Users;
