var express = require("express");
var router = express.Router();
const Moment=require('moment');
const mysql = require("mysql");
const nodemailer = require('nodemailer');
const cors =require("cors");
const db = require('../config/db');
const cron = require('node-cron');
const { json } = require("express");



const invoiceFunction = require('./invoiceFunctions')





let currentDay=Moment().format("MMM DD YYYY")
router.post("/edittimesheet",async function(req, res) {
  var TimeSheetarr=[];
  let k=0;
  let l=0;
  let j=0;
 
  let flag=0;
 

   let Holiday=0;


    const myDate=req.body.myDate;
    const id=req.body.id;
    const taskList=req.body.taskList;
    let EmployeeGroup=req.body.EmployeeGroup;
  console.log(taskList+"taskList"+id+"id"+myDate+"myDate");
    
    var AATypes = []
    let Total=0;
    let logHrs=0;
    var validateAATypes = 0

    for(let i=0;i<taskList.length;i++){
      if(!AATypes.includes(taskList[i].AA_Types))
      {
        if(taskList[i].Sunday==="")
        {
          taskList[i].Sunday=0;
        }
        if(taskList[i].Monday==="")
        {
          taskList[i].Monday=0;
        }
        if(taskList[i].Tuesday==="")
        {
          taskList[i].Tuesday=0;
        }
        if(taskList[i].Wednesday==="")
        {
          taskList[i].Wednesday=0;
        }
        if(taskList[i].Thursday==="")
        {
          taskList[i].Thursday=0;
        }
        if(taskList[i].Friday==="")
        {
          taskList[i].Friday=0;
        }
        if(taskList[i].Saturday==="")
        {
          taskList[i].Saturday=0;
        }
        AATypes.push(taskList[i].AA_Types)
        Total=parseFloat(taskList[i].Sunday)+parseFloat(taskList[i].Monday)+parseFloat(taskList[i].Tuesday)+parseFloat(taskList[i].Wednesday)+parseFloat(taskList[i].Thursday)+parseFloat(taskList[i].Friday)+parseFloat(taskList[i].Saturday)
        if(Total===0)
     {
    logHrs=1;
   
     }
      }else{
  
        //validateAATypes=1;
        break;
  
      }
      }
  
 
    if(validateAATypes!==1 && logHrs!==1){

       db.query("select * from edittimesheet WHERE UserId=? AND Date=?",[id,myDate], function (err, TimeSheet) {
         if (err) throw err;
         console.log(TimeSheet+"TimeSheet")
         for(var i=0;i<TimeSheet.length;i++)
         {
         TimeSheetarr[i]=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types;



         }

         var CurrentDate = new Date();
         let CurrentDate1=""
   
         const submit=req.body.Submit
         
         if(submit==="Approval")
         {
          CurrentDate1=CurrentDate
         }
         else{
          CurrentDate1="*";
         }
       
       global.uid=req.body.id

       let DeleteArr=[];
       let DublicateEntry=[];
       let CreateEntry=[];
       let SickHrs=0;
       let VacationHrs=0;
       const len = taskList.length;
       let AA_Type=""
       let hrsgreaterthan24=0;
       let Weekends=0;
       let Sunday=0;
       let Monday=0;
       let Tuesday=0;
       let Wednesday=0;
       let Thursday=0;
       let Friday=0;
       let Saturday=0;
       let AA_Type_Sunday="";
       let AA_Type_Monday="";
       let AA_Type_Tuesday="";
       let AA_Type_Wednesday="";
       let AA_Type_Thursday="";
       let AA_Type_Friday="";
       let AA_Type_Saturday="";
       let WeekAA_Type="";
       var queries = '';
       
       let Create=0;
       let Update=0;
       let Holiday1=0;

       let SundayDate=req.body.myDate;
    
       var d = new Date(SundayDate)
       let MondayDate=new Date(d.setDate(d.getDate() + 1))
       MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekDates=[];




    

      
            db.query("SELECT * FROM holiday",function(err,holiday){
        
              try{
          for(var i=0;i<len;i++){

  if(taskList[i].Sunday===""){taskList[i].Sunday=0;}
  if(taskList[i].Monday===""){taskList[i].Monday=0;}
  if(taskList[i].Tuesday===""){taskList[i].Tuesday=0;}
  if(taskList[i].Wednesday===""){taskList[i].Wednesday=0;}
  if(taskList[i].Thursday===""){taskList[i].Thursday=0;}
  if(taskList[i].Friday===""){taskList[i].Friday=0;}
  if(taskList[i].Saturday===""){taskList[i].Saturday=0;}
  let WeekHrs=[taskList[i].Sunday,taskList[i].Monday,taskList[i].Tuesday,taskList[i].Wednesday,taskList[i].Thursday,taskList[i].Friday,taskList[i].Saturday]
  if(!DublicateEntry.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types))
  {
 
    DublicateEntry.push(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types)

  if(!TimeSheetarr.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types))
  {


Create=1;
   DeleteArr[i]=id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types;
   CreateEntry.push(new Array(id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",id,EmployeeGroup,"*","DENTSPLY",CurrentDate1));
  }
  else{

Update=1;

   DeleteArr[i]=id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types;
  queries += mysql.format("UPDATE edittimesheet SET UserId=?,Date=?,Country=?,Sunday=?,Cmt1=?,Monday=?,Cmt2=?,Tuesday=?,Cmt3=?,Wednesday=?,Cmt4=?,Thursday=?,Cmt5=?,Friday=?,Cmt6=?,Saturday=?,Cmt7=?,Submit=?,Location=?,AA_Types=?,Remarks=?,SubmittedBy=?,EmployeeGroup=?,Shift=?,Company=?,TimeStamp=? WHERE UserId=? AND Date=? AND Country=? AND Location=? AND AA_Types=?;",[id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",id,EmployeeGroup,"*","DENTSPLY",CurrentDate1,id,myDate,taskList[i].Country,taskList[i].Location,taskList[i].AA_Types])



 }
}

  if(parseFloat(taskList[i].Sunday)>24||parseFloat(taskList[i].Monday)>24||parseFloat(taskList[i].Tuesday)>24||parseFloat(taskList[i].Wednesday)>24||parseFloat(taskList[i].Thursday)>24||parseFloat(taskList[i].Friday)>24||parseFloat(taskList[i].Saturday)>24)
  {
    hrsgreaterthan24=1;
  }
  if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
  {

    for(let H=0;H<holiday.length;H++)
    {
    for(let W=0;W<WeekDays.length;W++)
    {
      let Arr=[];
    Arr=holiday[H].State.split(",")


      if((WeekDays[W]===holiday[H].Date))
      {
       if(WeekHrs[W]!==""&&WeekHrs[W]!=="0"&&WeekHrs[W]!==0)
       {
          Holiday1=1;

       }
      }
    }
  }
}
if(taskList[i].AA_Types==="Holiday")
  {
    let HolidayArr=[]
   let Arr=[];
    for(let H=0;H<holiday.length;H++)
    {
HolidayArr[H]=Moment(holiday[H].Date).format("MMM DD YYYY");
for(let W=0;W<WeekDays.length;W++)
{
if(WeekDays[W]===holiday[H].Date)
{
  Arr=holiday[H].State;
}
}


    }

   for(let W=0;W<WeekDays.length;W++)
   {

WeekDays[W]=Moment(WeekDays[W]).format("MMM DD YYYY");





      if(!(HolidayArr.includes(WeekDays[W])))
      {
   if(WeekHrs[W]!=="0"&&WeekHrs[W]!==""&&WeekHrs[W]!==0)
   {

          Holiday=1;
   }

      }
     
  }

}
  if(taskList[i].AA_Types==="Regular Hours")
  {

  Sunday=Sunday+parseFloat(taskList[i].Sunday);
  Monday=Monday+parseFloat(taskList[i].Monday);
  Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
  Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
  Thursday=Thursday+parseFloat(taskList[i].Thursday);
  Friday=Friday+parseFloat(taskList[i].Friday);
  Saturday=Saturday+parseFloat(taskList[i].Saturday);

  }
  else{
    if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
    {

    if(parseFloat(taskList[i].Sunday)!==0)
    {
      AA_Type_Sunday=taskList[i].AA_Types;
     Sunday=Sunday+parseFloat(taskList[i].Sunday);
    }
    if(parseFloat(taskList[i].Monday)!==0)
    {
      AA_Type_Monday=taskList[i].AA_Types;
    Monday=Monday+parseFloat(taskList[i].Monday);
    }
    if(parseFloat(taskList[i].Tuesday)!==0)
    {
      AA_Type_Tuesday=taskList[i].AA_Types;
    Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
    }
    if(parseFloat(taskList[i].Wednesday)!==0)
    {
      AA_Type_Wednesday=taskList[i].AA_Types;
    Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
    }
    if(parseFloat(taskList[i].Thursday)!==0)
    {
      AA_Type_Thursday=taskList[i].AA_Types;
    Thursday=Thursday+parseFloat(taskList[i].Thursday);
    }
   if(parseFloat(taskList[i].Friday)!==0)
   {
    AA_Type_Friday=taskList[i].AA_Types;
   Friday=Friday+parseFloat(taskList[i].Friday);
   }
   if(parseFloat(taskList[i].Saturday)!==0)
   {
    AA_Type_Saturday=taskList[i].AA_Types;
   Saturday=Saturday+parseFloat(taskList[i].Saturday);
   }
    }}


    if(taskList[i].AA_Types!=="Regular Hours"&&taskList[i].AA_Types!=="Holiday")
            {
        if(parseFloat(taskList[i].Sunday)>0||parseFloat(taskList[i].Saturday)>0)
        {
           Weekends=1;
           WeekAA_Type=taskList[i].AA_Types;

        }
      }
        if(taskList[i].AA_Types==="Bereavement"||taskList[i].AA_Types==="Jury Duty"||taskList[i].AA_Types==="Training"||taskList[i].AA_Types==="Travel")
        {
            if(taskList[i].Sunday==="8"||taskList[i].Sunday==="4"||taskList[i].Sunday===0||taskList[i].Sunday==="0")
      {



       }
       else{
        AA_Type=taskList[i].AA_Types
     
        SickHrs=1;

      }
     if(taskList[i].Monday==="8"||taskList[i].Monday==="4"||taskList[i].Monday===0||taskList[i].Monday==="0")
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
     if(taskList[i].Tuesday==="8"||taskList[i].Tuesday==="4"||taskList[i].Tuesday===0||taskList[i].Tuesday==="0" )
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
       if(taskList[i].Wednesday==="8"||taskList[i].Wednesday==="4"||taskList[i].Wednesday===0||taskList[i].Wednesday==="0")
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
         if(taskList[i].Thursday==="8"||taskList[i].Thursday==="4"||taskList[i].Thursday===0||taskList[i].Thursday==="0" )
        {

        }
        else{
          AA_Type=taskList[i].AA_Types
       
          SickHrs=1;
        }
           if(taskList[i].Friday==="8"||taskList[i].Friday==="4"||taskList[i].Friday===0||taskList[i].Friday==="0" )
          {

         }
         else{
          AA_Type=taskList[i].AA_Types
        
          SickHrs=1;
        }
          if(taskList[i].Saturday==="8"||taskList[i].Saturday==="4"||taskList[i].Saturday===0||taskList[i].Saturday==="0" )
         {

        }
        else{
          AA_Type=taskList[i].AA_Types
        
          SickHrs=1;
        }
      }
          }

       


          






        


				}
				catch(err){

				}
       
        let lo=0;
  var sql="insert into edittimesheet(UserId,Date,Country,Sunday,Cmt1,Monday,Cmt2,Tuesday,Cmt3,Wednesday,Cmt4,Thursday,Cmt5,Friday,Cmt6,Saturday,Cmt7,Submit,Location,AA_Types,Remarks,SubmittedBy,EmployeeGroup,Shift,Company,TimeStamp) VALUES?";

  if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
  {
 
 lo=1;
  }


 if(Weekends===1&&WeekAA_Type!=="Regular Hours"&&WeekAA_Type!=="Holiday")
      {
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"Except Regular Hours you can't be entered on Weekends"});
               }


       });
      }
     else if(Sunday>8&&(AA_Type_Sunday!=="Regular Hours"&&AA_Type_Sunday!==""&&AA_Type_Sunday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Sunday"});
               }


       });
      }
      else if(Monday>8&&(AA_Type_Monday!=="Regular Hours"&&AA_Type_Monday!==""&&AA_Type_Monday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Monday"});
               }


       });
      }
      else if(Tuesday>8&&(AA_Type_Tuesday!=="Regular Hours"&&AA_Type_Tuesday!==""&&AA_Type_Tuesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Tuesday"});
               }


       });
      }
      else if(Wednesday>8&&(AA_Type_Wednesday!=="Regular Hours"&&AA_Type_Wednesday!==""&&AA_Type_Wednesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Wednesday"});
               }


       });
      }
      else if(Thursday>8&&(AA_Type_Thursday!=="Regular Hours"&&AA_Type_Thursday!==""&&AA_Type_Thursday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Thursday"});
               }


       });
      }
      else if(Friday>8&&(AA_Type_Friday!=="Regular Hours"&&AA_Type_Friday!==""&&AA_Type_Friday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Friday"});
               }


       });
      }
      else if(Saturday>8&&(AA_Type_Saturday!=="Regular Hours"&&AA_Type_Saturday!==""&&AA_Type_Saturday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Saturday"});
               }


       });
      }
      else if(Monday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Monday"});
               }


       });
      }
      else if(Tuesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Tuesday"});
               }


       });
      }
      else if(Wednesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Wednesday"});
               }


       });
      }
      else if(Thursday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Thursday"});
               }


       });
      }
      else if(Friday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Friday"});
               }


       });
      }
      else if(Saturday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Saturday"});
               }


       });
      }
      else if(Sunday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Sunday"});
               }


       });
      }
 else if(hrsgreaterthan24===1)
 {
  flag=1;
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You have entered more than 24 Hrs on a Day"});
          }


  });
 }
 else if(Holiday===1)
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"No holidays in this current week"});
          }


  });
 }
 else if(Holiday1===1)
 {
  
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"You have holiday on this day so any other AA_Type not Allowed Expect Regular Hours"});
          }


  });
 }

 else if(SickHrs===1&&AA_Type!=="Regular Hours"&&AA_Type!=="Holiday")
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You need to enter 4Hrs OR 8Hrs per "+AA_Type});
          }


  });
 }
 
 else if(lo===1&&submit===1){
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"TimeSheet Successfully Saved for this Period"});
          }


  });
 }

 else if(lo===1&&(submit==="0"||submit==="Approval")){
console.log("hello123")
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"TimeSheet Successfully Submitted for this Period"});
          }


  });
 }

 if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
 {


   if(Update===1)
   {

  db.query(queries)
   }
  if(Create===1)
  {

 db.query(sql,[CreateEntry])
  }
  for(var i=0;i<TimeSheet.length;i++)
  {
    let key=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types;

    if(id===TimeSheet[i].UserId&&myDate.includes(TimeSheet[i].Date))
{

  if(!DeleteArr.includes(key))
  {
db.query("DELETE FROM edittimesheet WHERE UserId=? AND Date=? AND Location=? AND Country=? AND AA_Types=?",[id,myDate,TimeSheet[i].Location,TimeSheet[i].Country,TimeSheet[i].AA_Types])
  }
}
  }
  

 }

      })
   





  });}
  else if(validateAATypes===1){

    db.query("select count(*) from aa_types",(err,result)=>{
      if(result){

        return res.send({message:"Dublicate AA_Type"})


      }
    })

  }
  else if(logHrs===1){

    db.query("select count(*) from aa_types",(err,result)=>{
      if(result){

        return res.send({message:"You can't report Zero hours"})


      }
    })

  }});





  
  router.post("/jobInfo", (req, res) => {

    const tasklistJob=req.body.tasklistJob;
    const tasklistempInfo=req.body.tasklistempInfo;
    const tasklistaddress=req.body.tasklistaddress;
    const tasklistpayrollInfo=req.body.tasklistpayrollInfo;
    const loginid=req.body.id;
    const Employeeid=req.body.Empid;
    console.log(Employeeid+"Employeeid");
   // console.log(JSON.stringify(taskList)+"tasklist create deal")
    const myJSONJob=JSON.stringify(tasklistJob);
    const myObjJob = JSON.parse(myJSONJob);

    console.log(myJSONJob+"myJSONJob")

    const myJSONEmp=JSON.stringify(tasklistempInfo);
    const myObjEmp = JSON.parse(myJSONEmp);

    console.log(myJSONEmp+"myObjEmp")

    const myJSONAddress=JSON.stringify(tasklistaddress);
    const myObjAddress = JSON.parse(myJSONAddress);

    console.log(myJSONAddress+"myObjAddress")

    const myJSONPay=JSON.stringify(tasklistpayrollInfo);
    const myObjPay = JSON.parse(myJSONPay);

    console.log(myJSONPay+"myObjPay")

    let CreateEntry=[]

    var sql="insert into user(uid,cid,fname,lname,MiddleName,Email,pass,gender,mobile,Role,Status,EmployeeGroup,Reports_To,Country,HireDate,Department,EmailIDJob,AadharCard,DateOfBirth,ContactType,FullName,BloodGroup,HouseNo,Street,State,ZipCode,Countryaddress,HouseNoTemp,StreetTemp,StateTemp,ZipCodeTemp,CountryTemp,MonthlyCTC,YearlyCTC,BASICSALARY,HRA,CONVEYANCE,SPECIALALLOWANCE,MEDICALALLOWANCE,LTA,PF,Total,RESIGNATIONDATE,NOOFWORKINGDAYS,NOOFDAYSPRESENT,ABSENTDAYS,LOPDAYS,BASICPAY,GROSSSALARY,PT,ESI,ITDEDUCTION,TOTALDEDUCTIONS,NETTSALARY,ESIGNATIC,PAYMENTMODE,BANK,IFSCCODE,ACCOUNTNO,PANNUMBER,UANNO,ESIACCNO) VALUES?";
    CreateEntry.push(new Array(Employeeid,"CHACHAPOYA",(myObjJob.FirstName).toUpperCase(),myObjJob.LastName.toUpperCase(),myObjJob.MiddleName.toUpperCase(),myObjEmp.EmailID,"Test11@",myObjJob.Gender,myObjEmp.PhoneNumber,myObjJob.Position,myObjJob.Status,"EX",myObjJob.ReportingManager,"DENTSPLY",myObjJob.HireDate,myObjJob.Department,myObjJob.EmailIDJob,myObjJob.AadharCard,myObjJob.DateOfBirth,myObjEmp.ContactType,myObjEmp.FullName,myObjEmp.BloodGroup,myObjAddress.HouseNo,myObjAddress.Street,myObjAddress.State,myObjAddress.ZipCode,myObjAddress.Country,myObjAddress.HouseNoTemp,myObjAddress.StreetTemp,myObjAddress.StateTemp,myObjAddress.ZipCodeTemp,myObjAddress.CountryTemp,myObjPay.MonthlyCTC,myObjPay.YearlyCTC,myObjPay.BASICSALARY,myObjPay.HRA,myObjPay.CONVEIENCE,myObjPay.SPECIALALLOWANCE,myObjPay.MEDICALALLOWANCE,myObjPay.LTA,myObjPay.PF,myObjPay.Total,myObjPay.RESIGNATIONDATE,myObjPay.NOOFWORKINGDAYS,myObjPay.NOOFDAYSPRESENT,myObjPay.ABSENTDAYS,myObjPay.LOPDAYS,myObjPay.BASICPAY,myObjPay.GROSSSALARY,myObjPay.PT,myObjPay.ESI,myObjPay.ITDEDUCTION,myObjPay.TOTALDEDUCTIONS,myObjPay.NETTSALARY,myObjPay.ESIGNATIC,myObjPay.PAYMENTMODE,myObjPay.BANK,myObjPay.IFSCCODE,myObjPay.ACCOUNTNO,myObjPay.PANNUMBER,myObjPay.UANNO,myObjPay.ESIACCNO))


    db.query(sql,[CreateEntry],( err,result)=>{
    
        if(err)
          console.log(err)
        if(result)
        return  res.send({message:"Candidate Information Created"});
        })
     
       

    
  });

  router.get("/EmpEditInfo", async(req, res) => {

    const tasklist=req.query.tasklistJob;//tasklistJob
    
    //const myJSONJob=JSON.stringify(tasklist);
    const myObj = JSON.parse(tasklist);
    console.log("myObj "+myObj)
    console.log("myObj uid"+myObj.uid)
    db.query("UPDATE user SET uid=?,cid=?,fname=?,lname=?,MiddleName=?,Email=?,pass=?,gender=?,mobile=?,Role=?,Status=?,EmployeeGroup=?,Reports_To=?,Country=?,HireDate=?,Department=?,EmailIDJob=?,AadharCard=?,DateOfBirth=?,ContactType=?,FullName=?,BloodGroup=?,HouseNo=?,Street=?,State=?,ZipCode=?,Countryaddress=?,HouseNoTemp=?,StreetTemp=?,StateTemp=?,ZipCodeTemp=?,CountryTemp=?,MonthlyCTC=?,YearlyCTC=?,BASICSALARY=?,HRA=?,CONVEYANCE=?,SPECIALALLOWANCE=?,MEDICALALLOWANCE=?,LTA=?,PF=?,Total=?,RESIGNATIONDATE=?,NOOFWORKINGDAYS=?,NOOFDAYSPRESENT=?,ABSENTDAYS=?,LOPDAYS=?,BASICPAY=?,GROSSSALARY=?,PT=?,ESI=?,ITDEDUCTION=?,TOTALDEDUCTIONS=?,NETTSALARY=?,ESIGNATIC=?,PAYMENTMODE=?,BANK=?,IFSCCODE=?,ACCOUNTNO=?,PANNUMBER=?,UANNO=?,ESIACCNO=? WHERE uid=?",[myObj.uid,"CHACHAPOYA",myObj.fname,myObj.lname,myObj.MiddleName,myObj.Email,"Test11@",myObj.gender,myObj.mobile,myObj.Role,myObj.Status,"EX",myObj.Reports_To,myObj.Country,myObj.HireDate,myObj.Department,myObj.EmailIDJob,myObj.AadharCard,myObj.DateOfBirth,myObj.ContactType,myObj.FullName,myObj.BloodGroup,myObj.HouseNo,myObj.Street,myObj.State,myObj.ZipCode,myObj.Countryaddress,myObj.HouseNoTemp,myObj.StreetTemp,myObj.StateTemp,myObj.ZipCodeTemp,myObj.CountryTemp,myObj.MonthlyCTC,myObj.YearlyCTC,myObj.BASICSALARY,myObj.HRA,myObj.CONVEYANCE,myObj.SPECIALALLOWANCE,myObj.MEDICALALLOWANCE,myObj.LTA,myObj.PF,myObj.Total,myObj.RESIGNATIONDATE,myObj.NOOFWORKINGDAYS,myObj.NOOFDAYSPRESENT,myObj.ABSENTDAYS,myObj.LOPDAYS,myObj.BASICPAY,myObj.GROSSSALARY,myObj.PT,myObj.ESI,myObj.ITDEDUCTION,myObj.TOTALDEDUCTIONS,myObj.NETTSALARY,myObj.ESIGNATIC,myObj.PAYMENTMODE,myObj.BANK,myObj.IFSCCODE,myObj.ACCOUNTNO,myObj.PANNUMBER,myObj.UANNO,myObj.ESIACCNO,myObj.uid],function (err,empInfoDetails){
      if (err) throw err;
     
     if(empInfoDetails)
    return  res.send({message:"Employee Information Updated"});

    })

  })

  








  router.get("/empInfoEdit", (req, res) => {
    const uid=req.query.User;
    db.query( "SELECT * FROM user where uid=?",[uid], function (err, Employeeid) {
      if(Employeeid.length>0){
        
    
        console.log(JSON.stringify(Employeeid,"Employeeid11"));
        return  res.send({Employeeid});
      }else{
        return  res.send({message:"NO Candidate Information"+uid});
      }

    });



  });







  /*router.get("/pdashboard", (req, res) => {

    db.query( "SELECT ProjectName FROM deals", function (err, projectid) {
      if(projectid.length>0){
        console.log(JSON.stringify(projectid)+"Employeeid")
         
    

        return  res.send({projectid});
      }
    });

    



  });*/

  router.get("/pdashboard",(req,res)=>{
    db.query("SELECT * FROM deals",( err,result)=>{
      if(result){
       
        console.log(result,"result")
       // console.log(JSON.stringify(result),"result")

       // console.log()
         res.send(result);
  
  
      }
    })
  })
  

  router.get("/allProjects",(req,res)=>{
  
    db.query("SELECT * FROM projectdashboard",( err,result)=>{
      if(result){
       
        console.log(result,"result")
       // console.log(JSON.stringify(result),"result")

       // console.log()
         res.send(result);
  
  
      }
    })
  
  });

  router.get("/job_info", (req, res) => {
      db.query( "SELECT MAX(uid) as uid FROM user", function (err, Employeeid) {
        if(Employeeid.length>0){
          //console.log(JSON.stringify(Employeeid)+"Employeeid")
            var  uid=Employeeid[0].uid
            console.log(uid+"uid")
            var sid= parseInt(uid.substring(4,(uid.length)+1))+1
            console.log(sid+"sid");
            uid2=(uid.substring(0,4)).concat(sid)
            console.log(uid2+"uid2");
      

          return  res.send({uid2});
        }else{
          return  res.send("EACP901");
        }

      });
    })
    



    router.get("/phours",(req,res) =>{
      let tasklist=req.query.project;
      console.log(tasklist,"tasklist.project")
      db.query("SELECT Country,Location,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday FROM edittimesheet Where Location=?",[tasklist],function (err,result){
  
        if(err) throw err;
        if(result.length>0){
          console.log("edittimesheet: ",result)
          res.send(result)
        }
      })
  
    })


    router.get("/projectselectedit",(req,res)=>{
  
      db.query("SELECT ProjectName FROM projectdashboard",( err,result)=>{
        if(result){
         
          console.log(result,"result")
         // console.log(JSON.stringify(result),"result")
  
         // console.log()
           res.send(result);
    
    
        }
      })
    
    });





    router.get("/pselectdashboard",(req,res)=>{
  
      db.query("SELECT * FROM projectdashboard",( err,result)=>{
        if(result){
         
          console.log(result,"result444")
         // console.log(JSON.stringify(result),"result")
  
         // console.log()
           res.send(result);
    
    
        }
      })
    
    });





   /* router.get("/phours",(req,res) =>{
      let tasklist=req.query.project;
      console.log(tasklist,"tasklist.project")
      db.query("SELECT Country,Location,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday FROM edittimesheet Where Location=?",[tasklist],function (err,result){
  
        if(err) throw err;
        if(result.length>0){
          console.log("edittimesheet: ",result)
          res.send(result)
        }
      })
  
    })*/



    router.get("/projectupdate",(req,res)=>{

      let tasklist=req.query.tasklistJob;
  
      let Res=req.query.tasklistRes
  let pHrs=req.query.tasklistHrs
  console.log(pHrs,"phrs")
   const myObj = JSON.parse(tasklist);
      console.log("myObj "+myObj)
      console.log("myObj uid"+myObj.ClientName)
      const Resource1=JSON.stringify(Res)
      console.log(Resource1,"Resource1")
      const CreateEntry=[];
    
      db.query("UPDATE projectdashboard SET ClientName=?,ProjectName=?,Resources=?,ProjectStartDate=?,ProjectEndDate=?,Hours=?,HoursUsed=?,Status=?,PercentageCompleted=?,Comments=?,Showstopper=?,priority=? WHERE ClientName=? AND ProjectName=? AND ProjectStartDate=? AND ProjectEndDate=?",[myObj.ClientName,myObj.ProjectName,Resource1,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.Hours,pHrs,myObj.Status,myObj.PercentageCompleted,myObj.Comments,myObj.Showstopper,myObj.priority,myObj.ClientName,myObj.ProjectName,myObj.ProjectStartDate,myObj.ProjectEndDate],function (err,ProjectInfoDetails){
        if (err) throw err;
       
       if(ProjectInfoDetails)
      return  res.send({message:"Project Information Updated"});
  
      })
  
  
    });
  









    router.get("/projectedit", (req, res) => {
      let tasklist=req.query.tasklistJob;
  
      let Res=req.query.tasklistRes
  let pHrs=req.query.tasklistHrs
  console.log(pHrs,"phrs")
   const myObj = JSON.parse(tasklist);
      console.log("myObj "+myObj)
      console.log("myObj uid"+myObj.ClientName)
      const Resource1=JSON.stringify(Res)
      console.log(Resource1,"Resource1")
      const CreateEntry=[];
      var sql="insert into projectdashboard(ClientName,ProjectName,Resources,ProjectStartDate,ProjectEndDate,Hours,HoursUsed,Status,PercentageCompleted,Comments,Showstopper,priority) VALUES?";
      
      CreateEntry.push(new Array(myObj.ClientName.toUpperCase(),(myObj.ProjectName).toUpperCase(),Resource1,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.Hours,pHrs,myObj.Status,myObj.PerCompleted,myObj.Comments,myObj.Showstopper,myObj.priority)) 
  
        
          db.query(sql,[CreateEntry],( err,result)=>{
      
          if(err)
            console.log(err)
          if(result){
          return  res.send({message:"Project Information saved"});
          }
          })
  
  
    });








    router.get("/empedit", (req, res) => {

      db.query("SELECT uid,fname FROM user",( err,result)=>{
        if(result){
           res.send(result);
          console.log("result",JSON.stringify(result))
    
        }
        else{
           console.log(err);
        }
          })
    
        })
    

    

   
  router.get("/resources", (req, res) => {
    const userid=req.query.userid;
    console.log(userid+"  userid resources")
    db.query("SELECT * FROM deals", function (err, deals) {
      if (err) throw err;

      if(deals.length>0)
      {
//console.log("resource deals:",deals)
var Arr=[]
var clients=[]
        for(var i=0;i<deals.length;i++){
          
          var Resource = JSON.parse(deals[i].Resources)
            for(let j=0;j<Resource.length;j++){
              var Resource1 = Resource[j]
              console.log("Resource: ",Resource1)
              if(Resource1.id === userid){
                if(!(clients.includes(deals[i].ClientName))){
                  clients.push(deals[i].ClientName)
                }
                let obj = {ClientName:deals[i].ClientName,ProjectName:deals[i].ProjectName}
                console.log("obj",obj)
                Arr.push(obj)
              }
            }
        }
        console.log("Array of project resource: ",Arr)

        // const Arr=[]
        // for(let i=0;i<deals.length;i++)
        // Arr.push(JSON.parse(JSON.stringify(deals[i])))
        // console.log(Arr+"Arr");
         res.send({Clients:clients,Project:Arr})
      }
      else{

      }
    });
  });

  router.get("/clientAddress", (req, res) => {
    const userid=req.query.userid;
    console.log(userid+"  userid resources")
    db.query("SELECT * FROM deals", function (err, deals) {
      if (err) throw err;

      if(deals.length>0)
      {
//console.log("resource deals:",deals)
var Arr=[]
var clients=[]
        for(var i=0;i<deals.length;i++){


          if(!(clients.includes(deals[i].ClientName))){
            if(deals[i].AddressDetails !==""){
            let details = {Client:deals[i].ClientName,Address:deals[i].AddressDetails}
            clients.push(deals[i].ClientName)
            Arr.push(details)
          }
          }
     
        }
        console.log("Array of project resource: ",Arr)

        // const Arr=[]
        // for(let i=0;i<deals.length;i++)
        // Arr.push(JSON.parse(JSON.stringify(deals[i])))
        // console.log(Arr+"Arr");
        if(Arr.length>0){
          res.send(Arr)
        }
          else{
            res.send({message:"No Address Recorded for clients"})

          }
         
      }
      else{

      }
    });
  });


  router.post("/createdeal", (req, res) => {
    const taskList=req.body.tasklist;
    const myJSON=JSON.stringify(taskList);
    const myObj = JSON.parse(myJSON);


    const resources = req.body.resources;
    const myObj2 = JSON.stringify(resources)

    const address = req.body.address;
    const myObj3 = JSON.stringify(address)
    console.log("obj3",myObj3)
    
    // var resData

    //    for(var i=0;i<resources.length;i++){
        
    //      if(i===0){
    //        resData=resources[i].id+"-"+resources[i].Rate
  
    //      }else{
    //        resData=resData+","+resources[i].id+"-"+resources[i].Rate
    //      }
       

    //    }

    
    
    
    let CreateEntry=[];
    
   
    const l=0;

    db.query( "SELECT * FROM deals WHERE ClientName=? AND ProjectName=? AND DealType=? AND ProjectStartDate=? AND ProjectEndDate=? AND DealOwner=?",[myObj.ClientName,myObj.ProjectName,myObj.DealType,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.DealOwner], function (err, deal1) {
      if (err) throw err;

       if(deal1.length>0)
       {
        //res.send({message:"Already Deal Created"});
        console.log("dublicate")
       }
   else{

    var sql="insert into deals(ClientName,ProjectName,DealType,ClientContact,DealStage,ProjectStartDate,ProjectEndDate,Hours,SOWAmount,DealOwner,ClosedBy,Resources,AddressDetails,SourceCompany) VALUES?";
    
    CreateEntry.push(new Array(myObj.ClientName.toUpperCase(),(myObj.ProjectName).toUpperCase(),myObj.DealType,myObj.ClientContact.toUpperCase(),myObj.DealStage,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.Hours,myObj.SOWAmount,myObj.DealOwner,myObj.ClosedBy,myObj2,myObj3,myObj.SourceCompany)) 

      
        db.query(sql,[CreateEntry],( err,result)=>{
    
        if(err)
          console.log(err)
        if(result){
        return  res.send({message:"Deal Created"});
        }
        })
      }
     
  });


  });

 

 router.get("/users",(req,res)=>{
   

   db.query("SELECT uid,cid,fname,lname,Role,Status from user where Status=?",["A"],function(err,result){
     if(err) throw err;
     if(result.length>0){
       console.log("user result:",result)
       res.send(result)
     }
   })
 })


  router.get("/allDeals",(req,res) =>{
    db.query("SELECT * FROM deals",function (err,result){

      if(err) throw err;
      if(result.length>0){
        console.log("deals: ",result[0])
        res.send(result)
      }
    })
  })

  router.get("/myDeals",(req,res) =>{
    var userId = req.query.id;
    db.query("SELECT * FROM deals where DealOwner=?",[userId],function (err,result){

      if(err) throw err;
      if(result.length>0){
        let dealOwner= []
        let clientName=[]
        let projectName=[]
        let clientContact=[]
        for(let i=0;i<result.length;i++){
        
          if(!dealOwner.includes(result[i].DealOwner)){
            clientName.push(result[i].ClientName)
          }

          }
        
        res.send(result)
      }
    })
  })

  router.post("/updatedeal", (req, res) => {
    const taskList=req.body.tasklist;
    const myJSON=JSON.stringify(taskList);
    const myObj = JSON.parse(myJSON);

    const resources = req.body.resources;
    const myObj2 = JSON.stringify(resources)

    const address = req.body.address;
    const myObj3 = JSON.stringify(address)


    // var resData
    // for(var i=0;i<resources.length;i++){
     
    //   if(i===0){
    //     resData=resources[i].id+"-"+resources[i].Rate

    //   }else{
    //     resData=resData+","+resources[i].id+"-"+resources[i].Rate
    //   }
    

    // }
    
    

         db.query("UPDATE deals SET ClientName=?,ProjectName=?,DealType=?,ClientContact=?,DealStage=?,ProjectStartDate=?,ProjectEndDate=?,Hours=?,SOWAmount=?,DealOwner=?,ClosedBy=?,Resources=?,AddressDetails=?,SourceCompany=? WHERE ClientName=? AND ProjectName=? AND ProjectStartDate=? AND ProjectEndDate=? AND DealOwner=?;",[myObj.ClientName.toUpperCase(),myObj.ProjectName.toUpperCase(),myObj.DealType,myObj.ClientContact,myObj.DealStage,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.Hours,myObj.SOWAmount,myObj.DealOwner,myObj.ClosedBy,myObj2,myObj3,myObj.SourceCompany,myObj.ClientName,myObj.ProjectName,myObj.ProjectStartDate,myObj.ProjectEndDate,myObj.DealOwner],function (err,updateDeal){
          if (err) throw err;
          if(err)
          console.log(err)
        if(updateDeal)
        return  res.send({message:"Deal Updated"});

        })
        
           


  });



