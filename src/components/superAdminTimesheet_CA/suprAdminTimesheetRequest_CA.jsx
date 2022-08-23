import Header from '../header/header'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import Axios from 'axios'
import { url } from '../URL/url' 
import {Link} from "react-router-dom";

var users;

const TimesheetRequest = ()=>{
const history = useHistory();
    
    
    const [userids, setUserIds] = useState([]);
    const [rWeek, setRWeek] = useState('');
    const [user, setUser] = useState('');
    const [ timesheetType, SetTimesheetType ] = useState('');
    const [hireDate, SetHireDate ] = useState('');
    const [employeeGroup, setEmployeeGroup ] = useState('');

    const Role = localStorage.getItem("Role");
    const LoginId = localStorage.getItem('LoginId');
    const country = localStorage.getItem("Country")

    useEffect(() => {
        idsdropdown();
    }, [])

    const idsdropdown = () => {
        
        //The below axios is used for getting all user id's
        
        Axios.get(url+"/DENTSPLY/idsdropdown", {
            params:{
                Country:country,
                User:LoginId,
                Role:Role,
        }

        }).then((response) => {
        console.log("ids response ca: ",response)
            var ids = [];
            response.data.map(id => { ids.push(id.uid + "-" + id.fname) })
            users = ids.toString()

           
            setUserIds(response.data.map(value =>({label:value.fname,value:value.uid+'^'+value.fname+'^'+value.HireDate+"^"+value.EmployeeGroup})));
            //setUserIds(pre => ([...pre,{label:'All',value:'All'}]))
           
        }
        )

    }

    const UserIds = (val) => {
        console.log("Selected value: ",val)
           
            setUser(val.value);
            const values = val.value.split('^')

            SetHireDate(values[2]) 
            setEmployeeGroup(values[3])
        
   
 }



 const validateHire = () =>{
    var hire= [];
    var week = [];
    var weekDate;
    var HireDate
if(hireDate !== "" && rWeek !== ""){
    hire=hireDate.split("-")
    week = rWeek.split("-")

    weekDate = new Date(week[0],week[1]-1, week[2]);
    HireDate = new Date(hire[0], hire[1]-1,hire[2]);
}else{
    return false;
}

if(weekDate>=HireDate){
    return true;
}else{
    return false;
}

 }

const validateWeek = () =>{
    //Current Week Modifications
	var CurrentDate = new Date();

    
    const year=CurrentDate.getFullYear();
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
     
if(rWeek !== ""){
    date = rWeek
}else{
    return false;
   
}
      var GivenDate = new Date(new Date(parseInt(date.substring(0,4)), parseInt(date.substring(5,7))-1, parseInt(date.substring(8,10))));
    
      var GivenWeekDay = GivenDate.getDay();
      
    
     
      var GivenWeekDate = new Date(
          new Date(GivenDate).setDate(GivenDate.getDate() - GivenWeekDay)
      );
      

      var GivenWeekDay1 = new Date(new Date(GivenWeekDate).setDate(GivenWeekDate.getDate() + 0)); 
      console.log("GivenWeek Day1",GivenWeekDay1)  
      if(GivenWeekDay1>=CurrenWeekDay1){
          return true;
      }else{
          return false;
      }

    }
 
 const onHandleSubmit = () =>{
//e.preventDefault();
console.log("values: ",user,rWeek,hireDate)
var validateHire1 = validateHire();
var validateWeek1 = validateWeek();   

console.log("validateHire: ",validateHire1)
console.log("validateWeek1: ",validateWeek1)

if(user !== "" && rWeek !== "" && timesheetType !==""){

    if(validateHire1 && validateWeek1){
        var data ={users:user,week:rWeek,hireDate:hireDate,EmployeeGroup:employeeGroup}
console.log("values: ",rWeek,user,timesheetType)
    
    if(timesheetType === "Create"){
        history.push({

            pathname: '/SuperAdminTimesheetCreate_CA',
           // search: '?update=true',  // query string
            state: {  // location state
              Data: data, 
            },
        })
    }


    if(timesheetType === "Edit"){
        history.push({

            pathname: '/SuperAdminTimesheetEdit_CA',
           // search: '?update=true',  // query string
            state: {  // location state
              Data: data, 
            },
        })
    }


}else{
    if(!validateHire1){ alert("Selected Week is Greate than Hire Date")}
    if(!validateWeek1){ alert("Selected Week Can not be allowed..")}
}



}else{
alert("User, Week and Timesheet Type are Mandatory");
 }
}

    return(

        <div style={{height:"100vh"}}>
            <Header />
           <div style={{display: "inline-flex", marginTop: "5%"}}>
           <div style={{alignItems: 'center',display: "flex"}}><br/>
                <label>Select User: </label>&nbsp;
    			<Select className="test-select" autosize={true} options={userids} onChange={val => UserIds(val) } placeholder="search name..."/>
            </div>
            
            <div>&nbsp;
                <label>Week/Date: </label>
              <input type="date" className="reports-request-date" required value={rWeek} onChange={(e) => { setRWeek(e.target.value) }} />
            </div>&nbsp;&nbsp;
            
            <div>
                <label>Timesheet Type: </label>
                <select className="reports-request-select" style={{padding: "10px 5px",height: "100%"}} value ={timesheetType} onChange={(e)=>{ SetTimesheetType(e.target.value)}}>
                    <option value="">Choose Option</option>
                    <option value="Create">Create</option>
                    <option value="Edit">Edit</option>
                </select>
            </div>&nbsp;&nbsp;
            <input type="submit" onClick={onHandleSubmit}/>
            </div>&nbsp;
         
        </div>
    )
}
export default TimesheetRequest