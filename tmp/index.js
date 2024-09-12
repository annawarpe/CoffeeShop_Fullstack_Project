const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const encoder=bodyParser.urlencoded();
const path = require('path');
const app=express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/myfiles')));
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"coffee"
});
connection.connect(function(error,data){
    if(error){
        console.log(error);
    } 
    else
    {
    console.log("connocted");
    }
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/contact.html");
});
app.post("/submit",encoder,function(req,res){
    var name=req.body.name;
    var city=req.body.city;
     var email=req.body.email;
     var contact=req.body.contact;
     var time=req.body.time;
     var quantity=req.body.quantity;
     var pname=req.body.pname;
     var message=req.body.message;
    connection.query("INSERT INTO customer(c_name,c_city,c_email,c_contact,c_time,quantity,product,massege) VALUES(?,?,?,?,?,?,?,?)",[name,city,email,contact,time,quantity,pname,message],function(error,result){
      if(error){
        console.log(error);
      }
      else{
        console.log("record is inserted:",result);
      }
    })
})


app.listen(2200);