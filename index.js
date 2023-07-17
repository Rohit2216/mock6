const express = require('express');
require('dotenv').config();
const cors=require("cors")
const connection = require('./config/config')
const {userRouter} = require('./routes/user.route')
const {quizRouter} = require('./routes/quiz.route');


const app = express();
const port = process.env.port;
app.use(cors())
app.use(express.json())
app.use("/user",userRouter);
app.use("/quiz",quizRouter);

app.get('/', (req, res) =>{
    res.send("Welcome to quiz..")
})

app.listen(port, async(req,res)=>{
    try{
        await connection 
        console.log('database is connected');
    } catch(err){
        console.log(err.message);
        console.log("server is not running..")
    }
    console.log(`server is running on port ${process.env.port}`);
})