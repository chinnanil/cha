import React, { useState,useEffect } from 'react';
import './createDeal.css'
import { url } from '../URL/url'
import {Link, useHistory} from 'react-router-dom';
import Header from '../header/header.jsx'
import Axios from 'axios';
import Moment from 'moment';

import validator from 'validator'
import logo3 from '../images/Job_Info.png'

import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io'

const Empedit = (props)=>{
    const history = useHistory()
   const setDealSelect = props.job_info
   var loginid=localStorage.getItem("userid")
   console.log("loginid",loginid);
        const Role = localStorage.getItem("Role")
        //const uid=localStorage.getItem("setuid")
        //console.log(uid,"uid")
        //uid=uid+1;
        
    const [Jobstate, setJobState]=useState({
       
        fname:"",
        MiddleName:"",
        lname:"",
        gender:"",
        Role:"",
        Department:"",
        uid:"",
        Reports_To:"",
        Status:"",
        EmailIDJob:"",
        AadharCard:"",
        DateOfBirth:"",
        HireDate:"",
    
        ContactType:"",
        FullName:"",
        BloodGroup:"",
        EmailID:"",
        mobile:"",
    
        HouseNo:"",
        Street:"",
        State:"",
        ZipCode:"",
        Countryaddress:"",
        HouseNoTemp:"",
        StreetTemp:"",
        StateTemp:"",
        ZipCodeTemp:"",
        CountryTemp:"",
    
        
        MonthlyCTC:"",
        YearlyCTC:"",
        BASICSALARY:"",
        HRA:"",
        CONVEYANCE:"",
        SPECIALALLOWANCE:"",
        MEDICALALLOWANCE:"",
        LTA:"",
        PF:"",
        Total:"",
        RESIGNATIONDATE:"",
        NOOFWORKINGDAYS:"",
        NOOFDAYSPRESENT:"",
        ABSENTDAYS:"",
        LOPDAYS:"",
        BASICPAY:"",
        GROSSSALARY:"",
        PT:"",
        ESI:"",
        ITDEDUCTION:"",
        TOTALDEDUCTIONS:"",
        NETTSALARY:"",
        ESIGNATIC:"",
        PAYMENTMODE:"",
        BANK:"",
        IFSCCODE:"",
        ACCOUNTNO:"",
        PANNUMBER:"",
        UANNO:"",
        ESIACCNO:""

    })

    //const [dealOwners1, setDealOwners1 ] = useState([])
    const [uid, setuid ] = useState([])
   const [jobInfo,setJobInfo] = useState(false)
    const [empInfo,setEmpInfo] = useState(false)
    const [address,setaddress] = useState(false)
    const [PayrollDetails,setPayrollDetails] = useState(false)

var Eid;

  
useEffect(() => {
    
    Axios.get(url+"/DENTSPLY/empInfoEdit", {
           
        params:{
           
            User:loginid,
           
    }
    }).then((response) => {
        console.log("response users: ",response.data.Employeeid[0])
        
        setJobState(response.data.Employeeid[0])
      
    })
},[])

console.log(Jobstate,"Jobstate")

Eid=uid;
console.log(Eid+"Eid")
  







    const JobState = (e)=>{
       
       
let value =e.target.value;


console.log(value+"value aa")

setJobState({
        ...Jobstate,
        [e.target.name]:value})

console.log("jobDetails: ",Jobstate)
    }

    
    const dateFormats = (myDate)=>{
        if(myDate){
            var d = new Date(new Date(parseInt(myDate.substring(0,4)), parseInt(myDate.substring(5,7))-1, parseInt(myDate.substring(8,10))));
            return d;
        }else{alert("Date Should be mandatory")}

    }  


    const handleSubmit = (e)=>{
        e.preventDefault();

        Axios.get(url+"/DENTSPLY/EmpEditInfo",{
            params:{
                tasklistJob:Jobstate
            }
              }).then((response)=>{
               if(response) {
                
           console.log(response+"response ")
           if(response.data.message==="Employee Information Updated")
        {
          alert(response.data.message)
          //setDealSelect("")
         history.push('/Header')
        }
            
              }
        })
        
    }

const jobChange = (e)=>{
    e.preventDefault()
    setJobInfo(prev=>!prev)
}

const EmContactChange = (e)=>{
    e.preventDefault()
    setEmpInfo(prev=>!prev)
}

const Address = (e)=>{
    e.preventDefault()
    setaddress(prev=>!prev)
}
const PayrollInfo =(e)=>{
    e.preventDefault()
    setPayrollDetails(prev=>!prev)
} 

    return(
<div>
    <Header/>
    <br></br>
    <br></br>
        <div className="deal-create">

<center>
<h1> Employee Information </h1>
</center>


<form onSubmit={handleSubmit} >
{console.log(JSON.stringify(jobInfo)+"jobInfo2222")}
<div className="deal-addresource-container">
<label className="deal-addresource-label">Job Information: 
{jobInfo? 
    <IoIosRemoveCircle className="resource-icon" onClick={(e)=>jobChange(e)}/>
    :
    <IoIosAddCircle className="resource-icon" onClick={(e)=>jobChange(e)}/>
}
</label>
</div>

<br />
<br />
{jobInfo ?
    <div className="job-image">
    <div className="deal-input-container">
        <label className="deal-input-label">First Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="fname"
            value={Jobstate.fname}
            onChange={(e)=>JobState(e)}
            required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Middle Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="MiddleName"
                value={Jobstate.MiddleName}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Last Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="lname"
                value={Jobstate.lname}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>





    <div className="deal-input-container">
    <label className="deal-input-label">Gender<super style={{color:"red"}}>*</super> : </label>

    <select className="deal-input-select" 
    name="gender"
    value={Jobstate.gender}
    onChange={(e)=>JobState(e)}
    required>
    <option value="">Choose Option</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>


    </select>
    </div>

    <br/><br/>






    <div className="deal-input-container">
    <label className="deal-input-label">Position<super style={{color:"red"}}>*</super> : </label>

    <select className="deal-input-select" 
    name="Role"
    value={Jobstate.Role}
    onChange={(e)=>JobState(e)}
    required>
    <option value="">Choose Option</option>
    <option value="PracticeLead_Integrations">Practice Lead Integrations</option>
    <option value="Consultant_Integrations">Consultant Integrations</option>
    <option value="Trainee_Integrations">Trainee Integrations</option>
    <option value="Practice_Lead_SuccessFactors">Practice Lead SuccessFactors</option>
    <option value="Sr.Consultant_SuccessFactors">Sr.Consultant SuccessFactors</option>
    <option value="Consultant_SuccessFactors">Consultant SuccessFactors</option>
    <option value="Associate_consultant_SuccessFactors">Associate Consultant SuccessFactors</option>
    <option value="Trainee_SuccessFactors">Trainee SuccessFactors</option>
    <option value="PracticeLead_QATesting">Practice Lead QA Testing</option>
    <option value="Sr.Consultant_QATesting">Sr.Consultant QA Testing</option>
    <option value="Consultant_QATesting">Consultant QA Testing</option>
    <option value="FinanceAdmin">Finance Admin</option>
    <option value="HR">HR Admin</option> 
    

    </select>
    </div>

    <br/><br/>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Department<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Department"
                value={Jobstate.Department}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
    <label className="deal-input-label">Status<super style={{color:"red"}}>*</super> : </label>

    <select className="deal-input-select" 
    name="Status"
    value={Jobstate.Status}
    onChange={(e)=>JobState(e)}
    required>
    <option value="">Choose Option</option>
    <option value="A">Active</option>
    <option value="I">In Active</option>
    <option value="T">Termination </option>
    
    

    </select>
    </div>

    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Employee ID<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="uid"
                value={Jobstate.uid}
                onChange={(e)=>JobState(e)}
                disabled
                required 
                />
        </div>
    </div>
    <br/><br/>



    <div className="deal-input-container">
        <label className="deal-input-label">Reporting Manager<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Reports_To"
                value={Jobstate.Reports_To}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>



    <div className="deal-input-container">
        <label className="deal-input-label">E mail ID <super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="EmailIDJob"
                value={Jobstate.EmailIDJob}
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Aadhar Card <super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="AadharCard"
                value={Jobstate.AadharCard}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>


    <br/><br/>



    <div className="deal-input-container">
        <label className="deal-input-label">Date Of Birth<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="date" 
                name="DateOfBirth"
                value={Jobstate.DateOfBirth}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>
    <div className="deal-input-container">
        <label className="deal-input-label">Hire Date<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="date" 
                name="HireDate"
                value={Jobstate.HireDate}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
   
    <br/><br/>
</div>
:null}


<div className="deal-addresource-container">
    <label className="deal-addresource-label">Emergency Contact: 
    {empInfo?
        <IoIosRemoveCircle className="resource-icon" onClick={(e)=>EmContactChange(e)}/>
        :
        <IoIosAddCircle className="resource-icon" onClick={(e)=>EmContactChange(e)}/>
    }
    </label>
</div>
<br/>
<br/>
  
{empInfo ?
    <div className="Em-image">
    <div className="deal-input-container">
        <label className="deal-input-label">Contact Type<super style={{color:"red"}}>*</super> : </label>

        <select className="deal-input-select" 
        name="ContactType"
        value={Jobstate.ContactType}
        onChange={(e)=>JobState(e)}
        required>
        <option value="">Choose Option</option>
        <option value="Spouse">Spouse</option>
        <option value="Father">Father</option>
        <option value="Mother">Mother</option>
        <option value="Guardian">Guardian</option>
        <option value="Other">Other</option>
        </select>
    </div>

    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Full Name <super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="FullName"
                value={Jobstate.FullName}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>


    <br/><br/>

   

    <div className="deal-input-container">
        <label className="deal-input-label">Blood Group<super style={{color:"red"}}>*</super> : </label>

        <select className="deal-input-select" 
        name="BloodGroup"
        value={Jobstate.BloodGroup}
        onChange={(e)=>JobState(e)}
        required>
        <option value="">Choose Option</option>
        <option value="A">A+</option>
        <option value="A−">A−</option>
        <option value="B+">B+</option>
        <option value="B−">B−</option>
        <option value="AB+">AB+</option>
        <option value="AB−">AB−</option>
        <option value="O+">O+</option>
        <option value="O−">O−</option>

        </select>
    </div>

<br/><br/>





<div className="deal-input-container">
    <label className="deal-input-label">Email ID <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="Email"
           
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            value={Jobstate.Email}
            onChange={(e)=>JobState(e)}
            required 
            />
            
    </div>
</div>


<br/><br/>

    




    <div className="deal-input-container">
    <label className="deal-input-label">Phone Number<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="number" 
            name="mobile"
            pattern="^-?[0-9]\d*\.?\d*$"
            value={Jobstate.mobile}
            onChange={(e)=>JobState(e)}
            required 
            /> 
    </div>
</div>
<br/><br/>
    
</div>
:null}





<div className="deal-addresource-container">
<label className="deal-addresource-label">Address: 
{address?
    <IoIosRemoveCircle className="resource-icon" onClick={(e)=>Address(e)}/>
    :
    <IoIosAddCircle className="resource-icon" onClick={(e)=>Address(e)}/>
}
</label>
</div>

<br />
<br />


{address ?
    <div className="address-image" style={{backgroundColor:"grey;"}}>
    <label className="deal-addresource-label deal-addresource-container" style={{fontSize:"15px;"}} > Permanent Address </label>
    <div className="deal-input-container">
        <label className="deal-input-label">House No <super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="HouseNo"
                value={Jobstate.HouseNo}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
    <label className="deal-input-label">Street <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="Street"
            value={Jobstate.Street}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

    <br/><br/>

    <div className="deal-input-container">
    <label className="deal-input-label">State <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="State"
            value={Jobstate.State}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Zip Code <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ZipCode"
            value={Jobstate.ZipCode}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">Country <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="Country"
            value={Jobstate.Country}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>
   

    <br/><br/>

    <label className="deal-addresource-label deal-addresource-container" style={{fontSize:"15px;"}} > Temporary Address </label>

<div className="deal-input-container">
    <label className="deal-input-label">House No <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="HouseNoTemp"
            value={Jobstate.HouseNoTemp}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>


<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Street <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="StreetTemp"
            value={Jobstate.StreetTemp}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">State <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="StateTemp"
            value={Jobstate.StateTemp}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Zip Code <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ZipCodeTemp"
            value={Jobstate.ZipCodeTemp}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>



<div className="deal-input-container">
    <label className="deal-input-label">Country <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="CountryTemp"
            value={Jobstate.CountryTemp}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

</div>
:null}

{console.log(JSON.stringify(PayrollDetails)+"payrollInfo11")}
<div className="deal-addresource-container">
    <label className="deal-addresource-label">Payroll Information: 
    {PayrollDetails?
        <IoIosRemoveCircle className="resource-icon" onClick={(e)=>PayrollInfo(e)}/>
        :
        
        <IoIosAddCircle className="resource-icon" onClick={(e)=>PayrollInfo(e)}/>
    }
    {console.log(JSON.stringify(PayrollDetails)+"payrollInfo11")}
    </label>
</div>
<br/>
<br/>
  
{PayrollDetails?
    <div className="payroll-image">
    <div className="deal-input-container">
    <label className="deal-input-label">Monthly CTC <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="MonthlyCTC"
            value={Jobstate.MonthlyCTC}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>





<div className="deal-input-container">
    <label className="deal-input-label">Yearly CTC <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="YearlyCTC"
            value={Jobstate.YearlyCTC}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">BASIC SALARY <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="BASICSALARY"
            value={Jobstate.BASICSALARY}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">HRA <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="HRA"
            value={Jobstate.HRA}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>
<div className="deal-input-container">
    <label className="deal-input-label">CONVEIENCE <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="CONVEYANCE"
            value={Jobstate.CONVEYANCE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>
<div className="deal-input-container">
    <label className="deal-input-label">SPECIAL ALLOWANCE <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="SPECIALALLOWANCE"
            value={Jobstate.SPECIALALLOWANCE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">MEDICAL ALLOWANCE <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="MEDICALALLOWANCE"
            value={Jobstate.MEDICALALLOWANCE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">LTA <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="LTA"
            value={Jobstate.LTA}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">PF <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="PF"
            value={Jobstate.PF}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>



<div className="deal-input-container">
    <label className="deal-input-label">TOTAL <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="Total"
            value={Jobstate.Total}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">RESIGNATION DATE <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="RESIGNATIONDATE"
            value={Jobstate.RESIGNATIONDATE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">NO.OF WORKING DAYS <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="NOOFWORKINGDAYS"
            value={Jobstate.NOOFWORKINGDAYS}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>


<div className="deal-input-container">
    <label className="deal-input-label">NO. OF DAYS PRESENT <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="NOOFDAYSPRESENT"
            value={Jobstate.NOOFDAYSPRESENT}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">ABSENT DAYS <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ABSENTDAYS"
            value={Jobstate.ABSENTDAYS}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">LOP DAYS <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="LOPDAYS"
            value={Jobstate.LOPDAYS}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">BASIC PAY<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="BASICPAY"
            value={Jobstate.BASICPAY}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">GROSS SALARY<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="GROSSSALARY"
            value={Jobstate.GROSSSALARY}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">PT<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="PT"
            value={Jobstate.PT}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">ESI<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ESI"
            value={Jobstate.ESI}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">IT DEDUCTION<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ITDEDUCTION"
            value={Jobstate.ITDEDUCTION}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>


<br></br>
<br></br>

<div className="deal-input-container">
    <label className="deal-input-label">TOTAL DEDUCTIONS<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="TOTALDEDUCTIONS"
            value={Jobstate.TOTALDEDUCTIONS}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">NETT SALARY<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="NETTSALARY"
            value={Jobstate.NETTSALARY}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">ESIGNATIC<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ESIGNATIC"
            value={Jobstate.ESIGNATIC}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">PAYMENT MODE<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="PAYMENTMODE"
            value={Jobstate.PAYMENTMODE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">BANK<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="BANK"
            value={Jobstate.BANK}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">IFSC CODE<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="IFSCCODE"
            value={Jobstate.IFSCCODE}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">ACCOUNT NO<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ACCOUNTNO"
            value={Jobstate.ACCOUNTNO}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">PAN NUMBER<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="PANNUMBER"
            value={Jobstate.PANNUMBER}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">UAN NO<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="UANNO"
            value={Jobstate.UANNO}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>
<br></br>
<br></br>
<div className="deal-input-container">
    <label className="deal-input-label">ESI ACC NO<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ESIACCNO"
            value={Jobstate.ESIACCNO}
            onChange={(e)=>JobState(e)}
            required 
            />
    </div>
</div>

</div>
:null}


<br></br>
<br></br>


<input type="submit" value="Submit"/>





</form>
        </div>
        </div>
    )
    
}

export default Empedit;