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
        const project=localStorage.getItem("project")
        //const uid=localStorage.getItem("setuid")
        //console.log(uid,"uid")
        //uid=uid+1;
        
        const [Jobstate, setJobState]=useState({
       
            ClientName:"",
            ProjectName:"",
            Resources:"",
            ProjectStratDate:"",
            ProjectEndDate:"",
            Hours:"",
            HoursUsed:"",
            PercentageCompleted:"",
            Status:"",
            Comments:"",
            Showstopper:"",
            priority:""
            
        })
    

    //const [dealOwners1, setDealOwners1 ] = useState([])
    
const [resState,setResState]=useState([])
const [hrs,resHrs]=useState([]);
var Eid;

  
useEffect(() => {
    
    Axios.get(url+"/DENTSPLY/pselectdashboard", {
           
        params:{
           
            User:loginid,
           project:project
           
    }
    }).then((response) => {
        console.log(response,"response")
         for(let i=0;i<response.data.length;i++){
            console.log(response.data[i].ProjectName,"ProjectName");
            if(response.data[i].ProjectName===project)
            {
                //console.log("response all deals: ",response.data[i])
            
                var res=JSON.parse(response.data[i].Resources)
                console.log(res,"res")
                var resources=[]
                for(var j=0;j<res.length;j++){
                    resources.push(res[j]);
                }
                console.log(resources,"resources")
                setResState(resources)
                setJobState(response.data[i])
                resHrs(response.data[i].HoursUsed)
            }
            
                 
        }
      
    })


   




},[])


Axios.get(url+"/DENTSPLY/phours", {

    params:{
       
        User:loginid,
       project:project
       
} }).then((response) => {
console.log(response.data[0].Country,"response hours")
var hrs=parseInt(response.data[0].Monday)+parseInt(response.data[0].Tuesday)+parseInt(response.data[0].Wednesday)+parseInt(response.data[0].Thursday)+parseInt(response.data[0].Friday)+parseInt(response.data[0].Saturday)+parseInt(response.data[0].Sunday)
resHrs(hrs)
});


console.log(Jobstate,"Jobstate")
console.log(resState,"resState")


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
console.log(Jobstate,"jobstate",resState,"resState",hrs,"hrs");
        Axios.get(url+"/DENTSPLY/projectupdate",{
            params:{
                tasklistJob:Jobstate,
                tasklistRes:resState,
                tasklistHrs:hrs
            }
              }).then((response)=>{
               if(response) {
                
           console.log(response+"response ")
           if(response.data.message==="Project Information Updated")
        {
          alert(response.data.message)
          //setDealSelect("")
         history.push('/Header')
        }
            
              }
        })
        
    }


    return(
<div>
    <Header/>
    <br></br>
    <br></br>
        <div className="deal-create">

<center>
<h1> Project Information </h1>
</center>


<form onSubmit={handleSubmit} >

   
    <div className="deal-input-container">
        <label className="deal-input-label">Client Name<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="ClientName"
            value={Jobstate.ClientName}
            onChange={(e)=>JobState(e)}
            required 
            disabled
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
                value={Jobstate.ProjectName}
                onChange={(e)=>JobState(e)}
                required 
                disabled
                />
        </div>
    </div>

    <br/><br/>

    
   


    
   
    <div className="deal-input-container">
        <label className="deal-input-label">Resources<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
        <select name="Resources" className="deal-input-select"  onChange={(e)=>JobState(e)}>
        <option value={resState}>Resources</option>
       {resState.map(resource=>{
           return <option value={resource}>{resource}</option>
       })}
            </select>
        </div>
    </div>
  
   
   



    <div className="deal-input-container">
        <label className="deal-input-label">Project Start Date<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="date" 
                name="ProjectStartDate"
                value={Jobstate.ProjectStartDate}
                onChange={(e)=>JobState(e)}
                required 
                disabled
                />
        </div>
    </div>


    <br/><br/>


    <div className="deal-input-container">
        <label className="deal-input-label">Project End Date<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="date" 
                name="ProjectEndDate"
                value={Jobstate.ProjectEndDate}
                onChange={(e)=>JobState(e)}
                required 
                disabled
                />
        </div>
    </div>



   
    <br/><br/>






    <div className="deal-input-container">
        <label className="deal-input-label">Hours<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Hours"
                value={Jobstate.Hours}
                onChange={(e)=>JobState(e)}
                required 
                disabled
                />
        </div>
    </div>
 

    <br/><br/>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Hours Used<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="hrs"
                value={hrs}
                onChange={(e)=>JobState(e)}
                required 
                disabled
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Status<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Status"
                value={Jobstate.Status}
                onChange={(e)=>JobState(e)}
                required 
                />
        </div>
    </div>
    <br/><br/>

    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Percentage Completed<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="PercentageCompleted"
                value={Jobstate.PercentageCompleted}
                onChange={(e)=>JobState(e)}
              
                required 
                />
        </div>
    </div>
    <br/><br/>

    

    <div className="deal-input-container">
        <label className="deal-input-label">Comments<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Comments"
                value={Jobstate.Comments}
                onChange={(e)=>JobState(e)}
              
                required 
                />
        </div>
    </div>
    <br/><br/>

    <div className="deal-input-container">
        <label className="deal-input-label">Show Stopper<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="Showstopper"
                value={Jobstate.Showstopper}
                onChange={(e)=>JobState(e)}
              
                required 
                />
        </div>
    </div>


    <div className="deal-input-container">
        <label className="deal-input-label">Priority<super style={{color:"red"}}>*</super> : </label>
        <div className="deal-inputs">
            <input
                type="text" 
                name="priority"
                value={Jobstate.priority}
                onChange={(e)=>JobState(e)}
              
                required 
                />
        </div>
    </div>
<br></br>
<br></br>
   


<input type="submit" value="Submit"/>





</form>
        </div>
        </div>
    )
    
}

export default Empedit;