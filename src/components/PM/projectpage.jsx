import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import Header from "../header/header"
import Axios from 'axios';
import './createDeal.css'

import { url } from '../URL/url'


import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io'

const MyDeals = (props)=>{
    const history = useHistory()
   const setDealSelect = props.job_info
        const Role = localStorage.getItem("Role")
        var loginId = localStorage.getItem("LoginId")                                            
        var project =localStorage.getItem("projects") 
        
    const [ProjectDetails, setProjectDetails]=useState({
       
        ClientName:"",
        ProjectName:"",
        Resources:"",
        ProjectStartDate:"",
        ProjectEndDate:"",
        ProjectHours:"",
        ProjectUpdateHours:"",
        RemainingHours:"",
        ProjectStatus:"",
        PercentageCompleted:"",
        Comments:""
        
    })
    
    //const [dealOwners1, setDealOwners1 ] = useState([])
    
var Eid;

   

useEffect(() => {
    console.log("user id: ",loginId)
        
    Axios.get(url+"/DENTSPLY/pdashboard", {
        params:{
        id:loginId,
        PDetails:ProjectDetails
      
    }
      
            }).then((response) => {
                for(let i=0;i<response.data.length;i++){
                if(response.data[i].ProjectName===project)
                console.log("response all deals: ",response.data[i])
              
    
                setProjectDetails(response.data[i])
                   
                
                     
            }
            }
    
            )
}, [])




  







    const JobState = (e)=>{
       
       
let value =e.target.value;


console.log(value+"value aa")

setProjectDetails({
        ...ProjectDetails,
        [e.target.name]:value})

console.log("ProjectDetails: ",ProjectDetails)
    }

  

        
  
      


    const handleSubmit = (e)=>{
        e.preventDefault();

        Axios.post(url+"/DENTSPLY/jobInfo",{
            id:localStorage.getItem('LoginId'),
            tasklistProject:ProjectDetails,
           
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

/*const jobChange = (e)=>{
    e.preventDefault()
    setJobInfo(prev=>!prev)
}*/

/*const EmContactChange = (e)=>{
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
} */

    return(
<div>
        <Header />
        <br></br>
        <div className="deal-create">

<center>
<h1> Project Dashboard </h1>
</center>


<form onSubmit={handleSubmit} >

  
    <div className="deal-input-container">
        <label className="deal-input-label">Client Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ClientName"
            value={ProjectDetails.ClientName}
            onChange={(e)=>JobState(e)}
            required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Project Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ProjectName"
                value={ProjectDetails.ProjectName}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Resources<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Resources"
                value={ProjectDetails.Resources}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>





    <div className="deal-input-container">
    <label className="deal-input-label">Project Start Date<super style={{color:"red"}}>*</super> : </label>

    <div className="deal-inputs">
            <input
                type="date" 
                name="ProjectStartDate"
                value={ProjectDetails.ProjectStartDate}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>


    <div className="deal-input-container">
    <label className="deal-input-label">Project Start Date<super style={{color:"red"}}>*</super> : </label>

    <div className="deal-inputs">
            <input
                type="date" 
                name="ProjectEndDate"
                value={ProjectDetails.ProjectEndDate}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>

    <br/><br/>






       <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Project Hours<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ProjectHours"
                value={ProjectDetails.ProjectHours}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

   
    <div className="deal-input-container">
        <label className="deal-input-label">Project Updated Hours<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ProjectUpdateHours"
                value={ProjectDetails.ProjectUpdateHours}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Remaining Hours<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="RemainingHours"
                value={ProjectDetails.RemainingHours}
                onChange={(e)=>JobState(e)}
                disabled
                required 
                />
        </div>
    </div>
    <br/><br/>



    <div className="deal-input-container">
        <label className="deal-input-label">Project Status<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ProjectStatus"
                value={ProjectDetails.ProjectStatus}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>



    <div className="deal-input-container">
        <label className="deal-input-label">Percentage Completed<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="PercentageCompleted"
                value={ProjectDetails.PercentageCompleted}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>


    <div className="deal-input-container">
        <label className="deal-input-label">Comments <super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Comments"
                value={ProjectDetails.Comments}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>


    <br/><br/>



   
<br></br>
<br></br>


<input type="submit" value="Submit"/>





</form>
     </div> 
     </div>
    )
}
export default MyDeals;