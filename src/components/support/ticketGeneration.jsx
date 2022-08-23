import { React, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import Header from '../header/header.jsx'
import validator from 'validator'

export default function TicketGeneration(){

const history = useHistory();
const Fname=localStorage.getItem("Fname")
const [createdBy,setCreatedBy]=useState(Fname)
const [createdDate,setCreatedDate]=useState('')
const [latestDate,setLatestDate]=useState('')
const [department,setDepartment]=useState('')
const [ status , setStatus ] = useState('');
const [email,setEmail]=useState('')
const [contactNo,setContactNo]=useState('')
const [issue,setIssue]=useState('')
const [description,setDescription]=useState('')
const [Priority,setPriority]=useState('')


const [emailError, setEmailError] = useState('')




const onTicketSubmit=(e)=>{
e.preventDefault();

console.log("createdBy: "+createdBy+"createdDate: "+createdDate+"latestDate: "+latestDate+"department: "+department+"email: "+email+"contactNo: "+contactNo+"issue: "+issue+"description: "+description)



Axios.post("http://localhost:3001/ticketGeneration",{
createdBy:createdBy,
createdDate:createdDate,
latestDate:latestDate,
department:department,
email:email,
contactNo:contactNo,
issue:issue,
description:description,
Priority:Priority,
EmployeeId:localStorage.getItem("LoginId"),
status:status


}).then((response)=>{
history.push('/header');

});


};


//below use effect used for unwanted render of functional component.
// useEffect(()=>{

// },[firstnameReg,lastnameReg,emailidReg,passwordReg,genderReg,mobilenoReg,roleReg])

//console.log("Role:",roleReg)

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
<select className="form-register-select" value={department} onChange={(e)=> setDepartment(e.target.value)} required>
<option value="">Choose Option</option>
{localStorage.getItem("Department")!=="FGRP"?
<option value="FGRP">Finance Group</option>
:""}
{localStorage.getItem("Department")!=="TGRP"?
<option value="TGRP">Timesheet Group</option>
:""}
{localStorage.getItem("Department")!=="IT"?
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
<label className="form-register-label">EMAIL<super style={{color:"red"}}>*</super> : </label>
</div>
<div>
<input
type="email"
value={email}
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
<select className="form-register-select" value={Priority} onChange={(e)=> setPriority(e.target.value)} required>
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
style={{padding:"3px", height:"50px", width:"190px", rows:"50", cols:"50"}}
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