//Invoices
router.get("/selectClients",(req,res)=>{
   
  db.query("SELECT ClientName,ProjectName,Resources,SourceCompany from deals", function(err,deals){
    if(err) throw err;
    if(deals.length>0){
    
      let clients = []
      let Arr=[]
      for(let i=0;i<deals.length;i++){
        if(!(Arr.includes(deals[i].ClientName))){
          let details={client:deals[i].ClientName,SourceCompany:deals[i].SourceCompany}
          Arr.push(deals[i].ClientName)
            clients.push(details)
        }
      }
      console.log("clients:",clients)
        res.send(clients)
    }else{
      res.send({message:"No Deals Recorded"})
    }
  })
})


//Inovice Creation Code
router.post("/createInvoice",(req,res)=>{
   const {Year} = req.body.Data
   var Client =  req.body.Data.Client.split("-")[0]
  
   var Month = req.body.Data.Month
   if(Month){
     Month = Month.substring(0,3)
   }

  var clientContact;
  var clientAddress;

   var invoiceNumber;

  db.query("SELECT ProjectName,Resources,SOWAmount,AddressDetails,ClientContact from deals where ClientName=?",[Client],function(err,dealsdata){
    if(dealsdata.length>0){
      clientContact = dealsdata[0].ClientContact
      clientAddress = dealsdata[0].Address
    }
  
    db.query("SELECT * FROM zl_table where Time_Type=? and Country=? and left(Date,3)=? and right(Date,4)=?",["ST",Client,Month,Year],function(err,zldata){
     
      db.query("SELECT No from invoice where Client=?",Client,function(err,invoiceNo){

        db.query("SELECT uid,fname from user",function(err,userdata){
          console.log("use data: ",userdata)

      if(invoiceNo.length>0){
        invoiceNumber = invoiceNo[0].No + 1

      }else{
        invoiceNumber=01
      }

      console.log("invoice1",invoiceNumber)

      if(zldata.length>0){
      var outPutData = []
      var clientTotal = 0.0;
    for(let i=0;i<dealsdata.length;i++){

      //Below resourceHours function returns Project related Resources Data and ProjectTotal Amount
      var {resourceData, ProjectTotalAmount} =  invoiceFunction.resourceHours(dealsdata[i].Resources,dealsdata[i].ProjectName,zldata,userdata)
     
      clientTotal = clientTotal+parseFloat(ProjectTotalAmount)
      var projectData = {ProjectName:dealsdata[i].ProjectName,SOWAmount:dealsdata[i].SOWAmount,Data:resourceData,ProjectTotal:ProjectTotalAmount}
      if(projectData.ProjectTotal>0){
        outPutData.push(projectData)
      }
    
      
    }
   
    return res.send({OutPutData:outPutData,
                    ClientTotal:clientTotal,
                    InvoiceNumber:invoiceNumber,
                    ClientContact:clientContact,
                    ClientAddress:clientAddress
                  })
  }else{
    return res.send({message:"No Hours Recorded so,Can't Create Invoice"})
  }


})
})
    })
  
  
  })

})

