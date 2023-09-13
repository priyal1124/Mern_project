const dotenv=require('dotenv');
const express= require('express');

//const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
const cookieParser=require('cookie-parser');

const app=express();


//configuring env file and require connection
dotenv.config({path:'./config.env'});
require('./db/conn');
const port=process.env.PORT
//required models importation

const Message=require('./models/msgSchema');
const authenticate=require('./middleware/authenticate');
const Users = require('./models/userSchema');

//method used for getting data and cookies front end
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.post('/register',async (req,res)=>{
    try{
        //get data or body
        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const createUser= new Users({
            username:username,
            email:email,
            password:password
        });
        const created=await createUser.save();
        console.log(created);
        res.status(200).send("Registered Successfully")

    }catch(error){
        res.status(400).send(error)
    }
})
//login
app.post('/login',async (req,res)=>{
    try{
        //get data or body
       
        const email=req.body.email;
        const password=req.body.password;
        //finding the user
        const user= await Users.findOne({
            
            email:email,
           
        });
        if(user){
            //verifying the passowrd
            const isMatch=await bcryptjs.compare(password,user.password)
            
            if(isMatch){
                const token=await user.generateToken();
                res.cookie("jwt",token,{
                //expires token in 24 hours
                expiers:new Date(Date.now()+86400000),
                httpOnly:true
            })
            res.status(200).send("LoggedIn")
        }else{
            res.status(400).send("Invalid Credentials");
        }
       

    }else{
        res.status(400).send("Username Not Found")
    }
}catch(error){
    res.status(400).send(error)
}
});

//mesaage contact
app.post('/message',async(req,res)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const subject=req.body.subject;
        const message=req.body.message;
        const sendMsg=new Message({
            name:name,
            email:email,
            subject:subject,
            message:message
        
        });
        const created=await sendMsg.save();
        console.log(created)
        res.status(200).send("Sent");
    }catch(error){
        res.status(400).send(error)
    }
  
})
// Logout Page
app.get('/logout', (req, res)=>{
    res.clearCookie("jwt", {path : '/'})
    res.status(200).send("User Logged Out")
})

// Authentication



app.listen(port,(req,res)=>{
    console.log("server is running");
});