const mongoose = require("mongoose");
const chat=require("./models/chat"); 

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
const allchats = [
    {
        from: "suman",
        to: "sashi",
        msg: "Hello bro",
        created_at: new Date()
    },
    {
        from: "sashi",
        to: "suman",
        msg: "Hi bro",
        created_at: new Date()
    },
    {
        from: "rahul",
        to: "priya",
        msg: "Are you coming today?",
        created_at: new Date()
    },
    {
        from: "priya",
        to: "rahul",
        msg: "Yes, I will come",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "suman",
        msg: "Did you complete the project?",
        created_at: new Date()
    },
    {
        from: "suman",
        to: "amit",
        msg: "Almost completed",
        created_at: new Date()
    },
    {
        from: "rohit",
        to: "ankit",
        msg: "Where are you?",
        created_at: new Date()
    },
    {
        from: "ankit",
        to: "rohit",
        msg: "I am at college",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "riya",
        msg: "Good morning",
        created_at: new Date()
    },
    {
        from: "riya",
        to: "neha",
        msg: "Good morning",
        created_at: new Date()
    }
];
chat.insertMany(allchats)
    .then((res) => {
        console.log("Chats inserted:", res.length);
    })
    .catch((err) => {
        console.log(err);
    });