router.post("/invoiceNoUpdate",(req,res)=>{
  var invoiceNumber = req.body.InvoiceNumber;
  var client = req.body.ClientName;
  console.log("client no",invoiceNumber,client)

  var query;
  let CreateEntry=[];
  CreateEntry.push(new Array(invoiceNumber,client)) 

  if(invoiceNumber === 1){
    query = "insert into invoice(No,Client) VALUES?";
    db.query(query,[CreateEntry],function(err,result){
      console.log("insert",result)
    })


  }else{
    query = "UPDATE invoice SET No=? where Client=?"
    console.log("client no",invoiceNumber,query,client)
  db.query("UPDATE invoice SET No=? where Client=?",[invoiceNumber,client],function(err,result){
    console.log("update",result)
  })
  }
  


})




router.post("/createtimesheet", (req, res) => {
  var TimeSheetarr=[];
  let k=0;
  let l=0;
  let j=0;
 
  let Total=0;
  let logHrs=0;
    const taskList=req.body.taskList;
    const len = taskList.length;
    const myDate=req.body.myDate;
    const id=req.body.id;
    const submit=req.body.Submit;
   









    var AATypes = []
    var validateAATypes = 0
    for(let i=0;i<taskList.length;i++){
    if(!AATypes.includes(taskList[i].AA_Types))
    {
      if(taskList[i].Sunday==="")
      {
        taskList[i].Sunday=0;
      }
      if(taskList[i].Monday==="")
      {
        taskList[i].Monday=0;
      }
      if(taskList[i].Tuesday==="")
      {
        taskList[i].Tuesday=0;
      }
      if(taskList[i].Wednesday==="")
      {
        taskList[i].Wednesday=0;
      }
      if(taskList[i].Thursday==="")
      {
        taskList[i].Thursday=0;
      }
      if(taskList[i].Friday==="")
      {
        taskList[i].Friday=0;
      }
      if(taskList[i].Saturday==="")
      {
        taskList[i].Saturday=0;
      }
      AATypes.push(taskList[i].AA_Types)
      Total=parseFloat(taskList[i].Sunday)+parseFloat(taskList[i].Monday)+parseFloat(taskList[i].Tuesday)+parseFloat(taskList[i].Wednesday)+parseFloat(taskList[i].Thursday)+parseFloat(taskList[i].Friday)+parseFloat(taskList[i].Saturday)
      if(Total===0)
      {
        logHrs=1;
       
      }
    }else{

     // validateAATypes=1;
      break;

    }
    }
    




  if(validateAATypes!==1 && logHrs!==1){
   db.query( "SELECT * FROM edittimesheet WHERE UserId=? AND Date=?",[id,myDate], function (err, TimeSheet) {
        if (err) throw err;

         if(TimeSheet.length>0)
         {
           l=1;
         }
     else{

     }



       let EmployeeGroup=req.body.EmployeeGroup;

       const submit=req.body.Submit
     
    
       let CreateEntry=[];
       let SickHrs=0;
       let VacationHrs=0;

       let AA_Type=""
       let hrsgreaterthan24=0;
       let Weekends=0;
       let Sunday=0;
       let Monday=0;
       let Tuesday=0;
       let Wednesday=0;
       let Thursday=0;
       let Friday=0;
       let Saturday=0;
       let AA_Type_Sunday="";
       let AA_Type_Monday="";
       let AA_Type_Tuesday="";
       let AA_Type_Wednesday="";
       let AA_Type_Thursday="";
       let AA_Type_Friday="";
       let AA_Type_Saturday="";
       let WeekAA_Type="";

      let Holiday=0;
      let Holiday1=0;

       let SundayDate=req.body.myDate;
       var d = new Date(SundayDate)
       let MondayDate=new Date(d.setDate(d.getDate() + 1))
       MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekDates=[];

    

    
            db.query("SELECT * FROM holiday",function(err,holiday){
            
            try{
          for(var i=0;i<taskList.length;i++){

  if(taskList[i].Sunday===""){taskList[i].Sunday=0;}
  if(taskList[i].Monday===""){taskList[i].Monday=0;}
  if(taskList[i].Tuesday===""){taskList[i].Tuesday=0;}
  if(taskList[i].Wednesday===""){taskList[i].Wednesday=0;}
  if(taskList[i].Thursday===""){taskList[i].Thursday=0;}
  if(taskList[i].Friday===""){taskList[i].Friday=0;}
  if(taskList[i].Saturday===""){taskList[i].Saturday=0;}

  let WeekHrs=[taskList[i].Sunday,taskList[i].Monday,taskList[i].Tuesday,taskList[i].Wednesday,taskList[i].Thursday,taskList[i].Friday,taskList[i].Saturday]
  if(l!==1)
 {
     CreateEntry.push(new Array(id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,id,EmployeeGroup,"*","DENTSPLY","*"));
      k++;}

    if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
    {

      for(let H=0;H<holiday.length;H++)
      {
      for(let W=0;W<WeekDays.length;W++)
      {
       


        if((WeekDays[W]===holiday[H].Date))
        {
         if(WeekHrs[W]!==""&&WeekHrs[W]!=="0"&&WeekHrs[W]!==0)
         {
            Holiday1=1;

         }
        }
      }
    }
  }
  if(taskList[i].AA_Types==="Holiday")
    {
      let HolidayArr=[]
    
      for(let H=0;H<holiday.length;H++)
      {
HolidayArr[H]=Moment(holiday[H].Date).format("MMM DD YYYY");



      }

     for(let W=0;W<WeekDays.length;W++)
     {

  WeekDays[W]=Moment(WeekDays[W]).format("MMM DD YYYY");





        if(!(HolidayArr.includes(WeekDays[W])))
        {
     if(WeekHrs[W]!=="0"&&WeekHrs[W]!==""&&WeekHrs[W]!==0)
     {

            Holiday=1;
     }

        }
       
    

    }

  }

  if(parseFloat(taskList[i].Sunday)>24||parseFloat(taskList[i].Monday)>24||parseFloat(taskList[i].Tuesday)>24||parseFloat(taskList[i].Wednesday)>24||parseFloat(taskList[i].Thursday)>24||parseFloat(taskList[i].Friday)>24||parseFloat(taskList[i].Saturday)>24)
  {
    hrsgreaterthan24=1;
  }
  if(taskList[i].AA_Types==="Regular Hours"||taskList[i].AA_Types==="Holiday")
  {

  Sunday=Sunday+parseFloat(taskList[i].Sunday);
  Monday=Monday+parseFloat(taskList[i].Monday);
  Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
  Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
  Thursday=Thursday+parseFloat(taskList[i].Thursday);
  Friday=Friday+parseFloat(taskList[i].Friday);
  Saturday=Saturday+parseFloat(taskList[i].Saturday);

  }
  else {
 if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
 {

    if(parseFloat(taskList[i].Sunday)!==0)
    {
      AA_Type_Sunday=taskList[i].AA_Types;
     Sunday=Sunday+parseFloat(taskList[i].Sunday);
    }
    if(parseFloat(taskList[i].Monday)!==0)
    {
      AA_Type_Monday=taskList[i].AA_Types;
    Monday=Monday+parseFloat(taskList[i].Monday);
    }
    if(parseFloat(taskList[i].Tuesday)!==0)
    {
      AA_Type_Tuesday=taskList[i].AA_Types;
    Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
    }
    if(parseFloat(taskList[i].Wednesday)!==0)
    {
      AA_Type_Wednesday=taskList[i].AA_Types;
    Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
    }
    if(parseFloat(taskList[i].Thursday)!==0)
    {
      AA_Type_Thursday=taskList[i].AA_Types;
    Thursday=Thursday+parseFloat(taskList[i].Thursday);
    }
   if(parseFloat(taskList[i].Friday)!==0)
   {
    AA_Type_Friday=taskList[i].AA_Types;
   Friday=Friday+parseFloat(taskList[i].Friday);
   }
   if(parseFloat(taskList[i].Saturday)!==0)
   {
    AA_Type_Saturday=taskList[i].AA_Types;
   Saturday=Saturday+parseFloat(taskList[i].Saturday);
   }
    }


            if(taskList[i].AA_Types!=="Regular Hours"&&taskList[i].AA_Types!=="Holiday")
            {
        if(parseFloat(taskList[i].Sunday)>0||parseFloat(taskList[i].Saturday)>0)
        {
           Weekends=1;
           WeekAA_Type=taskList[i].AA_Types;

        }
      }
      if(taskList[i].AA_Types==="Bereavement"||taskList[i].AA_Types==="Jury Duty"||taskList[i].AA_Types==="Training"||taskList[i].AA_Types==="Travel")
      {

            if(taskList[i].Sunday==="8"||taskList[i].Sunday==="4"||taskList[i].Sunday===0||taskList[i].Sunday==="0")
      {



       }
       else{
        AA_Type=taskList[i].AA_Types
     
        SickHrs=1;

      }
     if(taskList[i].Monday==="8"||taskList[i].Monday==="4"||taskList[i].Monday===0||taskList[i].Monday==="0")
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
     if(taskList[i].Tuesday==="8"||taskList[i].Tuesday==="4"||taskList[i].Tuesday===0||taskList[i].Tuesday==="0" )
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
       if(taskList[i].Wednesday==="8"||taskList[i].Wednesday==="4"||taskList[i].Wednesday===0||taskList[i].Wednesday==="0")
      {

      }
      else{
        AA_Type=taskList[i].AA_Types
      
        SickHrs=1;
      }
         if(taskList[i].Thursday==="8"||taskList[i].Thursday==="4"||taskList[i].Thursday===0||taskList[i].Thursday==="0" )
        {

        }
        else{
          AA_Type=taskList[i].AA_Types
      
          SickHrs=1;
        }
           if(taskList[i].Friday==="8"||taskList[i].Friday==="4"||taskList[i].Friday===0||taskList[i].Friday==="0" )
          {

         }
         else{
          AA_Type=taskList[i].AA_Types
        
          SickHrs=1;
        }
          if(taskList[i].Saturday==="8"||taskList[i].Saturday==="4"||taskList[i].Saturday===0||taskList[i].Saturday==="0" )
         {

        }
        else{
          AA_Type=taskList[i].AA_Types
         
          SickHrs=1;
        }
          }

  }






        }



				}catch(err){
				}
      var sql="insert into edittimesheet(UserId,Date,Country,Sunday,Cmt1,Monday,Cmt2,Tuesday,Cmt3,Wednesday,Cmt4,Thursday,Cmt5,Friday,Cmt6,Saturday,Cmt7,Submit,Location,AA_Types,SubmittedBy,EmployeeGroup,Shift,Company,TimeStamp) VALUES?";



      if(Weekends===1&&WeekAA_Type!=="Regular Hours"&&WeekAA_Type!=="Holiday")
      {
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"Except Regular Hours you can't be entered on Weekends"});
               }


       });
      }
     else if(Sunday>8&&(AA_Type_Sunday!=="Regular Hours"&&AA_Type_Sunday!==""&&AA_Type_Sunday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Sunday"});
               }


       });
      }
      else if(Monday>8&&(AA_Type_Monday!=="Regular Hours"&&AA_Type_Monday!==""&&AA_Type_Monday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Monday"});
               }


       });
      }
      else if(Tuesday>8&&(AA_Type_Tuesday!=="Regular Hours"&&AA_Type_Tuesday!==""&&AA_Type_Tuesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Tuesday"});
               }


       });
      }
      else if(Wednesday>8&&(AA_Type_Wednesday!=="Regular Hours"&&AA_Type_Wednesday!==""&&AA_Type_Wednesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Wednesday"});
               }


       });
      }
      else if(Thursday>8&&(AA_Type_Thursday!=="Regular Hours"&&AA_Type_Thursday!==""&&AA_Type_Thursday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Thursday"});
               }


       });
      }
      else if(Friday>8&&(AA_Type_Friday!=="Regular Hours"&&AA_Type_Friday!==""&&AA_Type_Friday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Friday"});
               }


       });
      }
      else if(Saturday>8&&(AA_Type_Saturday!=="Regular Hours"&&AA_Type_Saturday!==""&&AA_Type_Saturday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Saturday"});
               }


       });
      }
      else if(Monday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Monday"});
               }


       });
      }
      else if(Tuesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Tuesday"});
               }


       });
      }
      else if(Wednesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Wednesday"});
               }


       });
      }
      else if(Thursday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Thursday"});
               }


       });
      }
      else if(Friday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Friday"});
               }


       });
      }
      else if(Saturday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Saturday"});
               }


       });
      }
      else if(Sunday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Sunday"});
               }


       });
      }
 else if(hrsgreaterthan24===1)
 {
  flag=1;
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You have entered more than 24 Hrs on a Day"});
          }


  });
 }
 else if(Holiday===1)
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"No holidays in this current week"});
          }


  });
 }
 else if(Holiday1===1)
 {
  
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"You have holiday on this day so any other AA_Type not Allowed Expect Regular Hours"});
          }


  });
 }

 else if(SickHrs===1&&AA_Type!=="Regular Hours"&&AA_Type!=="Holiday")
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You need to enter 4Hrs OR 8Hrs per "+AA_Type});
          }


  });
 }
   else if(k>0)
   {

     db.query(sql,[CreateEntry],
      (err,result)=>{

         if(result){
          // res.send({message:"Data Inserted Successfully"});


    if(l===1)
   {
     j=1;

  return  res.send({message:"Timesheet already submitted for this period"});
    }
    else{

    return  res.send({message:"Timesheet saved for this period"});
    }
   }
   else{
     console.log(err)
   }
  }
   );

       }

    else if(j===0&&l===1)
       {

        db.query("select * from edittimesheet", function (err, result) {
          if(result){

          return  res.send({message:"Timesheet already submitted for this period"});
                }


        });
       }

      })  }) 
  }
    else if(validateAATypes===1){

      db.query("select count(*) from aa_types",(err,result)=>{
        if(result){

          return res.send({message:"Dublicate AA_Type"})


        }
      })

    }
    else if(logHrs===1){

      db.query("select count(*) from aa_types",(err,result)=>{
        if(result){

          return res.send({message:"You can't report Zero hours"})


        }
      })

    }
  })




  router.get("/TimeSheetSelect", (req, res) => {
    let id=req.query.a;
   let Role=req.query.Role;
    let WeekDate=req.query.myDate
let country=req.query.country
  console.log(id,Role,WeekDate,country+"timesheetselect")
 if(Role==="Admin")
 {
  db.query("select * from edittimesheet WHERE UserId=? AND Date=? AND SubmittedBy=?;select * from edittimesheet WHERE UserId=? AND Date=?",[id,WeekDate,"Admin",id,WeekDate], function (err, result) {

    if(result[0].length>0){

      res.send(result[0]);
     console.log("result",result[0])
          }
         else if(result[1].length>0){

            res.send(result[1]);
           console.log("result",result[1])
                }
          else{
              res.send({message:"Already Project Exited"});
          }


  });
}
else
{
  db.query("select * from edittimesheet WHERE UserId=? AND Date=?",[id,WeekDate], function (err, result) {

    if(result.length>0){
console.log(result,"result")
      res.send(result);

          }
          else{
              res.send({message:"Already Project Exited"});
          }


  });
}
});


  router.post("/holiday",(req,res)=>{
    const hdate=req.body.myDate
    let matched_date=""
    let matched_day=""
    let SundayDate=req.body.myDate;
    let country=req.body.country
console.log("countryHoliday",country)
var d = new Date(SundayDate)
let MondayDate=new Date(d.setDate(d.getDate() + 1))
MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekDates=[];
let jl=0;
    for(let Days=0;Days<7;Days++)
   {
     if(!WeekDates.includes(WeekDays[Days].substring(7,11)))
     {
       WeekDates[jl]=WeekDays[Days].substring(7,11)
       jl++;;

     }
     }

   const holidays = []
    db.query("select * from holiday", function (err, holiday)  {

     let Arr=[],holidesc=[]
      for(let i=0;i<holiday.length;i++)
      {
        for(let j=0;j<WeekDays.length;j++)
        {

          if(holiday[i].Date===WeekDays[j])
          {



           const hol ={HolidayDate:holiday[i].Date,Desc:holiday[i].HolidayDescription,states:holiday[i].State}
           holidays.push(hol)
             matched_date=holiday[i].Date
            matched_day=j;
            Arr.push(matched_day)
            holidesc.push(holiday[i].HolidayDescription)

          }


       }
      }

      res.send(holidays)
    })
    })





 //AA_Types
 router.get("/aa_types",async(req,res)=>{
 let Country=req.query.Country;
console.log("country",Country)
  db.query("SELECT * FROM aa_types",( err,result)=>{
  if(result){
  res.send(JSON.stringify(result));

  }
  else{
  console.log(err);
  }
  })

  })


  router.get("/idsdropdown",(req,res)=>{
    let country = req.query.Country;
    let user = req.query.User;
    let role = req.query.Role;



    if(role === "Super Admin"||role === "Admin"){
      db.query("SELECT uid,fname,HireDate,EmployeeGroup FROM user",( err,result)=>{
        if(result){
           res.send(result);


        }
        else{
           console.log(err);
        }
          })

    }else{
      db.query("SELECT uid,fname FROM user where (Reports_To=? or uid=?)",[user,user],( err,result)=>{
    if(result){
       res.send(result);


    }
    else{
       console.log(err);
    }
      })

    }

    })



