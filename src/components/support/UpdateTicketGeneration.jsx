import React,{useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import Header from "../header/header";
import validator from 'validator'

export default function UpdateRegistration () {

const history = useHistory();


const Fname=localStorage.getItem("Fname")
const [createdBy,setCreatedBy]=useState('')
const [createdDate,setCreatedDate]=useState('')
const [latestDate,setLatestDate]=useState('')
const [department,setDepartment]=useState('')
const [email,setEmail]=useState('')
const [contactNo,setContactNo]=useState('')
const [issue,setIssue]=useState('')
const [description,setDescription]=useState('')
const [Priority,setPriority]=useState('')
const [Id,setId]=useState('')
const [Resolution,setResolution]=useState('')
const [status,setStatus]=useState('')
const [Data,setData]=useState([])
const [value,setValue]=useState('');
const [EmployeeId,setEmployeeId]=useState('');


const [emailError, setEmailError] = useState('')

//const [regstatus,setRegStatus]=useState('')

var [uid,setUid]=useState(localStorage.getItem('myuserid'))

//This useEffect runs when the update request uid updates.
useEffect(() =>{
regDetails();
selectprofile();
},[])

const regDetails = () =>{

Axios.get("http://localhost:3001/selectTicket",{
params:{
a:history.location.pathname,
}

}

).then((response)=>{

console.log(response)
setIssue(response.data[0].issue);
setDescription(response.data[0].Description);
setCreatedDate(response.data[0].Date);
setLatestDate(response.data[0].Latest_Date);
setEmail(response.data[0].Email);
setPriority(response.data[0].Priority)
setContactNo(response.data[0].Mobile)
setDepartment(response.data[0].Department)
setCreatedBy(response.data[0].createdby)
setValue(response.data[0].Assigned)
setId(response.data[0].id);
setEmployeeId(response.data[0].EmployeeId)
setStatus(response.data[0].Status)


setUid(response.data[0].uid);

})
}
const selectprofile = () =>{

Axios.get("http://localhost:3001/deparment", {

params:{
Department:localStorage.getItem("Department"),
}
}).then((response)=>{
//console.log("UserIds from db:",response);
setData(response.data) ;
//console.log(response.data)
}
)
}

const onTicketSubmit=(e)=>{
e.preventDefault();





Axios.post("http://localhost:3001/tickeUpdation",{
id:history.location.pathname,

latestDate:latestDate,

description:description,
Assign:value,
status:status




}).then((response)=>{
history.push('/header');

});


};





function validateEmail(e){
e.preventDefault();
var email = e.target.value;
setEmail(e.target.value);

if (validator.isEmail(email)) {

setEmail(e.target.value);
setEmailError('')
} else {
setEmailError('Enter valid Email!')
}
}

if((localStorage.getItem("Department")==="IT"||localStorage.getItem("Department")==="TGRP"||localStorage.getItem("Department")==="FGRP")&&localStorage.getItem("LoginId")!==EmployeeId)
{
return(

<div>
<Header />

<div style={{display:"flex",marginLeft:"50px"}}>
<div class="ticket-generation">

<center>
<h1> Ticket Details </h1>
</center>

<form onSubmit={onTicketSubmit}>

<div className="ticket-form">
<div>
<label className="form-register-label">CreatedBy<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={createdBy}
readOnly
onChange= {(e) => {
setCreatedBy(e.target.value);
}} />
</div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Date(created)<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input type="date"
value={createdDate}
readOnly
onChange= {(e) => {
setCreatedDate(e.target.value);
}}
style={{width:"170px"}}
/>
</div>
</div>
<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Date(Latest Response )<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="date"
value={latestDate}

placeholder="Enter First Name"
name="firstname"
required
onChange= {(e) => {
setLatestDate(e.target.value);
}}
style={{width:"170px"}}
/></div>
</div>
<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Assign To(department)<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" readOnly value={department} onChange={(e)=> setDepartment(e.target.value)} required>
{localStorage.getItem("Department")==="FGRP"?
<option value="FGRP">Finance Group</option>
:""}
{localStorage.getItem("Department")==="TGRP"?
<option value="TGRP">Timesheet Group</option>
:""}
{localStorage.getItem("Department")==="IT"?
<option value="IT">IT Group</option>
:""}
</select>
</div>
</div>

<br/><br/>


<div className="ticket-form">
<div>
<label className="form-register-label">Status<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" value={status} onChange={(e)=> setStatus(e.target.value)} required>
<option value="">Choose Option</option>
<option value="New">New</option>
<option value="Assigned">Assigned</option>
<option value="Pending">Pending</option>
<option value="Closed">Closed</option>
</select>
</div>
</div>
<br/><br/>



<div className="ticket-form">
<div>
<label className="form-register-label">Assign<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" placeholder="select an option" value={value} onChange={(e) => setValue(e.target.value)} required>
<option value="">Choose Option</option>

{Data.map((result) =>{
return <option value={result.uid} >{result.uid+"-"+result.fname} </option>
})}

</select>
</div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">EMAIL<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="email"
value={email}
readOnly
placeholder="Enter Email"
name="Email Id"
required
pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
onChange= {validateEmail}
/><br/><span style={{
fontWeight: 'none',
color: 'red',
}}>{emailError}</span></div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Contact No<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={contactNo}
readOnly
placeholder="Enter Mobile no"
name="Mobile"
required
maxlength="10"
pattern="[7896][0-9]{9}"
onChange= {(e) => {
setContactNo(e.target.value);
}}
/></div>
</div>

<br/><br/>
<div className="ticket-form">
<div>
<label className="form-register-label">Priority<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" readOnly value={Priority} onChange={(e)=> setPriority(e.target.value)} required>
<option value="">Choose Option</option>
<option value="High">High Priority</option>
<option value="Medium">Medium Priority</option>
<option value="Low">Low Priority</option>
</select>
</div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Issue<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={issue}
readOnly
placeholder="Enter Issue"
required onChange= {(e) => {
setIssue(e.target.value);
}}

/></div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Description<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<textarea
type="textarea"
value={description}

placeholder="Enter Description"
style={{padding:"3px", height:"100px", width:"200px", rows:"50", cols:"50"}}
required onChange= {(e) => {
setDescription(e.target.value);
}}

/></div>
</div>

<br/><br/>
<input type="submit" value="Submit"/>

</form>
</div>
</div>
</div>
)
}
else{
return(

<div>
<Header />
<div style={{display:"flex",marginLeft:"50px"}}>
<div class="ticket-generation">

<center>
<h1> Ticket Details </h1>
</center>

<form onSubmit={onTicketSubmit}>

<div className="ticket-form">
<div>
<label className="form-register-label">CreatedBy<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={createdBy}
readOnly
onChange= {(e) => {
setCreatedBy(e.target.value);
}} />
</div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Date(created)<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input type="date"
value={createdDate}
readOnly
onChange= {(e) => {
setCreatedDate(e.target.value);
}}
style={{width:"170px"}}
/>
</div>
</div>
<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Date(Latest Response )<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="date"
value={latestDate}

placeholder="Enter First Name"
name="firstname"
required
onChange= {(e) => {
setLatestDate(e.target.value);
}}
style={{width:"170px"}}
/></div>
</div>
<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Assign To(department)<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" readOnly value={department} onChange={(e)=> setDepartment(e.target.value)} required>
<option value="">Choose Option</option>
<option value="FGRP">Finance Group</option>
<option value="TGRP">Timesheet Group</option>
<option value="IT">IT Group</option>

</select>
</div>
</div>
<br/><br/>
<div className="ticket-form">
<div>
<label className="form-register-label">Status<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" value={status} onChange={(e)=> setStatus(e.target.value)} required>
<option value="">Choose Option</option>
<option value="New">New</option>
<option value="Assigned">Assigned</option>
<option value="Pending">Pending</option>
<option value="Closed">Closed</option>
</select>
</div>
</div>
<br/><br/>



<div className="ticket-form">
<div>
<label className="form-register-label">EMAIL<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="email"
value={email}
readOnly
placeholder="Enter Email"
name="Email Id"
required
pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
onChange= {validateEmail}
/><br/><span style={{
fontWeight: 'none',
color: 'red',
}}>{emailError}</span></div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Contact No<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={contactNo}
readOnly
placeholder="Enter Mobile no"
name="Mobile"
required
maxlength="10"
pattern="[7896][0-9]{9}"
onChange= {(e) => {
setContactNo(e.target.value);
}}
/></div>
</div>

<br/><br/>
<div className="ticket-form">
<div>
<label className="form-register-label">Priority<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<select className="form-register-select" readOnly value={Priority} onChange={(e)=> setPriority(e.target.value)} required>
<option value="">Choose Option</option>
<option value="High">High Priority</option>
<option value="Medium">Medium Priority</option>
<option value="Low">Low Priority</option>
</select>
</div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Issue<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="text"
value={issue}
readOnly
placeholder="Enter Issue"
required onChange= {(e) => {
setIssue(e.target.value);
}}

/></div>
</div>

<br/><br/>

<div className="ticket-form">
<div>
<label className="form-register-label">Description<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<textarea
type="textarea"
value={description}

placeholder="Enter Description"
style={{padding:"3px", height:"100px", width:"200px", rows:"50", cols:"50"}}
required onChange= {(e) => {
setDescription(e.target.value);
}}

/></div>
</div>

<br/><br/>
<input type="submit" value="Submit"/>

</form>
</div>
</div>

</div>
)
}
}

