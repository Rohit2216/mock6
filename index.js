const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connection = require('./db')
const {userRouter} = require('./routes/user.route')
const {quizRouter} = require('./routes/quiz.route');

const app = express();
app.get('/', (req, res) =>{
    res.send("Welcome to quiz...")
})
app.use(express.json())
app.use(cors())
app.use("/user",userRouter);
app.use("/quiz",quizRouter);

app.listen(8800, async(req,res)=>{
    try{
        await connection 
        console.log('database is connected');
    } catch(err){
        console.log(err.message);
        console.log("server is not running..")
    }
    console.log("server is running on port 8800");
})