//ApprovalTimeSheet
router.post("/ApprovalTimeSheet", (req, res) => {
  let taskList=req.body.taskList;
 let submit=req.body.Submit;
 let id=req.body.id;
 let count=0;
 let F=0;
 var CurrentDate = new Date();
 let CurrentDate1=""

 if(submit==="Approval")
 {
  CurrentDate1=CurrentDate
 }
 else
 {
  CurrentDate1="*"
 }
 //  CurrentDate=Moment(CurrentDate).format("MMM DD YYYY")

for(let i=0;i<taskList.length;i++)
{
 if(taskList[i].Checked===true)
 {
F=1;
 }
  if(submit==="Reject"&&taskList[i].Checked===true&&(taskList[i].Remarks===""||taskList[i].Remarks===null))
  {
    count=1;
  }


 if(count!==1&&taskList[i].Checked===true)
 {
 

db.query("UPDATE edittimesheet SET Submit=?,Remarks=?,SubmittedBy=?,TimeStamp=? WHERE UserId=? AND Date=?",[submit,taskList[i].Remarks,id,CurrentDate1,taskList[i].UserId,taskList[i].Date])
 let mail1Reject=[];var uid1=[];array1=[],array2=[];

(taskList[i].UserId+"  taskList[i].UserId"+taskList[i].Date+"tasklist[i].Date")



// db.query("select edittimesheet.UserId,edittimesheet.Submit,edittimesheet.Date,user.uid,user.email from edittimesheet INNER JOIN user on edittimesheet.UserId=user.uid where Submit='Reject' AND UserId=? AND Date=?",[taskList[i].UserId,taskList[i].Date],function(err,resultReject){
// consoleconsole.log.log("result reject   "+JSON.stringify(resultReject));

//   for(let i=0;i<resultReject.length;i++)
//   mail1Reject[i]=resultReject[i].email

//   console.log(mail1Reject+"  mail all  Reject");



//       const PASSWORD = 'fbgjqrwmzgrytztz';

//         async function send365Email(from, to, subject, html, text) {
//           try {
//               const transportOptions = {
//                   host: 'smtp.office365.com',
//                   port: '587',
//                   auth: { user: from, pass: PASSWORD },
//                   secureConnection: true,
//                   tls: { ciphers: 'SSLv3' }
//               };
//               console.log("credntials reject");
//               const mailTransport = nodemailer.createTransport(transportOptions);

//               await mailTransport.sendMail({
//                   from,
//                   to,
//                   replyTo: from,
//                   subject,
//                   html,
//                   text

//               });

//           } catch (err) {
//               console.error(`send365Email: An error occurred:`, err);
//           }
//         }


//       cron.schedule('* * * * *', () => {//minutes,hours,month,year,day 24hrs time format

//         send365email("durga.avala@rizing.com",mail1Reject, "Timesheet Rejected", "<h5>"+Your+" "+taskList[i].Date+"Timesheet Rejected"+"</h5>", "Hello World");


//         });





//         });
    };









}
if(F===0)
{

db.query("select * from edittimesheet", function (err, result) {

  if(result){

    return  res.send({message:"Please Select anyone of them"});
        }

      })

    }
else if(count===1)
{

db.query("select * from edittimesheet", function (err, result) {

  if(result){

    return  res.send({message:"Please fill the Remarks field"});
        }

      })

    }
    else
    {
    db.query("select * from edittimesheet", function (err, result) {

      if(result.length>0){

        res.send(result);

            }
            else{
                res.send({message:"Already Project Exited"});
            }
          })

        }

});


router.get("/User",(req,res)=>{
  let country=req.query.country;
  console.log("country",country)
      db.query("SELECT * FROM user",( err,result)=>{
      if(result){
      res.send(JSON.stringify(result));

      }
      else{
      console.log(err);
      }
      })

      })



router.get("/UserDashBoardApproval",(req,res)=>{
    let id=req.query.a;
    let country=req.query.country;
    let Arr=[ 0, 1, 'Reject' ]
   db.query("SELECT * FROM edittimesheet WHERE UserId=? AND Submit=? ",[id,"0"],( err,result)=>{
   if(result){
   res.send(JSON.stringify(result));

   }
   else{
   console.log(err);
   }
   })

   })






router.get("/UserDashBoardSubmit",(req,res)=>{
    let id=req.query.a;
    let country=req.query.country

   
   db.query("SELECT * FROM edittimesheet WHERE UserId=? AND Submit=?  ",[id,"1"],( err,result)=>{
   if(result){
   res.send(JSON.stringify(result));

   }
   else{
   console.log(err);
   }
   })

   })



//User DashBoard

 router.get("/UserDashBoard",(req,res)=>{
   let id=req.query.a;


   let Arr=[ 0, 1, 'Reject' ]
  db.query("SELECT * FROM edittimesheet WHERE UserId=? AND Submit=? ",[id,"Reject"],( err,result)=>{
  if(result){
  res.send(JSON.stringify(result));
  console.log("result",result)
  }
  else{
  console.log(err);
  }
  })

  })

//ManagerApproval
router.get("/ManagerApproval", (req, res) => {
  let id=req.query.a;



db.query("select * from user WHERE Reports_To=?",[id],function(err,result1)
{

if(result1.length>0)
{
  let Arr=[];
  for(let i=0;i<result1.length;i++)
  {

Arr[i]=result1[i].uid;
  }

db.query("SELECT edittimesheet.*,user.fname,user.Reports_To FROM edittimesheet INNER JOIN user ON edittimesheet.UserId =user.uid WHERE edittimesheet.UserId in (?) AND edittimesheet.Submit=?",[Arr,"0"], function (err, result) {

  if(result.length>0){

    res.send(result);

        }
        else{
            res.send({message:"Already Project Exited"});
        }
      })
    }
});
});


//Mail Notifications

let mail=[];var uid=[];array1=[],array2=[];
var CurrentDate = new Date();
var CurrentWeekDay = CurrentDate.getDay();

var CurrentWeekDate = new Date(
new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
);


var CurrentWeekDate = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0)).toDateString();
CurrentWeekDate=CurrentWeekDate.substring(4,15);

/*
db.query("select edittimesheet.UserId,edittimesheet.Submit,edittimesheet.Date,user.uid,user.email from edittimesheet INNER JOIN user on edittimesheet.UserId=user.uid where Submit='1'and Date=?",[CurrentWeekDate],function(err,result){
console.log(JSON.stringify(result)+"result")
if(result.length>0)
{
for(let i=0;i<result.length;i++)
mail[i]=result[i].email

console.log(mail+" mail all 1329");





const PASSWORD = 'Durgakalyan';
const from="durga.avala@outlook.com"
const to=mail;
const subject="Timesheet submit pending"
const html="<h5>"+CurrentWeekDate+" "+"Timesheet submit pending</h5>"



cron.schedule('* * * * friday', () => {//minutes,hours,month,year,day 24hrs time format
console.log('running a task every Friday Consultent');

try {
const transportOptions = {
host: 'smtp.office365.com',
port: '587',
auth: { user: from, pass: PASSWORD },
secureConnection: true,
tls: { ciphers: 'SSLv3' }
};

const mailTransport = nodemailer.createTransport(transportOptions);

mailTransport.sendMail({
from,
to,
replyTo: from,
subject,
html
//text

});
console.log("credntials");
} catch (err) {
console.error(`send365Email: An error occurred:`, err);
}


// send365email111("durga.avala@outlook.com",mail, "Timesheet submit pending", "<h5>"+CurrentWeekDate+" "+"Timesheet submit pending</h5>", "Hello World");


});
//send365email11("durga.avala@outlook.com",mail,"Timesheet Submit pending","<h5>"+CurrentWeekDate+" "+"Timesheet Submit pending</h5>","Hellow world");
}
});

let Reports_id=[],userId=[];


db.query("select edittimesheet.UserId,edittimesheet.Submit,edittimesheet.Date,user.uid,user.Email,user.Reports_To from edittimesheet INNER JOIN user on edittimesheet.UserId=user.uid where Submit='0'AND Date=?",[CurrentWeekDate],function(err,result){
db.query("Select distinct user.uid as Reports_To,user.email from user where user.Role='Manager'", function (err, result1) {
if(result.length>0)
{
let UserIds=[]
let Dublicate=[]
for(let k=0;k<result.length;k++)
{
if(!Dublicate.includes(result[k].UserId))
{
Dublicate.push(result[k].UserId)
}
}
console.log("Dublicate",Dublicate)
console.log(JSON.stringify(result)+"result")
let Maillist=[];
let k=0;

for(var i=0;i<result.length;i++){
Reports_id[i]=result[i].Reports_To;
userId[i]=result[i].uid;
}

console.log(Reports_id+" Reports_id");
var count=0,count1=0;
for(var i=0;i<result1.length;i++){
console.log("Reports_id[i]"+Reports_id[i])
console.log("result1[i].Reports_To"+result1[i].Reports_To)
if((Reports_id).includes(result1[i].Reports_To)){

Maillist[i]=result1[i].email;
console.log(Maillist[i]+"Maillist[i]");
count++

}else{
console.log("else block");
count1++
}
}

const Maillist1 = Maillist.filter((a) => a);

const PASSWORD = 'Durgakalyan';
const from="durga.avala@outlook.com"
const to=Maillist1;
const subject="Timesheet Approval pending"
const html="<h5>"+Dublicate+" "+CurrentWeekDate+"Timesheet Approval pending </h5>"



cron.schedule('* * * * friday', () => {//minutes,hours,month,year,day 24hrs time format
console.log('running a task every Friday Consultent');

try {
const transportOptions = {
host: 'smtp.office365.com',
port: '587',
auth: { user: from, pass: PASSWORD },
secureConnection: true,
tls: { ciphers: 'SSLv3' }
};

const mailTransport = nodemailer.createTransport(transportOptions);

mailTransport.sendMail({
from,
to,
replyTo: from,
subject,
html
//text

});
console.log("credntials");
} catch (err) {
console.error(`send365Email: An error occurred:`, err);
}
});


}

});
});


*/













 // Time Evaluation

