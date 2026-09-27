const express=require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const chat=require("./models/chat"); 
const methodOverride=require("method-override");
let port=8080;

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log('connected');
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
  //await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.get("/",(req,res)=>{
    res.send("root is working");
})
app.get("/chats",async(req,res)=>{
  let chats= await chat.find() ;
 // console.log(chats);
  res.render("index.ejs",{chats});  
})
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
});
app.get("/chats/:id/edit",async(req,res)=>{
    let { id }=req.params;
    let chatdata=await chat.findById(id);
    res.render("edit.ejs",{chat:chatdata});
})
//create route
app.post("/chats",(req,res)=>{
let {from,to,msg}=req.body;
let newchat=new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
});console.log(newchat); 

newchat.save().then((res)=>{
    console.log("saved in db ");
});
res.redirect("/chats"); });
//update
app.put("/chats/:id",async(req,res)=>{
   let {id}=req.params;
   console.log(id);
   let {msg}=req.body;
   console.log(msg);
   let updatedchat= await chat.findByIdAndUpdate(id,{
     msg},
     {runValidators:true, returnDocument: "after"}); 
  console.log(updatedchat);
  res.redirect("/chats");
});
app.listen(8080,()=>{
    console.log("server is running at ",port);
});
