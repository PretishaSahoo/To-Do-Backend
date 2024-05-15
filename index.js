const express = require('express');
const app = express();
const connectToMongo = require('./db');
const cors = require('cors')
const auth = require("./routes/auth")
const list = require("./routes/list")
require('dotenv').config();

connectToMongo();

app.use (express.json())
app.use(cors({
    origin:  ["https://to-do-backend-pretisha.vercel.app/", "http://localhost:3000" ,"https://to-do-2308.vercel.app/"],
    methods: ['POST', 'DELETE', 'GET', 'PUT', 'PATCH'],
    credentials: true
}));

app.options("" ,cors({
    origin:  ["https://to-do-backend-pretisha.vercel.app/", "http://localhost:3000" , "https://to-do-2308.vercel.app/"],
    methods: ['POST', 'DELETE', 'GET', 'PUT', 'PATCH'],
    credentials: true
}) )

app.get("/",(req,res)=>{
    res.send("Server");
})


app.use ("/api/v1" , auth )
app.use ("/api/v2" , list )

app.listen(1000 , ()=>{
    console.log("Server is working!")
})
