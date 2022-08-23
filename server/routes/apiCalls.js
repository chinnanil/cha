var express = require("express");
var router = express.Router();
const db = require('../config/db')



/*Login Node Details*/
router.post("/login", (req, res) => {

  const username=req.body.username;
  const password=req.body.password;

global.uid=req.body.username
  var sql="SELECT * FROM user WHERE uid =? AND pass =?;SELECT * FROM admin WHERE uid=? AND pass=?"
  db.query(sql,
  [username,password,username,password],
  
  ( err,result)=>{
  if(result[0].length>0)
  {
 

    console.log("response: ",result[0])
  res.send(result[0])
  
  
  
  
  
}

else if(result[1].length>0){
  res.send(result[1])

}
  else{
   
  res.send({message:"Invalid userid/password"});
  }
  
  });
  
  });



/*Forget Node */
router.post("/forget", (req, res) => {

  const username=req.body.username;
  const password=req.body.password;
  const cpassword=req.body.cpassword;
   let userarr=[];
   let userarr1=[];
  db.query( "SELECT count(*) as length FROM user", function (err, result) {
    if (err) throw err;
    count=result[0].length
	 var sql="SELECT * FROM user;SELECT * FROM admin"
  db.query(sql,function (err, result) {
    if (err) throw err;
    for(var i=0;i<count;i++)
    {
userarr.push(result[0][i].uid);
userarr1.push(result[0][i].uid.toLowerCase())
    }
	for(var i=0;i<1;i++)
	{
	userarr.push(result[1][0].uid)
  userarr1.push(result[1][0].uid.toLowerCase())
	}
  console.log("userarr",userarr)
  console.log("userarr1",userarr1)
  if(userarr.includes(username)||userarr1.includes(username))
  {
  if(password===cpassword){
      db.query("UPDATE user SET pass= ? WHERE uid =?",
  [password,username],
  ( err,result)=>{
      if(result.affectedRows!=0){
      
          res.send({message:"updated password successfully..! please login"});
      }
     })
}
 else{
   res.send({message:"password and confirm password not matched"});  
  }
}
else{
 res.send({message:"invalid username"}); 
}
  });
  })
})
  

//Register Node Id generation
/*
app.get("/register", (req, res) => {
  let userarr=[];
  db.query( "SELECT count(*) as length FROM user", function (err, result) {
    if (err) throw err;
    count=result[0].length
	 var sql="SELECT * FROM user"
  db.query(sql,function (err, result) {
    let id=""
    if(result.length>0)
    {
      for(var i=0;i<count;i++)
      {
  userarr.push(result[i].uid.slice(2));
  
      }
    
      console.log("user",userarr)
     
     let len= Math.max(...userarr)
   console.log("len",len)
   
    
  
      len=parseInt(len)+1
      id ="DS"+len;
   
       res.send({id});
    }
    else
    {
      id ="DS"+1;
      res.send({id});
    
   
}
 
})
})
})
*/

//Register new employee details
/*
app.post("/register", (req, res) => {
  
const email=req.body.emailid;
const userid=req.body.userid.toUpperCase();
const companyid=req.body.companyid.toUpperCase();
const firstname=req.body.firstname.toUpperCase();
const lastname=req.body.lastname.toUpperCase();
const gender=req.body.gender;
const mobile=req.body.mobileno;
const password=req.body.password;
const role=req.body.role;



db.query("INSERT INTO user (Email,uid,cid,fname,lname,gender,mobile,pass,Role,Status) VALUES (?,?,?,?,?,?,?,?,?,?)",
[email,userid,companyid,firstname,lastname,gender,mobile,password,role,"A"],

( err,result)=>{
if(err)

console.log(err);

if(result){

res.send({message:"Registration is success"});
} else{
res.send({message:"Already Registered"});
}
}

);

});
*/


module.exports = router;