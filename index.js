const express = require('express');
const app = express();
const connectToMongo = require('./db');
const cors = require('cors')
const auth = require("./routes/auth")
const list = require("./routes/list")
require('dotenv').config();

connectToMongo();

app.use (express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Server");
})


app.use ("/api/v1" , auth )
app.use ("/api/v2" , list )

app.listen(1000 , ()=>{
    console.log("Server is working!")
})