router.get("/timeevaluation",(req,res)=>{
let country=req.query.country
console.log("country",country)

  db.query("select * from zl_table",function(err,Time){
    console.log("Time Evaluation initial")
    let TimeSheetArray=[];
    for(let p=0;p<Time.length;p++)
    {


TimeSheetArray[p]=Time[p].Date+"^"+Time[p].UserId+"^"+Time[p].Time_Type

    }

        db.query("select * from edittimesheet", function (err, TimeSheet) {


    for(let i=0;i<TimeSheet.length;i++)
    {
      let SundayDate=TimeSheet[i].Date;

      var d = new Date(SundayDate)
      let MondayDate=new Date(d.setDate(d.getDate() + 1))
      MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekHrs=[];
WeekHrs=[TimeSheet[i].Sunday,TimeSheet[i].Monday,TimeSheet[i].Tuesday,TimeSheet[i].Wednesday,TimeSheet[i].Thursday,TimeSheet[i].Friday,TimeSheet[i].Saturday]

   if(!TimeSheetArray.includes(TimeSheet[i].Date+"^"+TimeSheet[i].UserId+"^"+TimeSheet[i].AA_Types))
   {

  
    if(TimeSheet[i].Submit==="Approval"&&TimeSheet[i].AA_Types==="Regular Hours")
    {
      for(let j=0;j<WeekDays.length;j++)
      {
        if(!TimeSheetArray.includes(TimeSheet[i].Date+"^"+TimeSheet[i].UserId+"^"+"ST"))
  {
        let CreateEntry=[];
        CreateEntry.push(new Array(TimeSheet[i].UserId,WeekDays[j],TimeSheet[i].Country,TimeSheet[i].Location,"ST",TimeSheet[i].SubmittedBy,WeekHrs[j],"*","*"))
       var sql="insert into zl_table(UserId,Date,Country,Location,Time_Type,SubmittedBy,Hrs,Company,Shift) VALUES?"
      db.query(sql,[CreateEntry])
      }
    }
    }

    if(TimeSheet[i].Submit==="Approval"&&TimeSheet[i].AA_Types!=="Regular Hours")
    {
  for(let j=0;j<WeekDays.length;j++)
{
  let CreateEntry=[];
  CreateEntry.push(new Array(TimeSheet[i].UserId,WeekDays[j],TimeSheet[i].Country,TimeSheet[i].Location,TimeSheet[i].AA_Types,TimeSheet[i].SubmittedBy,WeekHrs[j],"*","*"))
 var sql="insert into zl_table(UserId,Date,Country,Location,Time_Type,SubmittedBy,Hrs,Company,Shift) VALUES?"
db.query(sql,[CreateEntry])
}
    }




  }
  }
  console.log("Time Evaluation Done")
  })
  return  res.send({message:"Time Evaluation Completed"});


})


   db.query("select * from zl_table WHERE Country=?",[country],function(err,Time){
    let TimeSheetArray=[];
    for(let p=0;p<Time.length;p++)
    {

TimeSheetArray[p]=Time[p].Date+"^"+Time[p].UserId+"^"+Time[p].Time_Type

    }

  db.query("select * from edittimesheet WHERE Country=? AND SubmittedBy=?",[country,"ADMIN_CA"], function (err, TimeSheet1) {
    let queries="";

    for(let i=0;i<TimeSheet1.length;i++)
    {




    let SundayDate=TimeSheet1[i].Date;

    var d = new Date(SundayDate)
    let MondayDate=new Date(d.setDate(d.getDate() + 1))
    MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekHrs=[];
WeekHrs=[TimeSheet1[i].Sunday,TimeSheet1[i].Monday,TimeSheet1[i].Tuesday,TimeSheet1[i].Wednesday,TimeSheet1[i].Thursday,TimeSheet1[i].Friday,TimeSheet1[i].Saturday]



 if(TimeSheet1[i].SubmittedBy==="ADMIN")
 {


  
  if(TimeSheet1[i].Submit==="Approval"&&TimeSheet1[i].AA_Types==="Regular Hours")
  {

    for(let j=0;j<WeekDays.length;j++)
    {
      if(TimeSheetArray.includes(TimeSheet1[i].Date+"^"+TimeSheet1[i].UserId+"^"+"ST"))
{
  queries += mysql.format("UPDATE zl_table SET SubmittedBy=?,Hrs=? WHERE UserId=? AND Time_Type=? AND Date=? AND Country=?;",[TimeSheet1[i].SubmittedBy,WeekHrs[j],TimeSheet1[i].UserId,"ST",WeekDays[j],TimeSheet1[i].Country])
    }
  }
  }

  if(TimeSheet1[i].Submit==="Approval"&&TimeSheet1[i].AA_Types!=="Regular Hours")
  {
for(let j=0;j<WeekDays.length;j++)
{
  queries += mysql.format("UPDATE zl_table SET SubmittedBy=?,Hrs=? WHERE UserId=? AND Time_Type=? AND Date=? AND Country=?;",[TimeSheet1[i].SubmittedBy,WeekHrs[j],TimeSheet1[i].UserId,TimeSheet1[i].AA_Types,WeekDays[j],TimeSheet1[i].Country])
}
  }








}
}




if(queries!=="")
{
  db.query(queries)
}

})

})


})



cron.schedule('25 22 * * *', () => {
  db.query("select * from zl_table",function(err,Time){
    let TimeSheetArray=[];
    for(let p=0;p<Time.length;p++)
    {

TimeSheetArray[p]=Time[p].Date+"^"+Time[p].UserId+"^"+Time[p].Time_Type

    }

        db.query("select * from edittimesheet", function (err, TimeSheet) {

      try{
    for(let i=0;i<TimeSheet.length;i++)
    {
      let SundayDate=TimeSheet[i].Date;

      var d = new Date(SundayDate)
      let MondayDate=new Date(d.setDate(d.getDate() + 1))
      MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekHrs=[];
WeekHrs=[TimeSheet[i].Sunday,TimeSheet[i].Monday,TimeSheet[i].Tuesday,TimeSheet[i].Wednesday,TimeSheet[i].Thursday,TimeSheet[i].Friday,TimeSheet[i].Saturday]
   if(!TimeSheetArray.includes(TimeSheet[i].Date+"^"+TimeSheet[i].UserId+"^"+TimeSheet[i].AA_Types))
   {

    
    if(TimeSheet[i].Submit==="Approval"&&TimeSheet[i].AA_Types==="Regular Hours")
    {
      for(let j=0;j<WeekDays.length;j++)
      {
        if(!TimeSheetArray.includes(TimeSheet[i].Date+"^"+TimeSheet[i].UserId+"^"+"ST"))
  {
        let CreateEntry=[];
        CreateEntry.push(new Array(TimeSheet[i].UserId,WeekDays[j],TimeSheet[i].Country,TimeSheet[i].Location,"ST",TimeSheet[i].SubmittedBy,WeekHrs[j],"*","*"))
       var sql="insert into zl_table(UserId,Date,Country,Location,Time_Type,SubmittedBy,Hrs,Company,Shift) VALUES?"
      db.query(sql,[CreateEntry])
      }
    }
    }

    if(TimeSheet[i].Submit==="Approval"&&TimeSheet[i].AA_Types!=="Regular Hours")
    {
  for(let j=0;j<WeekDays.length;j++)
{
  let CreateEntry=[];
  CreateEntry.push(new Array(TimeSheet[i].UserId,WeekDays[j],TimeSheet[i].Country,TimeSheet[i].Location,TimeSheet[i].AA_Types,TimeSheet[i].SubmittedBy,WeekHrs[j],"*","*"))
 var sql="insert into zl_table(UserId,Date,Country,Location,Time_Type,SubmittedBy,Hrs,Company,Shift) VALUES?"
db.query(sql,[CreateEntry])
}
    }




  }
  }
        }catch(err){


        }

  })  })
   db.query("select * from zl_table",function(err,Time){
    let TimeSheetArray=[];
    for(let p=0;p<Time.length;p++)
    {

TimeSheetArray[p]=Time[p].Date+"^"+Time[p].UserId

    }

  db.query("select * from edittimesheet", function (err, TimeSheet1) {
    let queries="";

    for(let i=0;i<TimeSheet1.length;i++)
    {

    if(TimeSheetArray.includes(TimeSheet1[i].Date+"^"+TimeSheet1[i].UserId))
   {



    let SundayDate=TimeSheet1[i].Date;

    var d = new Date(SundayDate)
    let MondayDate=new Date(d.setDate(d.getDate() + 1))
    MondayDate= Moment(MondayDate).format('MMM DD yyyy')
let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
let FridayDate=new Date(d.setDate(d.getDate() + 1))
FridayDate= Moment(FridayDate).format('MMM DD yyyy')
let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
let WeekHrs=[];
WeekHrs=[TimeSheet1[i].Sunday,TimeSheet1[i].Monday,TimeSheet1[i].Tuesday,TimeSheet1[i].Wednesday,TimeSheet1[i].Thursday,TimeSheet1[i].Friday,TimeSheet1[i].Saturday]
let count=0;
var e = new Date(CurrentWeekDate)
for(let s=0;s<7;s++)
{

if(s===0)
{
  CurrentWeekDate=CurrentWeekDate
}
else
{
  CurrentWeekDate=new Date(e.setDate(d.getDate() + 1))
  CurrentWeekDate= Moment(CurrentWeekDate).format('MMM DD yyyy')
}

 if(TimeSheet1[i].TimeStamp===CurrentWeekDate&&count===0)
 {
 count=1;

   
  if(TimeSheet1[i].Submit==="Approval"&&TimeSheet1[i].AA_Types==="Regular Hours")
  {
    for(let j=0;j<WeekDays.length;j++)
    {
      if(!TimeSheetArray.includes(TimeSheet1[i].Date+"^"+TimeSheet1[i].UserId+"^"+"ST"))
{
  queries += mysql.format("UPDATE zl_table SET SubmittedBy=?,Hrs=? WHERE UserId=? AND Time_Type=? AND Date=? AND Country=?;",[TimeSheet1[i].SubmittedBy,WeekHrs[j],TimeSheet1[i].UserId,"ST",WeekDays[j],TimeSheet1[i].Country])
    }
  }
  }

  if(TimeSheet1[i].Submit==="Approval"&&TimeSheet1[i].AA_Types!=="Regular Hours")
  {
for(let j=0;j<WeekDays.length;j++)
{
  queries += mysql.format("UPDATE zl_table SET SubmittedBy=?,Hrs=? WHERE UserId=? AND Time_Type=? AND Date=? AND Country=?;",[TimeSheet1[i].SubmittedBy,WeekHrs[j],TimeSheet1[i].UserId,TimeSheet1[i].AA_Types,WeekDays[j],TimeSheet1[i].Country])
}
  }

}
}
}

}

if(queries!=="")
{
  db.query(queries)
}

})

})
})

