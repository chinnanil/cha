
import {useHistory} from 'react-router-dom';
import React, { useState} from "react";
import TimeSheet from '../menu/timesheetPage.jsx'
export default function RequestTimesheet(){

  const [myDate, setMyDate] = useState("");

  const history = useHistory();

 // localStorage.setItem('myDate', myDate);
  

 var hireDate = localStorage.getItem("HireDate")
  
  const validateHire = (gDate,hDate)=>{

    var validate = false;

    var hire= [];
    var week = [];
    var weekDate;
    var HireDate

    if(gDate !== "" && hDate !== ""){
    const hireDate = hDate;
    const givenDate = gDate;

    hire=hireDate.split("-")
    week = givenDate.split("-")
   
    
    weekDate = new Date(week[0],week[1]-1, week[2]);
  HireDate = new Date(hire[0], hire[1]-1,hire[2]);

  console.log("MHire:",HireDate)
  console.log("MWeek:",weekDate)

if(weekDate>=HireDate){
  validate = true;
}
}
return validate;
  }

const validateWeek = (gDate) =>{

  var validate = false;

//Current Week Modifications
var CurrentDate = new Date();

    
const year=CurrentDate.getFullYear()-1;
const month = CurrentDate.getMonth();
const day = CurrentDate.getDate();


var CurrentDate = new Date(new Date(parseInt(year), parseInt(month), parseInt(day)));

  var CurrentWeekDay = CurrentDate.getDay();
 
  var CurrentWeekDate = new Date(
      new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
  );
  
  var CurrenWeekDay1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() - 7));
console.log("CurrenWeekDay1: ",CurrenWeekDay1)

//Given Date modifications

var date = ""

if(gDate !== ""){
  date=gDate
 

  var GivenDate = new Date(new Date(parseInt(date.substring(0,4)), parseInt(date.substring(5,7))-1, parseInt(date.substring(8,10))));
  var GivenWeekDay = GivenDate.getDay();
  var GivenWeekDate = new Date(  new Date(GivenDate).setDate(GivenDate.getDate() - GivenWeekDay)  );
  var GivenWeekDay1 = new Date(new Date(GivenWeekDate).setDate(GivenWeekDate.getDate() + 0)); 
  console.log("GivenWeek Day1",GivenWeekDay1)  

  if(GivenWeekDay1>=CurrenWeekDay1){
    validate = true;
  }

}
return validate;

}




  const Requesttimesheet =(e)=>{
    e.preventDefault();

var validateHire1 = validateHire(myDate,hireDate);
console.log("validate hire 1: ",validateHire1)

var validateWeek1 = validateWeek(myDate)
console.log("validateWeek1: ",validateWeek1)
	

if(validateHire1 && validateWeek1){
history.push({
    pathname: '/Edit_CA',
  });
}else{
  if(!validateHire1){ alert("Selected week is greater than Hire Date") }
  if(!validateWeek1){ alert("Timesheet Not allowed for this week..") }
  
}

  localStorage.setItem('myDate', myDate);
  



  }




return(
    <div>

<TimeSheet/>

<center>
  <form onSubmit={Requesttimesheet}>
<div class="requesttimesheet" align="right">
<br></br><br></br>
<input type="date" name="myDate" required class="rdate" value={myDate} onChange={e => setMyDate(e.target.value)} />
{'          '}
<button type="submit" class="rbtn" >Submit</button>
</div>
</form>
</center>

</div>
)
}
