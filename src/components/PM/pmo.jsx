import React, { useState,useEffect } from 'react';
import './createDeal.css'
import { url } from '../URL/url'
import Axios from 'axios';
import Moment from 'moment';
import { useHistory } from 'react-router';

import Select from 'react-select'
//import Header from "../header/header";
var users;

const PMO = ()=>{
const history = useHistory();
    
    
    const [Project1, setProject] = useState([]);
    const [projects, setProjects] = useState([]);
  
   

    const Role = localStorage.getItem("Role");
    const LoginId = localStorage.getItem('LoginId');
    const country = localStorage.getItem("Country")


    var project2=[]
        useEffect(() => {
        idsdropdown();
    }, [])
localStorage.setItem("projects",Project1)
    const idsdropdown = () => {
        
        //The below axios is used for getting all user id's
        
        Axios.get(url+"/DENTSPLY/pdashboard", {
            params:{
                Country:country,
                User:LoginId,
                Role:Role,
        }

        }).then((response) => {
        console.log("ids response ca: ",response.data.projectid)
            var ids = [];
         response.data.map(Project => { ids.push( Project.ProjectName) })
            users = ids.toString()

           
            setProjects(response.data.map(value =>({label:value.ProjectName,value:value.ProjectName})))
           
   
           
        }
        )

    }
    
    const Projectstate = (val)=>{
       
       
       setProject(val.value)
            }


//console.log(userid,"userid")

 const onHandleSubmit = (e) =>{
e.preventDefault();
console.log("vProjectalues: ",Project1)
  



if(project2 !== "" ){
    history.push("/Projectselect")
}else{
alert("User Mandatory");
 }
}

    return(

        <div style={{height:"100vh"}}>
             
           <div style={{display: "inline-flex", marginTop: "5%"}}>
           <div style={{alignItems: 'center',display: "flex"}}><br/>
        
                <label style={{color:"white", Fontweight:"100"}}>Select Project: </label>&nbsp;
                <div>
        <div>
        <Select className="test-select" autosize={true} options={projects} onChange={val => Projectstate(val) } placeholder="search Project..."/>

        </div>
    </div>
    <br/><br/>
            </div>
            
            
            
           &nbsp;&nbsp;
            <input type="submit" onClick={onHandleSubmit}/>
            </div>&nbsp;
         
        </div>
    )
}
export default PMO