//SuperAdminApproval
router.get("/SuperAdminApproval", (req, res) => {
  let id=req.query.a;
 let SuperAdmin=req.query.SuperAdmin;
let country=req.query.country;
db.query("SELECT edittimesheet.*,user.fname,user.Reports_To FROM edittimesheet INNER JOIN user ON edittimesheet.UserId =user.uid WHERE edittimesheet.Submit=?",[SuperAdmin], function (err, result) {

  if(result.length>0){

    res.send(result);
   // console.log(result)

        }
        else{
            res.send({message:"Already Project Exited"});
        }
      })
    })













  /*TimeSheet Reports*/
  router.get("/TimeSheetReports",(req,res)=>{
    db.query("SELECT * FROM zl_table ",( err,result)=>{
    if(result){
    res.send(JSON.stringify(result));
  //  console.log("project reports:"+JSON.stringify( result))
    }
    else{
    console.log(err);
    }
    })
    
    })







 





 

    router.post("/retrotimesheet", (req, res) => {
      var TimeSheetarr=[];
      let k=0;
      let l=0;
      let j=0;
    
    let flag=0;
    

          let Holiday=0;

          const taskList=req.body.taskList;
          const myDate=req.body.myDate;

          let submittedby=req.body.id
        

          let EmployeeGroup=req.body.EmployeeGroup;

            let id=taskList[0].UserId;
            var AATypes = []
            let logHrs=0;
            var validateAATypes = 0
            let Total=0;
            
              for(let i=0;i<taskList.length;i++){
               if(!AATypes.includes(taskList[i].AA_Types))
               {
                 if(taskList[i].Sunday==="")
                 {
                   taskList[i].Sunday=0;
                 }
                 if(taskList[i].Monday==="")
                 {
                   taskList[i].Monday=0;
                 }
                 if(taskList[i].Tuesday==="")
                 {
                   taskList[i].Tuesday=0;
                 }
                 if(taskList[i].Wednesday==="")
                 {
                   taskList[i].Wednesday=0;
                 }
                 if(taskList[i].Thursday==="")
                 {
                   taskList[i].Thursday=0;
                 }
                 if(taskList[i].Friday==="")
                 {
                   taskList[i].Friday=0;
                 }
                 if(taskList[i].Saturday==="")
                 {
                   taskList[i].Saturday=0;
                 }
                 AATypes.push(taskList[i].AA_Types)
                 Total=parseFloat(taskList[i].Sunday)+parseFloat(taskList[i].Monday)+parseFloat(taskList[i].Tuesday)+parseFloat(taskList[i].Wednesday)+parseFloat(taskList[i].Thursday)+parseFloat(taskList[i].Friday)+parseFloat(taskList[i].Saturday)
                 if(Total===0)
                {
                logHrs=1;
             
                }
                }else{
           
                 validateAATypes=1;
                 break;
           
               }
               }
           
       
             if(validateAATypes!==1 && logHrs!==1){
             

           db.query("select * from edittimesheet WHERE UserId=? AND Date=?",[id,myDate], function (err, TimeSheet) {
             if (err) throw err;
             for(var i=0;i<TimeSheet.length;i++)
             {
             TimeSheetarr[i]=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types+"^"+TimeSheet[i].TimeStamp;



             }

             var CurrentDate = new Date();
          let CurrentDate1=CurrentDate

             const submit=req.body.Submit

            

           global.uid=req.body.id

           let DeleteArr=[];
           let DublicateEntry=[];
           let CreateEntry=[];
           let SickHrs=0;
           let VacationHrs=0;
           const len = taskList.length;
           let AA_Type=""
           let hrsgreaterthan24=0;
           let Weekends=0;
           let Sunday=0;
           let Monday=0;
           let Tuesday=0;
           let Wednesday=0;
           let Thursday=0;
           let Friday=0;
           let Saturday=0;
           let AA_Type_Sunday="";
           let AA_Type_Monday="";
           let AA_Type_Tuesday="";
           let AA_Type_Wednesday="";
           let AA_Type_Thursday="";
           let AA_Type_Friday="";
           let AA_Type_Saturday="";
           let WeekAA_Type="";
           var queries = '';
         
          let Create=0;
          let Update=0;
        let Holiday1=0

           let SundayDate=req.body.myDate;

           var d = new Date(SundayDate)
           let MondayDate=new Date(d.setDate(d.getDate() + 1))
           MondayDate= Moment(MondayDate).format('MMM DD yyyy')
    let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
    TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
    let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
    WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
    let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
    ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
    let FridayDate=new Date(d.setDate(d.getDate() + 1))
    FridayDate= Moment(FridayDate).format('MMM DD yyyy')
    let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
    SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

    let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
    let WeekDates=[];
   

  


         

         

          
                db.query("SELECT * FROM holiday",function(err,holiday){
                
try{
              for(var i=0;i<len;i++){

      if(taskList[i].Sunday===""){taskList[i].Sunday=0;}
      if(taskList[i].Monday===""){taskList[i].Monday=0;}
      if(taskList[i].Tuesday===""){taskList[i].Tuesday=0;}
      if(taskList[i].Wednesday===""){taskList[i].Wednesday=0;}
      if(taskList[i].Thursday===""){taskList[i].Thursday=0;}
      if(taskList[i].Friday===""){taskList[i].Friday=0;}
      if(taskList[i].Saturday===""){taskList[i].Saturday=0;}
      let WeekHrs=[taskList[i].Sunday,taskList[i].Monday,taskList[i].Tuesday,taskList[i].Wednesday,taskList[i].Thursday,taskList[i].Friday,taskList[i].Saturday]
       if(!DublicateEntry.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types+"^"+CurrentDate1))
          {
            DublicateEntry.push(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types+"^"+CurrentDate1)

          if(!TimeSheetarr.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types+"^"+CurrentDate1))
          {


        Create=1;
           DeleteArr[i]=id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types+"^"+CurrentDate1;
           CreateEntry.push(new Array(id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",submittedby,EmployeeGroup,"","DENTSPLY",CurrentDate1));
          }
          else{

        Update=1;

           DeleteArr[i]=id+"^"+taskList[i].Date+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types+"^"+taskList[i].TimeStamp;
          queries += mysql.format("UPDATE edittimesheet SET UserId=?,Date=?,Country=?,Sunday=?,Cmt1=?,Monday=?,Cmt2=?,Tuesday=?,Cmt3=?,Wednesday=?,Cmt4=?,Thursday=?,Cmt5=?,Friday=?,Cmt6=?,Saturday=?,Cmt7=?,Submit=?,Location=?,AA_Types=?,Remarks=?,SubmittedBy=?,EmployeeGroup=?,Shift=?,Company=?,TimeStamp=? WHERE UserId=? AND Date=? AND Country=? AND Location=? AND AA_Types=? AND Shift=? AND Company=? AND TimeStamp=?;",[id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",submittedby,EmployeeGroup,"*","DENTSPLY",CurrentDate1,id,myDate,taskList[i].Country,taskList[i].Location,taskList[i].AA_Types,"*","DENTSPLY",CurrentDate1])



         }
        }
   
      if(parseFloat(taskList[i].Sunday)>24||parseFloat(taskList[i].Monday)>24||parseFloat(taskList[i].Tuesday)>24||parseFloat(taskList[i].Wednesday)>24||parseFloat(taskList[i].Thursday)>24||parseFloat(taskList[i].Friday)>24||parseFloat(taskList[i].Saturday)>24)
      {
        hrsgreaterthan24=1;
      }
      if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
      {

        for(let H=0;H<holiday.length;H++)
        {
        for(let W=0;W<WeekDays.length;W++)
        {
         


          if((WeekDays[W]===holiday[H].Date))
          {
           if(WeekHrs[W]!==""&&WeekHrs[W]!=="0"&&WeekHrs[W]!==0)
           {
              Holiday1=1;

           }
          }
        }
      }
    }
    if(taskList[i].AA_Types==="Holiday")
      {
        let HolidayArr=[]
     
        for(let H=0;H<holiday.length;H++)
        {
    HolidayArr[H]=Moment(holiday[H].Date).format("MMM DD YYYY");
   


        }

       for(let W=0;W<WeekDays.length;W++)
       {

    WeekDays[W]=Moment(WeekDays[W]).format("MMM DD YYYY");





          if(!(HolidayArr.includes(WeekDays[W])))
          {
       if(WeekHrs[W]!=="0"&&WeekHrs[W]!==""&&WeekHrs[W]!==0)
       {

              Holiday=1;
       }

          }
         

      }

    }
      if(taskList[i].AA_Types==="Regular Hours")
      {

      Sunday=Sunday+parseFloat(taskList[i].Sunday);
      Monday=Monday+parseFloat(taskList[i].Monday);
      Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
      Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
      Thursday=Thursday+parseFloat(taskList[i].Thursday);
      Friday=Friday+parseFloat(taskList[i].Friday);
      Saturday=Saturday+parseFloat(taskList[i].Saturday);

      }
      else{
        if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
        {

        if(parseFloat(taskList[i].Sunday)!==0)
        {
          AA_Type_Sunday=taskList[i].AA_Types;
         Sunday=Sunday+parseFloat(taskList[i].Sunday);
        }
        if(parseFloat(taskList[i].Monday)!==0)
        {
          AA_Type_Monday=taskList[i].AA_Types;
        Monday=Monday+parseFloat(taskList[i].Monday);
        }
        if(parseFloat(taskList[i].Tuesday)!==0)
        {
          AA_Type_Tuesday=taskList[i].AA_Types;
        Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
        }
        if(parseFloat(taskList[i].Wednesday)!==0)
        {
          AA_Type_Wednesday=taskList[i].AA_Types;
        Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
        }
        if(parseFloat(taskList[i].Thursday)!==0)
        {
          AA_Type_Thursday=taskList[i].AA_Types;
        Thursday=Thursday+parseFloat(taskList[i].Thursday);
        }
       if(parseFloat(taskList[i].Friday)!==0)
       {
        AA_Type_Friday=taskList[i].AA_Types;
       Friday=Friday+parseFloat(taskList[i].Friday);
       }
       if(parseFloat(taskList[i].Saturday)!==0)
       {
        AA_Type_Saturday=taskList[i].AA_Types;
       Saturday=Saturday+parseFloat(taskList[i].Saturday);
       }
        }}


        if(taskList[i].AA_Types!=="Regular Hours"&&taskList[i].AA_Types!=="Holiday")
                {
            if(parseFloat(taskList[i].Sunday)>0||parseFloat(taskList[i].Saturday)>0)
            {
               Weekends=1;
               WeekAA_Type=taskList[i].AA_Types;

            }
          }
            if(taskList[i].AA_Types==="Bereavement"||taskList[i].AA_Types==="Jury Duty"||taskList[i].AA_Types==="Training"||taskList[i].AA_Types==="Travel")
            {
                if(taskList[i].Sunday==="8"||taskList[i].Sunday==="4"||taskList[i].Sunday===0||taskList[i].Sunday==="0")
          {



           }
           else{
            AA_Type=taskList[i].AA_Types
          
            SickHrs=1;

          }
         if(taskList[i].Monday==="8"||taskList[i].Monday==="4"||taskList[i].Monday===0||taskList[i].Monday==="0")
          {

          }
          else{
            AA_Type=taskList[i].AA_Types
          
            SickHrs=1;
          }
         if(taskList[i].Tuesday==="8"||taskList[i].Tuesday==="4"||taskList[i].Tuesday===0||taskList[i].Tuesday==="0" )
          {

          }
          else{
            AA_Type=taskList[i].AA_Types
            
            SickHrs=1;
          }
           if(taskList[i].Wednesday==="8"||taskList[i].Wednesday==="4"||taskList[i].Wednesday===0||taskList[i].Wednesday==="0")
          {

          }
          else{
            AA_Type=taskList[i].AA_Types
          
            SickHrs=1;
          }
             if(taskList[i].Thursday==="8"||taskList[i].Thursday==="4"||taskList[i].Thursday===0||taskList[i].Thursday==="0" )
            {

            }
            else{
              AA_Type=taskList[i].AA_Types
            ;
              SickHrs=1;
            }
               if(taskList[i].Friday==="8"||taskList[i].Friday==="4"||taskList[i].Friday===0||taskList[i].Friday==="0" )
              {

             }
             else{
              AA_Type=taskList[i].AA_Types
            
              SickHrs=1;
            }
              if(taskList[i].Saturday==="8"||taskList[i].Saturday==="4"||taskList[i].Saturday===0||taskList[i].Saturday==="0" )
             {

            }
            else{
              AA_Type=taskList[i].AA_Types
            
              SickHrs=1;
            }
          }
              
 }
          }catch(err){

          }
            let lo=0;
      var sql="insert into edittimesheet(UserId,Date,Country,Sunday,Cmt1,Monday,Cmt2,Tuesday,Cmt3,Wednesday,Cmt4,Thursday,Cmt5,Friday,Cmt6,Saturday,Cmt7,Submit,Location,AA_Types,Remarks,SubmittedBy,EmployeeGroup,Shift,Company,TimeStamp) VALUES?";
   
      if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
      {
     
     lo=1;
      }


      if(Weekends===1&&WeekAA_Type!=="Regular Hours"&&WeekAA_Type!=="Holiday")
      {
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"Except Regular Hours you can't be entered on Weekends"});
               }


       });
      }
     else if(Sunday>8&&(AA_Type_Sunday!=="Regular Hours"&&AA_Type_Sunday!==""&&AA_Type_Sunday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Sunday"});
               }


       });
      }
      else if(Monday>8&&(AA_Type_Monday!=="Regular Hours"&&AA_Type_Monday!==""&&AA_Type_Monday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Monday"});
               }


       });
      }
      else if(Tuesday>8&&(AA_Type_Tuesday!=="Regular Hours"&&AA_Type_Tuesday!==""&&AA_Type_Tuesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Tuesday"});
               }


       });
      }
      else if(Wednesday>8&&(AA_Type_Wednesday!=="Regular Hours"&&AA_Type_Wednesday!==""&&AA_Type_Wednesday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Wednesday"});
               }


       });
      }
      else if(Thursday>8&&(AA_Type_Thursday!=="Regular Hours"&&AA_Type_Thursday!==""&&AA_Type_Thursday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Thursday"});
               }


       });
      }
      else if(Friday>8&&(AA_Type_Friday!=="Regular Hours"&&AA_Type_Friday!==""&&AA_Type_Friday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Friday"});
               }


       });
      }
      else if(Saturday>8&&(AA_Type_Saturday!=="Regular Hours"&&AA_Type_Saturday!==""&&AA_Type_Saturday!=="Holiday"))
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You can't enter more than 8 Hours on Saturday"});
               }


       });
      }
      else if(Monday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Monday"});
               }


       });
      }
      else if(Tuesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Tuesday"});
               }


       });
      }
      else if(Wednesday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Wednesday"});
               }


       });
      }
      else if(Thursday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Thursday"});
               }


       });
      }
      else if(Friday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Friday"});
               }


       });
      }
      else if(Saturday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Saturday"});
               }


       });
      }
      else if(Sunday>24)
      {
        flag=1;
       db.query("select * from edittimesheet", function (err, result) {
         if(result){

         return  res.send({message:"You have entered more than 24 Hrs on Sunday"});
               }


       });
      }
 else if(hrsgreaterthan24===1)
 {
  flag=1;
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You have entered more than 24 Hrs on a Day"});
          }


  });
 }
 else if(Holiday===1)
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"No holidays in this current week"});
          }


  });
 }
 else if(Holiday1===1)
 {
  
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

      return  res.send({message:"You have holiday on this day so any other AA_Type not Allowed Expect Regular Hours"});
          }


  });
 }

 else if(SickHrs===1&&AA_Type!=="Regular Hours"&&AA_Type!=="Holiday")
 {
  db.query("select * from edittimesheet", function (err, result) {
    if(result){

    return  res.send({message:"You need to enter 4Hrs OR 8Hrs per "+AA_Type});
          }


  });
 }
     else if(lo===1&&submit===1){
      db.query("select * from edittimesheet", function (err, result) {
        if(result){

        return  res.send({message:"TimeSheet Successfully Saved for this Period"});
              }


      });
     }

     else if(lo===1&&(submit==="0"||submit==="Approval")){

      db.query("select * from edittimesheet", function (err, result) {
        if(result){

        return  res.send({message:"TimeSheet Successfully Submitted for this Period"});
              }


      });
     }

     if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
     {
   
       if(Update===1)
       {

      db.query(queries)
       }
      if(Create===1)
      {

     db.query(sql,[CreateEntry])
      }
      for(var i=0;i<TimeSheet.length;i++)
      {
        let key=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types+"^"+TimeSheet[i].TimeStamp;

        if(id===TimeSheet[i].UserId&&myDate.includes(TimeSheet[i].Date))
    {

      if(!DeleteArr.includes(key))
      {

  db.query("DELETE FROM edittimesheet WHERE UserId=? AND Date=? AND Location=? AND Country=? AND AA_Types=? AND TimeStamp=?",[id,myDate,TimeSheet[i].Location,TimeSheet[i].Country,TimeSheet[i].AA_Types,TimeSheet[i].TimeStamp])
      }
    }
      }
      }



          })
         });}
      else if(validateAATypes===1){

        db.query("select count(*) from aa_types",(err,result)=>{
          if(result){
  
            return res.send({message:"Dublicate AA_Type"})
  
  
          }
        })
  
      }
      else if(logHrs===1){
  
        db.query("select count(*) from aa_types",(err,result)=>{
          if(result){
  
            return res.send({message:"You can't report Zero hours"})
  
  
          }
        })
  
      }});



  router.get("/LockTimesheet",(req,res)=>{
    let lock= req.query.Lock
    let country = req.query.Country;

  db.query("update locktimesheet set lockTS=? where Country=?",[lock,"DENTSPLY"],(err,result)=>{
    if(result){
      res.send(result);
          }
          else{

              res.send({message:"nothing"});
          }
        })

  })




      /*Send the timesheet-lock response*/
    router.post("/LockTimesheetres",(req,res)=>{

      db.query("select lockTS from locktimesheet",(err,lockres)=>{
      if(lockres.length>0)
      {

        res.send(lockres)
      }
      else
      db.query("select lockTS from locktimesheet where Country=?",["DENTSPLY"],(err,lockres1)=>{
        if(lockres1.length>0)
        {

          res.send(lockres1)
        }

        })

    })

    })







 

