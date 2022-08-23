import React, { useState,useEffect } from 'react';
import './createDeal.css'
import { url } from '../URL/url'
import Axios from 'axios';
import Moment from 'moment';
import { useHistory } from 'react-router';
import validator from 'validator'
import logo3 from '../images/Job_Info.png'

import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io'

const Job_info = (props)=>{
    const history = useHistory()
   const setDealSelect = props.job_info
        const Role = localStorage.getItem("Role")
        //const uid=localStorage.getItem("setuid")
        //console.log(uid,"uid")
        //uid=uid+1;
        
    const [Jobstate, setJobState]=useState({
       
        FirstName:"",
        MiddleName:"",
        LastName:"",
        Gender:"",
        Position:"",
        Department:"",
        EmployeeID:"",
        ReportingManager:"",
        Status:"",
        EmailIDJob:"",
        AadharCard:"",
        DateOfBirth:"",
        HireDate:""
    })
    const [EmConstate, setEmConState]=useState({
        ContactType:"",
        FullName:"",
        BloodGroup:"",
        EmailID:"",
        PhoneNumber:""
    })
    const [Addressstate, setAddressState]=useState({
        HouseNo:"",
        Street:"",
        State:"",
        ZipCode:"",
        Country:"",
        HouseNoTemp:"",
        StreetTemp:"",
        StateTemp:"",
        ZipCodeTemp:"",
        CountryTemp:"",
    })
    const [PayInfo, setPayInfo]=useState({
        
        MonthlyCTC:"",
        YearlyCTC:"",
        BASICSALARY:"",
        HRA:"",
        CONVEIENCE:"",
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
    
    Axios.get(url+"/DENTSPLY/job_info", {
           
    }).then((response) => {
        console.log("response users: ",response.data)
        console.log(response.data.uid2);
        Eid=response.data.uid2
        console.log(Eid+"Eid")
        setuid(response.data.uid2)
      
    })
},[])


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

    const EmconState = (e)=>{
       
       
        let value =e.target.value;
        
        
        console.log(value+"value aa")
        
        setEmConState({
                ...EmConstate,
                [e.target.name]:value})
        
        console.log("emergencyDetails: ",EmConstate)
    }

    const AddressState = (e)=>{
       
       
        let value =e.target.value;
        
        
        console.log(value+"value aa")
        
        setAddressState({
                ...Addressstate,
                [e.target.name]:value})
        
        console.log("addressDetails: ",Addressstate)
    }


    const Payroll = (e)=>{
       
       
        let value =e.target.value;
        
        
        console.log(value+"value aa")
        
        setPayInfo({
                ...PayInfo,
                [e.target.name]:value})
        
        console.log("payinfoDetails: ",PayInfo)
    }
   


        
  
    const dateFormats = (myDate)=>{
        if(myDate){
            var d = new Date(new Date(parseInt(myDate.substring(0,4)), parseInt(myDate.substring(5,7))-1, parseInt(myDate.substring(8,10))));
            return d;
        }else{alert("Date Should be mandatory")}

    }  


    const handleSubmit = (e)=>{
        e.preventDefault();

        Axios.post(url+"/DENTSPLY/jobInfo",{
            id:localStorage.getItem('LoginId'),
            tasklistJob:Jobstate,
            tasklistempInfo:EmConstate,
            tasklistaddress:Addressstate,
            tasklistpayrollInfo:PayInfo,
            Empid:Eid
              }).then((response)=>{
               if(response) {
                
           console.log(response+"response ")
           if(response.data.message==="Candidate Information Created")
        {
          alert(response.data.message)
          //setDealSelect("")
         history.push('/header')
        }else if(response.data.message==="Already Deal Created"){
            alert(response.data.message)
            setDealSelect("")
              
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
                name="FirstName"
            value={Jobstate.FirstName}
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
                name="LastName"
                value={Jobstate.LastName}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>





    <div className="deal-input-container">
    <label className="deal-input-label">Gender<super style={{color:"red"}}>*</super> : </label>

    <select className="deal-input-select" 
    name="Gender"
    value={Jobstate.Gender}
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
    name="Position"
    value={Jobstate.Position}
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
    <option value="HR_Admin">HR Admin</option> 
    <option value="SalesAdmin">Sales Admnin</option>
    

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
                name="EmployeeID"
                value={Eid}
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
                name="ReportingManager"
                value={Jobstate.ReportingManager}
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
        value={EmConstate.ContactType}
        onChange={(e)=>EmconState(e)}
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
                value={EmConstate.FullName}
                onChange={(e)=>EmconState(e)}
                required 
                />
        </div>
    </div>


    <br/><br/>

   

    <div className="deal-input-container">
        <label className="deal-input-label">Blood Group<super style={{color:"red"}}>*</super> : </label>

        <select className="deal-input-select" 
        name="BloodGroup"
        value={EmConstate.BloodGroup}
        onChange={(e)=>EmconState(e)}
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
            name="EmailID"
           
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            value={EmConstate.EmailID}
            onChange={(e)=>EmconState(e)}
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
            name="PhoneNumber"
            pattern="^-?[0-9]\d*\.?\d*$"
            value={EmConstate.PhoneNumber}
            onChange={(e)=>EmconState(e)}
            required 
            /> 
    </div>
</div>
<br/><br/>
{console.log(EmConstate.PhoneNumber+"EmConstate.PhoneNumber"+EmConstate.EmailID+"EmConstate.EmailID"+EmConstate.BloodGroup+"EmConstate.BloodGroup"+EmConstate.FullName+"EmConstate.FullName"+EmConstate.ContactType+"EmConstate.ContactType")}
    
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
                value={Addressstate.HouseNo}
                onChange={(e)=>AddressState(e)}
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
            value={Addressstate.Street}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.State}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.ZipCode}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.Country}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.HouseNoTemp}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.StreetTemp}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.StateTemp}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.ZipCodeTemp}
            onChange={(e)=>AddressState(e)}
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
            value={Addressstate.CountryTemp}
            onChange={(e)=>AddressState(e)}
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
            value={PayInfo.MonthlyCTC}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.YearlyCTC}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.BASICSALARY}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.HRA}
            onChange={(e)=>Payroll(e)}
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
            name="CONVEIENCE"
            value={PayInfo.CONVEIENCE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.SPECIALALLOWANCE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.MEDICALALLOWANCE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.LTA}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.PF}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.Total}
            onChange={(e)=>Payroll(e)}
            required 
            />
    </div>
</div>
<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">RESIGNATION DATE <super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="date" 
            name="RESIGNATIONDATE"
            value={PayInfo.RESIGNATIONDATE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.NOOFWORKINGDAYS}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.NOOFDAYSPRESENT}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ABSENTDAYS}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.LOPDAYS}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.BASICPAY}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.GROSSSALARY}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.PT}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ESI}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ITDEDUCTION}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.TOTALDEDUCTIONS}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.NETTSALARY}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ESIGNATIC}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.PAYMENTMODE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.BANK}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.IFSCCODE}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ACCOUNTNO}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.PANNUMBER}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.UANNO}
            onChange={(e)=>Payroll(e)}
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
            value={PayInfo.ESIACCNO}
            onChange={(e)=>Payroll(e)}
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
    )
}
export default Job_info;