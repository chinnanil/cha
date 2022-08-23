const express = require("express");
const mysql = require("mysql");
const cors =require("cors");
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const app = express();
const Moment=require('moment')
app.use(express.json());
app.use(cors());


const fs = require("fs");
const readline = require("readline");

//const db = require('./config/db')

const db = require('./config/db')

db.connect((err) => {

if (err) {
throw err;
}
console.log("MySql Connected");

//dataWrite();
});

let create=0;
let update=0;
let queries="";

function dataWrite(){
  const file = readline.createInterface({
    input: fs.createReadStream('D:/Project/Testing -Sowjanya and Team/Team/testusers.csv'),
    output: process.stdout,
    terminal: false
  });
  file.on('line', (line) => {
db.query("select * from user",function(err,user){
  
let userArray=[];
for(let i=0;i<user.length;i++)
{
userArray[i]=user[i].uid;
}

  let CreateEntry=[];
let UpdateEntry=[];

  
    let values=line.split(",");
  
       userId = values[0];
        companyId = values[1]; 
        firstName = values[2];
        lastName = values[3];
        email = values[4];
        password = values[5];
        gender = values[6];
        mobile = values[7];
        role = values[8];
        status = values[9];
        employeeGroup = values[10];
        seniority = values[11];
		reports_To = values[12];
		country = values[13];
        hireDate = values[14];
		department = values[15];
		
		      
        
    
    if(userArray.includes(userId))
    {
     
    UpdateEntry.push(userId)
    update=1;
    queries += mysql.format("UPDATE user SET uid=?,cid=?,fname=?,lname=?,Email=?,pass=?,gender=?,mobile=?,Role=?,Status=?,EmployeeGroup=?,Seniority=?,Reports_To=?,Country=?,HireDate=?,Department=? where uid=?;",[userId,companyId,firstName,lastName,email,password,gender,mobile,role,status,employeeGroup,seniority,reports_To,country,hireDate,department,userId])	
  }	  
    else{
    create=1;
  CreateEntry.push(new Array(userId,companyId,firstName,lastName,email,password,gender,mobile,role,status,employeeGroup,seniority,reports_To,country,hireDate,department)) 
   } 
  //console.log(CreateEntry)
if(create===1){
  var sql="INSERT INTO user (uid,cid,fname,lname,Email,pass,gender,mobile,Role,Status,EmployeeGroup,Seniority,Reports_To,Country,HireDate,Department)  VALUES?"
  db.query(sql,[CreateEntry],( err,result)=>{
    
    if(err)
      console.log(err)
    if(result)
      console.log("inserted");
    })
    
}
if(update===1){
 // console.log(queries)
  db.query(queries,function(err,result){

    if(err)
      console.log(err)
    if(result)
      console.log("updated");
    })
    }
  
  
  

})//count		

})//file on
    
}


//API Routes and Calls

const apicalls = require("./routes/apiCalls")
const caRoute = require("./routes/DENTSPLY");



app.use("/apiCalls",apicalls);
app.use("/DENTSPLY",caRoute);


app.listen("3002", () => {

    console.log("Server started on port 3000");
    
    });
    