router.post("/superadmincreatetimesheet", (req, res) => {
      
        let k=0;
        let l=0;
        let j=0;
      
        var SubmittedBy = req.body.SubmittedBy;
          const taskList=req.body.taskList;
          const len = taskList.length;
          const myDate=req.body.myDate;
          const id=req.body.id;
          const submit=req.body.Submit;
          const country=req.body.country
          var AATypes = []
          let logHrs=0;
          var validateAATypes = 0
          let Total=0;
          
            for(let i=0;i<taskList.length;i++){
             if(!AATypes.includes(taskList[i].AA_Types))
             {
               if(taskList[i].Sunday==="")
               {
                 taskList[i].Sunday=0;
               }
               if(taskList[i].Monday==="")
               {
                 taskList[i].Monday=0;
               }
               if(taskList[i].Tuesday==="")
               {
                 taskList[i].Tuesday=0;
               }
               if(taskList[i].Wednesday==="")
               {
                 taskList[i].Wednesday=0;
               }
               if(taskList[i].Thursday==="")
               {
                 taskList[i].Thursday=0;
               }
               if(taskList[i].Friday==="")
               {
                 taskList[i].Friday=0;
               }
               if(taskList[i].Saturday==="")
               {
                 taskList[i].Saturday=0;
               }
               AATypes.push(taskList[i].AA_Types)
               Total=parseFloat(taskList[i].Sunday)+parseFloat(taskList[i].Monday)+parseFloat(taskList[i].Tuesday)+parseFloat(taskList[i].Wednesday)+parseFloat(taskList[i].Thursday)+parseFloat(taskList[i].Friday)+parseFloat(taskList[i].Saturday)
               if(Total===0)
               {
                 logHrs=1;
              
               }
              }else{
         
               validateAATypes=1;
               break;
         
             }
             }
         
      
           if(validateAATypes!==1 && logHrs!==1){

         db.query( "SELECT * FROM edittimesheet WHERE UserId=? AND Date=?",[id,myDate], function (err, TimeSheet) {
              if (err) throw err;

               if(TimeSheet.length>0)
               {
                 l=1;
               }
           else{

           }



             let EmployeeGroup=req.body.EmployeeGroup;

             const submit=req.body.Submit
            
             let CreateEntry=[];
             let SickHrs=0;
             let VacationHrs=0;

             let AA_Type=""
             let hrsgreaterthan24=0;
             let Weekends=0;
             let Sunday=0;
             let Monday=0;
             let Tuesday=0;
             let Wednesday=0;
             let Thursday=0;
             let Friday=0;
             let Saturday=0;
             let AA_Type_Sunday="";
             let AA_Type_Monday="";
             let AA_Type_Tuesday="";
             let AA_Type_Wednesday="";
             let AA_Type_Thursday="";
             let AA_Type_Friday="";
             let AA_Type_Saturday="";
             let WeekAA_Type="";

            let Holiday=0;
            let Holiday1=0;

             let SundayDate=req.body.myDate;
             var d = new Date(SundayDate)
             let MondayDate=new Date(d.setDate(d.getDate() + 1))
             MondayDate= Moment(MondayDate).format('MMM DD yyyy')
      let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
      TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
      let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
      WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
      let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
      ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
      let FridayDate=new Date(d.setDate(d.getDate() + 1))
      FridayDate= Moment(FridayDate).format('MMM DD yyyy')
      let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
      SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

      let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
      let WeekDates=[];

          
                  db.query("SELECT * FROM holiday WHERE Country=?",[country],function(err,holiday){
                 


                try{

                for(var i=0;i<taskList.length;i++){

        if(taskList[i].Sunday===""){taskList[i].Sunday=0;}
        if(taskList[i].Monday===""){taskList[i].Monday=0;}
        if(taskList[i].Tuesday===""){taskList[i].Tuesday=0;}
        if(taskList[i].Wednesday===""){taskList[i].Wednesday=0;}
        if(taskList[i].Thursday===""){taskList[i].Thursday=0;}
        if(taskList[i].Friday===""){taskList[i].Friday=0;}
        if(taskList[i].Saturday===""){taskList[i].Saturday=0;}

        let WeekHrs=[taskList[i].Sunday,taskList[i].Monday,taskList[i].Tuesday,taskList[i].Wednesday,taskList[i].Thursday,taskList[i].Friday,taskList[i].Saturday]
        if(l!==1)
       {
           CreateEntry.push(new Array(id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,SubmittedBy,EmployeeGroup,"*","DENTSPLY","*"));
            k++;}

          if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
          {

            for(let H=0;H<holiday.length;H++)
            {
            for(let W=0;W<WeekDays.length;W++)
            {
              let Arr=[];
            Arr=holiday[H].State.split(",")


              if((WeekDays[W]===holiday[H].Date)&&(Arr.includes(taskList[i].Location)))
              {
               if(WeekHrs[W]!==""&&WeekHrs[W]!=="0"&&WeekHrs[W]!==0)
               {
                  Holiday1=1;

               }
              }
            }
          }
        }
        if(taskList[i].AA_Types==="Holiday")
          {
            let HolidayArr=[]
           let Arr=[];
            for(let H=0;H<holiday.length;H++)
            {
      HolidayArr[H]=Moment(holiday[H].Date).format("MMM DD YYYY");
      for(let W=0;W<WeekDays.length;W++)
      {
        if(WeekDays[W]===holiday[H].Date)
        {
          Arr=holiday[H].State;
        }
      }


            }

           for(let W=0;W<WeekDays.length;W++)
           {

        WeekDays[W]=Moment(WeekDays[W]).format("MMM DD YYYY");





              if(!(HolidayArr.includes(WeekDays[W])))
              {
           if(WeekHrs[W]!=="0"&&WeekHrs[W]!==""&&WeekHrs[W]!==0)
           {

                  Holiday=1;
           }

              }
              else
              {


                if(!Arr.includes(taskList[i].Location))
                {

                  Holiday=1;
              }

          }

          }

        }

        if(parseFloat(taskList[i].Sunday)>24||parseFloat(taskList[i].Monday)>24||parseFloat(taskList[i].Tuesday)>24||parseFloat(taskList[i].Wednesday)>24||parseFloat(taskList[i].Thursday)>24||parseFloat(taskList[i].Friday)>24||parseFloat(taskList[i].Saturday)>24)
        {
          hrsgreaterthan24=1;
        }
        if(taskList[i].AA_Types==="Regular Hours"||taskList[i].AA_Types==="Holiday")
        {

        Sunday=Sunday+parseFloat(taskList[i].Sunday);
        Monday=Monday+parseFloat(taskList[i].Monday);
        Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
        Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
        Thursday=Thursday+parseFloat(taskList[i].Thursday);
        Friday=Friday+parseFloat(taskList[i].Friday);
        Saturday=Saturday+parseFloat(taskList[i].Saturday);

        }
        else {
       if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
       {

          if(parseFloat(taskList[i].Sunday)!==0)
          {
            AA_Type_Sunday=taskList[i].AA_Types;
           Sunday=Sunday+parseFloat(taskList[i].Sunday);
          }
          if(parseFloat(taskList[i].Monday)!==0)
          {
            AA_Type_Monday=taskList[i].AA_Types;
          Monday=Monday+parseFloat(taskList[i].Monday);
          }
          if(parseFloat(taskList[i].Tuesday)!==0)
          {
            AA_Type_Tuesday=taskList[i].AA_Types;
          Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
          }
          if(parseFloat(taskList[i].Wednesday)!==0)
          {
            AA_Type_Wednesday=taskList[i].AA_Types;
          Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
          }
          if(parseFloat(taskList[i].Thursday)!==0)
          {
            AA_Type_Thursday=taskList[i].AA_Types;
          Thursday=Thursday+parseFloat(taskList[i].Thursday);
          }
         if(parseFloat(taskList[i].Friday)!==0)
         {
          AA_Type_Friday=taskList[i].AA_Types;
         Friday=Friday+parseFloat(taskList[i].Friday);
         }
         if(parseFloat(taskList[i].Saturday)!==0)
         {
          AA_Type_Saturday=taskList[i].AA_Types;
         Saturday=Saturday+parseFloat(taskList[i].Saturday);
         }
          }


                  if(taskList[i].AA_Types!=="Regular Hours"&&taskList[i].AA_Types!=="Holiday")
                  {
              if(parseFloat(taskList[i].Sunday)>0||parseFloat(taskList[i].Saturday)>0)
              {
                 Weekends=1;
                 WeekAA_Type=taskList[i].AA_Types;

              }
            }
            if(taskList[i].AA_Types==="Bereavement"||taskList[i].AA_Types==="Jury Duty"||taskList[i].AA_Types==="Training"||taskList[i].AA_Types==="Travel")
            {

                  if(taskList[i].Sunday==="8"||taskList[i].Sunday==="4"||taskList[i].Sunday===0||taskList[i].Sunday==="0")
            {



             }
             else{
              AA_Type=taskList[i].AA_Types
          
              SickHrs=1;

            }
           if(taskList[i].Monday==="8"||taskList[i].Monday==="4"||taskList[i].Monday===0||taskList[i].Monday==="0")
            {

            }
            else{
              AA_Type=taskList[i].AA_Types
             
              SickHrs=1;
            }
           if(taskList[i].Tuesday==="8"||taskList[i].Tuesday==="4"||taskList[i].Tuesday===0||taskList[i].Tuesday==="0" )
            {

            }
            else{
              AA_Type=taskList[i].AA_Types
             
              SickHrs=1;
            }
             if(taskList[i].Wednesday==="8"||taskList[i].Wednesday==="4"||taskList[i].Wednesday===0||taskList[i].Wednesday==="0")
            {

            }
            else{
              AA_Type=taskList[i].AA_Types
          
              SickHrs=1;
            }
               if(taskList[i].Thursday==="8"||taskList[i].Thursday==="4"||taskList[i].Thursday===0||taskList[i].Thursday==="0" )
              {

              }
              else{
                AA_Type=taskList[i].AA_Types
            
                SickHrs=1;
              }
                 if(taskList[i].Friday==="8"||taskList[i].Friday==="4"||taskList[i].Friday===0||taskList[i].Friday==="0" )
                {

               }
               else{
                AA_Type=taskList[i].AA_Types
              
                SickHrs=1;
              }
                if(taskList[i].Saturday==="8"||taskList[i].Saturday==="4"||taskList[i].Saturday===0||taskList[i].Saturday==="0" )
               {

              }
              else{
                AA_Type=taskList[i].AA_Types
               
                SickHrs=1;
              }
                }

        }

     



              }


            }catch(err){


            }
            var sql="insert into edittimesheet(UserId,Date,Country,Sunday,Cmt1,Monday,Cmt2,Tuesday,Cmt3,Wednesday,Cmt4,Thursday,Cmt5,Friday,Cmt6,Saturday,Cmt7,Submit,Location,AA_Types,SubmittedBy,EmployeeGroup,Shift,Company,TimeStamp) VALUES?";



            if(Weekends===1&&WeekAA_Type!=="Regular Hours"&&WeekAA_Type!=="Holiday")
            {
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"Except Regular Hours you can't be entered on Weekends"});
                     }
      
      
             });
            }
           else if(Sunday>8&&(AA_Type_Sunday!=="Regular Hours"&&AA_Type_Sunday!==""&&AA_Type_Sunday!=="Holiday"))
            {
            
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Sunday"});
                     }
      
      
             });
            }
            else if(Monday>8&&(AA_Type_Monday!=="Regular Hours"&&AA_Type_Monday!==""&&AA_Type_Monday!=="Holiday"))
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Monday"});
                     }
      
      
             });
            }
            else if(Tuesday>8&&(AA_Type_Tuesday!=="Regular Hours"&&AA_Type_Tuesday!==""&&AA_Type_Tuesday!=="Holiday"))
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Tuesday"});
                     }
      
      
             });
            }
            else if(Wednesday>8&&(AA_Type_Wednesday!=="Regular Hours"&&AA_Type_Wednesday!==""&&AA_Type_Wednesday!=="Holiday"))
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Wednesday"});
                     }
      
      
             });
            }
            else if(Thursday>8&&(AA_Type_Thursday!=="Regular Hours"&&AA_Type_Thursday!==""&&AA_Type_Thursday!=="Holiday"))
            {
            
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Thursday"});
                     }
      
      
             });
            }
            else if(Friday>8&&(AA_Type_Friday!=="Regular Hours"&&AA_Type_Friday!==""&&AA_Type_Friday!=="Holiday"))
            {
            
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Friday"});
                     }
      
      
             });
            }
            else if(Saturday>8&&(AA_Type_Saturday!=="Regular Hours"&&AA_Type_Saturday!==""&&AA_Type_Saturday!=="Holiday"))
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You can't enter more than 8 Hours on Saturday"});
                     }
      
      
             });
            }
            else if(Monday>24)
            {
             
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Monday"});
                     }
      
      
             });
            }
            else if(Tuesday>24)
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Tuesday"});
                     }
      
      
             });
            }
            else if(Wednesday>24)
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Wednesday"});
                     }
      
      
             });
            }
            else if(Thursday>24)
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Thursday"});
                     }
      
      
             });
            }
            else if(Friday>24)
            {
            
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Friday"});
                     }
      
      
             });
            }
            else if(Saturday>24)
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Saturday"});
                     }
      
      
             });
            }
            else if(Sunday>24)
            {
           
             db.query("select * from edittimesheet", function (err, result) {
               if(result){
      
               return  res.send({message:"You have entered more than 24 Hrs on Sunday"});
                     }
      
      
             });
            }
       else if(hrsgreaterthan24===1)
       {
     
        db.query("select * from edittimesheet", function (err, result) {
          if(result){
      
          return  res.send({message:"You have entered more than 24 Hrs on a Day"});
                }
      
      
        });
       }
       else if(Holiday===1)
       {
        db.query("select * from edittimesheet", function (err, result) {
          if(result){
      
            return  res.send({message:"No holidays in this current week"});
                }
      
      
        });
       }
       else if(Holiday1===1)
       {
        
        db.query("select * from edittimesheet", function (err, result) {
          if(result){
      
            return  res.send({message:"You have holiday on this day so any other AA_Type not Allowed Expect Regular Hours"});
                }
      
      
        });
       }
      
       else if(SickHrs===1&&AA_Type!=="Regular Hours"&&AA_Type!=="Holiday")
       {
        db.query("select * from edittimesheet", function (err, result) {
          if(result){
      
          return  res.send({message:"You need to enter 4Hrs OR 8Hrs per "+AA_Type});
                }
      
      
        });
       }
         else if(k>0)
         {

           db.query(sql,[CreateEntry],
            (err,result)=>{

               if(result){
                // res.send({message:"Data Inserted Successfully"});


          if(l===1)
         {
           j=1;

        return  res.send({message:"Timesheet already submitted for this period"});
          }
          else{

          return  res.send({message:"Timesheet saved for this period"});
          }
         }
         else{
           console.log(err)
         }
        }
         );

             }

          else if(j===0&&l===1)
             {

              db.query("select * from edittimesheet", function (err, result) {
                if(result){

                return  res.send({message:"Timesheet already submitted for this period"});
                      }


              });
             }

            })  }) 
        
        }
        else if(validateAATypes===1){

          db.query("select count(*) from aa_types",(err,result)=>{
            if(result){
    
              return res.send({message:"Dublicate AA_Type"})
    
    
            }
          })
    
        }
        else if(logHrs===1){
    
          db.query("select count(*) from aa_types",(err,result)=>{
            if(result){
    
              return res.send({message:"You can't report Zero hours"})
    
    
            }
          })
    
        }
        })

