const express = require("express");
const app = express();
const AWS = require("aws-sdk");
app.get("/",(req,res)=>{
    res.send("hi")
})
app.post("/",(req,res)=>{})
app.put("/",(req,res)=>{})
app.delete("/",(req,res)=>{})
app.listen(5000)