router.post("/superadminedittimesheet", (req, res) => {
          var TimeSheetarr=[];
          let k=0;
          let l=0;
          let j=0;
      let flag=0;
        
      

         let Holiday=0;
         var SubmittedBy = req.body.SubmittedBy;
      
            const myDate=req.body.myDate;
            const id=req.body.id;
            const taskList=req.body.taskList;
            let EmployeeGroup=req.body.EmployeeGroup;
            var AATypes = []
            let logHrs=0;
            var validateAATypes = 0
            let Total=0
            
            
              for(let i=0;i<taskList.length;i++){
               if(!AATypes.includes(taskList[i].AA_Types))
               {
                 if(taskList[i].Sunday==="")
                 {
                   taskList[i].Sunday=0;
                 }
                 if(taskList[i].Monday==="")
                 {
                   taskList[i].Monday=0;
                 }
                 if(taskList[i].Tuesday==="")
                 {
                   taskList[i].Tuesday=0;
                 }
                 if(taskList[i].Wednesday==="")
                 {
                   taskList[i].Wednesday=0;
                 }
                 if(taskList[i].Thursday==="")
                 {
                   taskList[i].Thursday=0;
                 }
                 if(taskList[i].Friday==="")
                 {
                   taskList[i].Friday=0;
                 }
                 if(taskList[i].Saturday==="")
                 {
                   taskList[i].Saturday=0;
                 }
                 AATypes.push(taskList[i].AA_Types)
                 Total=parseFloat(taskList[i].Sunday)+parseFloat(taskList[i].Monday)+parseFloat(taskList[i].Tuesday)+parseFloat(taskList[i].Wednesday)+parseFloat(taskList[i].Thursday)+parseFloat(taskList[i].Friday)+parseFloat(taskList[i].Saturday)
                 if(Total===0)
                 {
                 logHrs=1;
               
                     }
                }else{
           
                 validateAATypes=1;
                 break;
           
               }
               }
           
         
             if(validateAATypes!==1 && logHrs!==1){
             


               db.query("select * from edittimesheet WHERE UserId=? AND Date=?",[id,myDate], function (err, TimeSheet) {
                 if (err) throw err;
                 for(var i=0;i<TimeSheet.length;i++)
                 {
                 TimeSheetarr[i]=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types;



                 }

                 var CurrentDate = new Date();
                 let CurrentDate1=""
             
                 const submit=req.body.Submit
                 if(submit==="Approval")
                 {
                  CurrentDate1=CurrentDate
                 }
                 else{
                  CurrentDate1="*";
                 }
                

               global.uid=req.body.id

               let DeleteArr=[];
               let DublicateEntry=[];
               let CreateEntry=[];
               let SickHrs=0;
               let VacationHrs=0;
               const len = taskList.length;
               let AA_Type=""
               let hrsgreaterthan24=0;
               let Weekends=0;
               let Sunday=0;
               let Monday=0;
               let Tuesday=0;
               let Wednesday=0;
               let Thursday=0;
               let Friday=0;
               let Saturday=0;
               let AA_Type_Sunday="";
               let AA_Type_Monday="";
               let AA_Type_Tuesday="";
               let AA_Type_Wednesday="";
               let AA_Type_Thursday="";
               let AA_Type_Friday="";
               let AA_Type_Saturday="";
               let WeekAA_Type="";
               var queries = '';
             
              let Create=0;
              let Update=0;
            let Holiday1=0

               let SundayDate=req.body.myDate;
            
               var d = new Date(SundayDate)
               let MondayDate=new Date(d.setDate(d.getDate() + 1))
               MondayDate= Moment(MondayDate).format('MMM DD yyyy')
        let TuesdayDate=new Date(d.setDate(d.getDate() + 1))
        TuesdayDate= Moment(TuesdayDate).format('MMM DD yyyy')
        let WednesdayDate=new Date(d.setDate(d.getDate() + 1))
        WednesdayDate= Moment(WednesdayDate).format('MMM DD yyyy')
        let ThursdayDate=new Date(d.setDate(d.getDate() + 1))
        ThursdayDate= Moment(ThursdayDate).format('MMM DD yyyy')
        let FridayDate=new Date(d.setDate(d.getDate() + 1))
        FridayDate= Moment(FridayDate).format('MMM DD yyyy')
        let SaturdayDate=new Date(d.setDate(d.getDate() + 1))
        SaturdayDate= Moment(SaturdayDate).format('MMM DD yyyy')

        let WeekDays=[SundayDate,MondayDate,TuesdayDate,WednesdayDate,ThursdayDate,FridayDate,SaturdayDate]
        let WeekDates=[];
      

   
           

              
                    db.query("SELECT * FROM holiday",function(err,holiday){
                   
try{
                  for(var i=0;i<len;i++){

          if(taskList[i].Sunday===""){taskList[i].Sunday=0;}
          if(taskList[i].Monday===""){taskList[i].Monday=0;}
          if(taskList[i].Tuesday===""){taskList[i].Tuesday=0;}
          if(taskList[i].Wednesday===""){taskList[i].Wednesday=0;}
          if(taskList[i].Thursday===""){taskList[i].Thursday=0;}
          if(taskList[i].Friday===""){taskList[i].Friday=0;}
          if(taskList[i].Saturday===""){taskList[i].Saturday=0;}
          let WeekHrs=[taskList[i].Sunday,taskList[i].Monday,taskList[i].Tuesday,taskList[i].Wednesday,taskList[i].Thursday,taskList[i].Friday,taskList[i].Saturday]
          if(!DublicateEntry.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types))
          {
            DublicateEntry.push(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types)

          if(!TimeSheetarr.includes(id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types))
          {


        Create=1;
           DeleteArr[i]=id+"^"+myDate+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types;
           CreateEntry.push(new Array(id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",SubmittedBy,EmployeeGroup,"*","DENTSPLY",CurrentDate1));
          }
          else{

        Update=1;

           DeleteArr[i]=taskList[i].UserId+"^"+taskList[i].Date+"^"+taskList[i].Location+"^"+taskList[i].Country+"^"+taskList[i].AA_Types;
          queries += mysql.format("UPDATE edittimesheet SET UserId=?,Date=?,Country=?,Sunday=?,Cmt1=?,Monday=?,Cmt2=?,Tuesday=?,Cmt3=?,Wednesday=?,Cmt4=?,Thursday=?,Cmt5=?,Friday=?,Cmt6=?,Saturday=?,Cmt7=?,Submit=?,Location=?,AA_Types=?,Remarks=?,SubmittedBy=?,EmployeeGroup=?,Shift=?,Company=?,TimeStamp=? WHERE UserId=? AND Date=? AND Country=? AND Location=? AND AA_Types=?;",[id,myDate,taskList[i].Country,taskList[i].Sunday,taskList[i].Cmt1,taskList[i].Monday,taskList[i].Cmt2,taskList[i].Tuesday,taskList[i].Cmt3,taskList[i].Wednesday,taskList[i].Cmt4,taskList[i].Thursday,taskList[i].Cmt5,taskList[i].Friday,taskList[i].Cmt6,taskList[i].Saturday,taskList[i].Cmt7,submit,taskList[i].Location,taskList[i].AA_Types,"",SubmittedBy,EmployeeGroup,"*","DENTSPLY",CurrentDate1,id,myDate,taskList[i].Country,taskList[i].Location,taskList[i].AA_Types])



         }
        }
      
          if(parseFloat(taskList[i].Sunday)>24||parseFloat(taskList[i].Monday)>24||parseFloat(taskList[i].Tuesday)>24||parseFloat(taskList[i].Wednesday)>24||parseFloat(taskList[i].Thursday)>24||parseFloat(taskList[i].Friday)>24||parseFloat(taskList[i].Saturday)>24)
          {
            hrsgreaterthan24=1;
          }
          if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
          {

            for(let H=0;H<holiday.length;H++)
            {
            for(let W=0;W<WeekDays.length;W++)
            {
            if((WeekDays[W]===holiday[H].Date))
              {
               if(WeekHrs[W]!==""&&WeekHrs[W]!=="0"&&WeekHrs[W]!==0)
               {
                  Holiday1=1;

               }
              }
            }
          }
        }
        if(taskList[i].AA_Types==="Holiday")
          {
            let HolidayArr=[]
        
            for(let H=0;H<holiday.length;H++)
            {
        HolidayArr[H]=Moment(holiday[H].Date).format("MMM DD YYYY");
      


            }

           for(let W=0;W<WeekDays.length;W++)
           {

        WeekDays[W]=Moment(WeekDays[W]).format("MMM DD YYYY");





              if(!(HolidayArr.includes(WeekDays[W])))
              {
           if(WeekHrs[W]!=="0"&&WeekHrs[W]!==""&&WeekHrs[W]!==0)
           {

                  Holiday=1;
           }

              }
            

          }

        }
          if(taskList[i].AA_Types==="Regular Hours")
          {

          Sunday=Sunday+parseFloat(taskList[i].Sunday);
          Monday=Monday+parseFloat(taskList[i].Monday);
          Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
          Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
          Thursday=Thursday+parseFloat(taskList[i].Thursday);
          Friday=Friday+parseFloat(taskList[i].Friday);
          Saturday=Saturday+parseFloat(taskList[i].Saturday);

          }
          else{
            if(taskList[i].AA_Types!=="Holiday"&&taskList[i].AA_Types!=="Regular Hours")
            {

            if(parseFloat(taskList[i].Sunday)!==0)
            {
              AA_Type_Sunday=taskList[i].AA_Types;
             Sunday=Sunday+parseFloat(taskList[i].Sunday);
            }
            if(parseFloat(taskList[i].Monday)!==0)
            {
              AA_Type_Monday=taskList[i].AA_Types;
            Monday=Monday+parseFloat(taskList[i].Monday);
            }
            if(parseFloat(taskList[i].Tuesday)!==0)
            {
              AA_Type_Tuesday=taskList[i].AA_Types;
            Tuesday=Tuesday+parseFloat(taskList[i].Tuesday);
            }
            if(parseFloat(taskList[i].Wednesday)!==0)
            {
              AA_Type_Wednesday=taskList[i].AA_Types;
            Wednesday=Wednesday+parseFloat(taskList[i].Wednesday);
            }
            if(parseFloat(taskList[i].Thursday)!==0)
            {
              AA_Type_Thursday=taskList[i].AA_Types;
            Thursday=Thursday+parseFloat(taskList[i].Thursday);
            }
           if(parseFloat(taskList[i].Friday)!==0)
           {
            AA_Type_Friday=taskList[i].AA_Types;
           Friday=Friday+parseFloat(taskList[i].Friday);
           }
           if(parseFloat(taskList[i].Saturday)!==0)
           {
            AA_Type_Saturday=taskList[i].AA_Types;
           Saturday=Saturday+parseFloat(taskList[i].Saturday);
           }
            }}


            if(taskList[i].AA_Types!=="Regular Hours"&&taskList[i].AA_Types!=="Holiday")
                    {
                if(parseFloat(taskList[i].Sunday)>0||parseFloat(taskList[i].Saturday)>0)
                {
                   Weekends=1;
                   WeekAA_Type=taskList[i].AA_Types;

                }
              }
                if(taskList[i].AA_Types==="Jury Duty"||taskList[i].AA_Types==="Training"||taskList[i].AA_Types==="Travel")
                {
                    if(taskList[i].Sunday==="8"||taskList[i].Sunday==="4"||taskList[i].Sunday===0||taskList[i].Sunday==="0")
              {



               }
               else{
                AA_Type=taskList[i].AA_Types
            
                SickHrs=1;

              }
             if(taskList[i].Monday==="8"||taskList[i].Monday==="4"||taskList[i].Monday===0||taskList[i].Monday==="0")
              {

              }
              else{
                AA_Type=taskList[i].AA_Types
            
                SickHrs=1;
              }
             if(taskList[i].Tuesday==="8"||taskList[i].Tuesday==="4"||taskList[i].Tuesday===0||taskList[i].Tuesday==="0" )
              {

              }
              else{
                AA_Type=taskList[i].AA_Types
               
                SickHrs=1;
              }
               if(taskList[i].Wednesday==="8"||taskList[i].Wednesday==="4"||taskList[i].Wednesday===0||taskList[i].Wednesday==="0")
              {

              }
              else{
                AA_Type=taskList[i].AA_Types
               
                SickHrs=1;
              }
                 if(taskList[i].Thursday==="8"||taskList[i].Thursday==="4"||taskList[i].Thursday===0||taskList[i].Thursday==="0" )
                {

                }
                else{
                  AA_Type=taskList[i].AA_Types
                 
                  SickHrs=1;
                }
                   if(taskList[i].Friday==="8"||taskList[i].Friday==="4"||taskList[i].Friday===0||taskList[i].Friday==="0" )
                  {

                 }
                 else{
                  AA_Type=taskList[i].AA_Types
              
                  SickHrs=1;
                }
                  if(taskList[i].Saturday==="8"||taskList[i].Saturday==="4"||taskList[i].Saturday===0||taskList[i].Saturday==="0" )
                 {

                }
                else{
                  AA_Type=taskList[i].AA_Types
                
                  SickHrs=1;
                }
              }
                  }

            





                
              }catch(err){

              }

                let lo=0;
          var sql="insert into edittimesheet(UserId,Date,Country,Sunday,Cmt1,Monday,Cmt2,Tuesday,Cmt3,Wednesday,Cmt4,Thursday,Cmt5,Friday,Cmt6,Saturday,Cmt7,Submit,Location,AA_Types,Remarks,SubmittedBy,EmployeeGroup,Shift,Company,TimeStamp) VALUES?";

          if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
          {
         
         lo=1;
          }


          if(Weekends===1&&WeekAA_Type!=="Regular Hours"&&WeekAA_Type!=="Holiday")
          {
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"Except Regular Hours you can't be entered on Weekends"});
                   }
    
    
           });
          }
         else if(Sunday>8&&(AA_Type_Sunday!=="Regular Hours"&&AA_Type_Sunday!==""&&AA_Type_Sunday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Sunday"});
                   }
    
    
           });
          }
          else if(Monday>8&&(AA_Type_Monday!=="Regular Hours"&&AA_Type_Monday!==""&&AA_Type_Monday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Monday"});
                   }
    
    
           });
          }
          else if(Tuesday>8&&(AA_Type_Tuesday!=="Regular Hours"&&AA_Type_Tuesday!==""&&AA_Type_Tuesday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Tuesday"});
                   }
    
    
           });
          }
          else if(Wednesday>8&&(AA_Type_Wednesday!=="Regular Hours"&&AA_Type_Wednesday!==""&&AA_Type_Wednesday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Wednesday"});
                   }
    
    
           });
          }
          else if(Thursday>8&&(AA_Type_Thursday!=="Regular Hours"&&AA_Type_Thursday!==""&&AA_Type_Thursday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Thursday"});
                   }
    
    
           });
          }
          else if(Friday>8&&(AA_Type_Friday!=="Regular Hours"&&AA_Type_Friday!==""&&AA_Type_Friday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Friday"});
                   }
    
    
           });
          }
          else if(Saturday>8&&(AA_Type_Saturday!=="Regular Hours"&&AA_Type_Saturday!==""&&AA_Type_Saturday!=="Holiday"))
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You can't enter more than 8 Hours on Saturday"});
                   }
    
    
           });
          }
          else if(Monday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Monday"});
                   }
    
    
           });
          }
          else if(Tuesday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Tuesday"});
                   }
    
    
           });
          }
          else if(Wednesday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Wednesday"});
                   }
    
    
           });
          }
          else if(Thursday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Thursday"});
                   }
    
    
           });
          }
          else if(Friday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Friday"});
                   }
    
    
           });
          }
          else if(Saturday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Saturday"});
                   }
    
    
           });
          }
          else if(Sunday>24)
          {
            flag=1;
           db.query("select * from edittimesheet", function (err, result) {
             if(result){
    
             return  res.send({message:"You have entered more than 24 Hrs on Sunday"});
                   }
    
    
           });
          }
     else if(hrsgreaterthan24===1)
     {
      flag=1;
      db.query("select * from edittimesheet", function (err, result) {
        if(result){
    
        return  res.send({message:"You have entered more than 24 Hrs on a Day"});
              }
    
    
      });
     }
     else if(Holiday===1)
     {
      db.query("select * from edittimesheet", function (err, result) {
        if(result){
    
          return  res.send({message:"No holidays in this current week"});
              }
    
    
      });
     }
     else if(Holiday1===1)
     {
      
      db.query("select * from edittimesheet", function (err, result) {
        if(result){
    
          return  res.send({message:"You have holiday on this day so any other AA_Type not Allowed Expect Regular Hours"});
              }
    
    
      });
     }
    
     else if(SickHrs===1&&AA_Type!=="Regular Hours"&&AA_Type!=="Holiday")
     {
      db.query("select * from edittimesheet", function (err, result) {
        if(result){
    
        return  res.send({message:"You need to enter 4Hrs OR 8Hrs per "+AA_Type});
              }
    
    
      });
     }
         else if(lo===1&&submit===1){
          db.query("select * from edittimesheet", function (err, result) {
            if(result){

            return  res.send({message:"TimeSheet Successfully Saved for this Period"});
                  }


          });
         }

         else if(lo===1&&(submit==="0"||submit==="Approval")){

          db.query("select * from edittimesheet", function (err, result) {
            if(result){

            return  res.send({message:"TimeSheet Successfully Submitted for this Period"});
                  }


          });
         }

         if(Weekends!==1&&hrsgreaterthan24!==1&&SickHrs!==1&&Holiday!==1&&flag!==1)
         {

      
           if(Update===1)
           {

          db.query(queries)
           }
          if(Create===1)
          {

         db.query(sql,[CreateEntry])
          }
          for(var i=0;i<TimeSheet.length;i++)
          {
            let key=TimeSheet[i].UserId+"^"+TimeSheet[i].Date+"^"+TimeSheet[i].Location+"^"+TimeSheet[i].Country+"^"+TimeSheet[i].AA_Types;

            if(id===TimeSheet[i].UserId&&myDate.includes(TimeSheet[i].Date))
        {

          if(!DeleteArr.includes(key))
          {

          
            db.query("DELETE FROM edittimesheet WHERE UserId=? AND Date=? AND Location=? AND Country=? AND AA_Types=?",[id,myDate,TimeSheet[i].Location,TimeSheet[i].Country,TimeSheet[i].AA_Types])
          }
        }
          }
          }



              })
            }) 
        }
        else if(validateAATypes===1){

          db.query("select count(*) from aa_types",(err,result)=>{
            if(result){
    
              return res.send({message:"Dublicate AA_Type"})
    
    
            }
          })
    
        }
        else if(logHrs===1){
    
          db.query("select count(*) from aa_types",(err,result)=>{
            if(result){
    
              return res.send({message:"You can't report Zero hours"})
    
    
            }
          })
    
        }});


        async function send365Email_Submit(mail,CurrentWeekDate,subject) {


          const PASSWORD = '8074544656';
          const from="durga.avala@chachapoyaconsulting.com"
          const to=mail;
          const subject1=subject;
          //const subject="Timesheet submit pending"
          const html="<h5>"+CurrentWeekDate+" "+subject+"</h5>"
          try { 
          const transportOptions = {
          host: 'webmail',
          port: '587',
          auth: { user: from, pass: PASSWORD },
          secureConnection: false,
          tls: {
            rejectUnauthorized: false
          }
          };
      
          const mailTransport = nodemailer.createTransport(transportOptions);
      
          mailTransport.sendMail({
          from,
          to,
          replyTo: from,
          subject,
          html
          //text
          
          });
          console.log("credntials submit pending");
      } catch (err) { 
      console.error(`send365Email: An error occurred:`, err);
      }
      }// close of send365Email


//Below function for Start Date With Sunday Countries
function sunMails(){


  //Mail Notifications

let mail=[];var uid=[];array1=[],array2=[];
var CurrentDate = new Date();
var CurrentWeekDay = CurrentDate.getDay();

var CurrentWeekDate = new Date(
new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
);


var CurrentWeekDate = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0)).toDateString();
CurrentWeekDate=CurrentWeekDate.substring(4,15);


db.query("select edittimesheet.UserId,edittimesheet.Submit,edittimesheet.Date,user.uid,user.email from edittimesheet INNER JOIN user on edittimesheet.UserId=user.uid where Submit='1'and Date in (?)",[CurrentWeekDate,["DENTSPLY"]],function(err,result){
console.log(JSON.stringify(result)+"result")

if(result.length>0)
{
for(let i=0;i<result.length;i++)
mail[i]=result[i].email

console.log(mail+" mail all 1329 submit pending sun mails");

const subject="Timesheet Submit pending"
send365Email_Submit(mail,CurrentWeekDate,subject) 

}

})


}


cron.schedule('42 23 * * Friday', () => {
  sunMails()
});
module.exports = router;