import React from 'react';
import Header from '../header/header.jsx'

import Axios from 'axios';

import {Link,useHistory} from 'react-router-dom';
import {useState,useEffect } from 'react';



const LoginId = localStorage.getItem('LoginId');
const Role = localStorage.getItem("Role");
const Fname = localStorage.getItem("Fname");
const Department = localStorage.getItem('Department');
const GroupTicketType = localStorage.getItem('GroupTicketType');




const TicketData = props => {
  
  const history=useHistory();
  //console.log("history",history.location.pathname)
  const [ClientData,setClientData]=useState([])

  useEffect(()=>{ 
    user();
  },[])

  const user = ()=>{
     
    Axios.get("http://localhost:3001/ITGroup", {
      params:{
 
      }
    }).then((response)=>{
     setClientData(response.data)
    
   
   
    }
   )
    }
    
 
   return props.ticketData.map((val,idx) => {
    let path="UpdateTicketGeneration"
    let paths="";
    paths= path+"/"+val.id;
   
  
    if(props.ticketData[0].id !=="" )
    {
        return (
     
            <tr key={val.index} >
             
              <td><Link to={paths}>{val.id}</Link></td>
              <td><Link to={paths}>{val.Description}</Link></td>
              <td><Link to={paths}>{val.Latest_Date}</Link></td>
              <td><Link to={paths}>{val.Status}</Link></td>
              <td><Link to={paths}>{val.createdby}</Link></td>
             
            <td>{val.Department}</td>
            
               <td><Link to={paths}>{val.Priority}</Link></td>
            
        
            {localStorage.getItem("Department") === val.Department && localStorage.getItem("LoginId") === val.Assigned?
      <td>Me</td> : <td>{val.Assigned}</td>
      }
            </tr>
           
            ); 
   
    
 
   
     }  })
   }



class Form extends React.Component {
 

  state = {
      
      ticketData:[{id:"",}],
      taskList:[{id:"",}],
      id:"",
      setUserIds:[],
      setUser1:'',
      setUser:'',
      user:"",
      status: "",
      priority: "",
      Assigned:"",
      AssignedTo:"",
      AssignedBy:"",
      
    
  };



handleChanges(property,value){
let prop = property;
let val = {}
val[property] = value;
this.setState(val)

  }

handleSearch = e =>{
  e.preventDefault();
if(localStorage.getItem("Role") !== "Manager" && localStorage.getItem("Department") === ""){

  let dbq;
if(this.state.status !== "")
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"+" and Status="+"\'"+this.state.status+"\'"

if(this.state.priority !== "")
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"+" and Priority="+"\'"+this.state.priority+"\'"

if(this.state.status !== "" && this.state.priority !== "")
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"+" and Priority="+"\'"+this.state.priority+"\'"+" and Status="+"\'"+this.state.status+"\'"

if(this.state.status === "All" || this.state.priority === "All")
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"

if(this.state.status === "All" && (this.state.priority !== "All" && this.state.priority !==""))
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"+" and Priority="+"\'"+this.state.priority+"\'"

if(this.state.priority === "All" && (this.state.status !== "All" && this.state.status !==""))
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+localStorage.getItem("LoginId")+"\'"+" and Status="+"\'"+this.state.status+"\'"

console.log("Query: ",dbq)

  Axios.get("http://localhost:3001/TicketIT",{
        params:{
               id:localStorage.getItem("Role"),  
               Query: dbq,  
        }
       
    }).then((response)=>{
      console.log("Response: ",response)
      
  
      if(response.data.length>0)
      {
      this.setState({ ticketData: response.data })
      }else{
        this.setState({ ticketData: response.data })
      }
 }
     )

}
if(localStorage.getItem("Role") !== "Manager" && localStorage.getItem("Department") !== ""){

  let dbq;

if(this.state.AssignedBy !== "")
dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+this.state.AssignedBy+"\'"

if(this.state.Assigned !== "")
dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"

if(this.state.AssignedBy !== "" && this.state.Assigned !== "")
dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"


if(this.state.AssignedBy === "All" || this.state.Assigned === "All")
dbq = "SELECT * FROM ticket WHERE Department="+"\'"+localStorage.getItem("Department")+"\'"

if(this.state.AssignedBy === "All" && (this.state.Assigned !== "All" && this.state.Assigned !==""))
dbq = "SELECT * FROM ticket WHERE Department="+"\'"+localStorage.getItem("Department")+"\'"+" and Assigned="+"\'"+this.state.Assigned+"\'"

if(this.state.Assigned === "All" && (this.state.AssignedBy !== "All" && this.state.AssignedBy !==""))
dbq = "SELECT * FROM ticket WHERE Department="+"\'"+localStorage.getItem("Department")+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"
console.log("Query: ",dbq)

  Axios.get("http://localhost:3001/TicketIT",{
        params:{
               id:localStorage.getItem("Role"),  
               Query: dbq,  
        }
       
    }).then((response)=>{
      console.log("Response: ",response)
      
  
      if(response.data.length>0)
      {
      this.setState({ ticketData: response.data })
      }else{
        this.setState({ ticketData: response.data })
      }
 }
     )

}
if(localStorage.getItem("Role") === "Manager"){

  let dbq;
  if(this.state.AssignedTo !== "")
  dbq = "SELECT * FROM ticket WHERE Department="+"\'"+this.state.AssignedTo+"\'"

  if(this.state.AssignedBy !== "")
  dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+this.state.AssignedBy+"\'"
  
  if(this.state.Assigned !== "")
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"

  if(this.state.AssignedBy !== "" && this.state.AssignedTo !== "")
  dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+this.state.AssignedBy+"\'"+" and Department="+"\'"+this.state.AssignedTo+"\'"

  if(this.state.AssignedBy !== "" && this.state.Assigned !== "")
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"
  
  if(this.state.Assigned !== "" && this.state.AssignedTo !== "")
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"+" and Department="+"\'"+this.state.AssignedTo+"\'"

  if(this.state.AssignedBy !== "" && this.state.Assigned !== "" && this.state.AssignedTo !== "")
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"+" and Department="+"\'"+this.state.AssignedTo+"\'"
  
  if(this.state.AssignedBy === "All"||this.state.Assigned === "All"||this.state.AssignedTo === "All")
  dbq = "SELECT * FROM ticket"
  
  if(this.state.AssignedBy === "All" && (this.state.AssignedTo !== "" && this.state.AssignedTo !== "All"))
  dbq = "SELECT * FROM ticket WHERE Department="+"\'"+this.state.AssignedTo+"\'"

  if(this.state.AssignedBy === "All" && (this.state.Assigned !== "" && this.state.Assigned !== "All"))
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"

  if(this.state.Assigned === "All" && (this.state.AssignedBy !== "" && this.state.AssignedBy !== "All"))
  dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+this.state.AssignedBy+"\'"

  if(this.state.Assigned === "All" && (this.state.AssignedTo !== "" && this.state.AssignedTo !== "All"))
  dbq = "SELECT * FROM ticket WHERE Department="+"\'"+this.state.AssignedTo+"\'"

  if(this.state.AssignedTo === "All" && (this.state.AssignedBy !== "" && this.state.AssignedBy !== "All"))
  dbq = "SELECT * FROM ticket WHERE EmployeeId="+"\'"+this.state.AssignedBy+"\'"

  if(this.state.AssignedTo === "All" && (this.state.Assigned !== "" && this.state.Assigned !== "All"))
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"

  if(this.state.AssignedTo === "All" && ((this.state.AssignedBy !== "" && this.state.AssignedBy !== "All") && (this.state.AssignedTo !== "" && this.state.AssignedTo !== "All")))
  dbq = "SELECT * FROM ticket WHERE Assigned="+"\'"+this.state.Assigned+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"

  if(this.state.Assigned === "All" && ((this.state.AssignedBy !== "" && this.state.AssignedBy !== "All") || (this.state.AssignedTo !== "" && this.state.AssignedTo !== "All")))
  dbq = "SELECT * FROM ticket WHERE Department="+"\'"+this.state.AssignedTo+"\'"+" and EmployeeId="+"\'"+this.state.AssignedBy+"\'"


console.log("Query: ",dbq)

  Axios.get("http://localhost:3001/TicketIT",{
        params:{
               id:localStorage.getItem("Role"),  
               Query: dbq,  
        }
       
    }).then((response)=>{
      console.log("Response: ",response)
      
  
      if(response.data.length>0)
      {
      this.setState({ ticketData: response.data })
      }else{
        this.setState({ ticketData: response.data })
      }
 }
     )

}

}//end of handleSearch
componentDidMount()
{
 
  Axios.get("http://localhost:3001/FromTicket",{
    params:{
           id:localStorage.getItem("LoginId"),
           role:localStorage.getItem("Role"),
           Department:localStorage.getItem("Department"),
         
          
    }
   
}).then((response)=>{
  
  if(this.state.taskList[0].id==="")
  {
   
    this.setState( ({
      taskList: []
    }));
  }


if(response.data.length>0)
{
this.setState({

  taskList: response.data


})
}

}
 )
  
}

  render() {

    let {ticketData}=this.state;
    let {taskList}=this.state;
    
let Dublicate=[];
 let Role=localStorage.getItem("Role")

  
 return(    
  <div>
    < Header/>


    <div>
    {localStorage.getItem("Role") === "Manager"? 

      
    <div style={{margin:"5% 5% 5% 5%"}}>
       <label className="search-label">AssignedTo: </label>
      <select className="ticket-slect" onChange={(e)=> this.handleChanges("AssignedTo",e.target.value)}>
        <option value="">Choose Option</option>
        <option value="All">All</option>
        {taskList.map((result) =>{
          
           if(!Dublicate.includes(result.Department))
           {
             Dublicate.push(result.Department)
            
            return <option value={result.Department} >{result.Department}</option>
           }
         }
       )}
      </select>&nbsp;&nbsp;
      <label className="search-label">AssignedBy: </label>
      <select className="ticket-slect" onChange={(e)=> this.handleChanges("AssignedBy",e.target.value)}>
        <option value="">Choose Option</option>
        <option value="All">All</option>
        {taskList.map((result) =>{
        
          if(!Dublicate.includes(result.EmployeeId)&&(this.state.AssignedTo === result.Department))
          {
            Dublicate.push(result.EmployeeId)
            return <option value={result.EmployeeId} >{result.EmployeeId}</option>
          }
         }
       )}
      </select>&nbsp;&nbsp;
     
      <label className="search-label">Assigned: </label>
      <select className="ticket-slect" onChange={(e)=> this.handleChanges("Assigned",e.target.value)}>
        <option value="">Choose Option</option>
        <option value="All">All</option>
       
        {taskList.map((result) =>{
         
           if(!Dublicate.includes(result.Assigned)&&(this.state.AssignedTo === result.Department))
           {
             Dublicate.push(result.Assigned)
            
            return <option value={result.Assigned} >{result.Assigned}</option>
           }
         }
       )}
      </select>&nbsp;&nbsp;
      <button className="ticket-search" onClick={this.handleSearch}>Search</button>
    </div>
:""}
{localStorage.getItem("Role") !== "Manager" && localStorage.getItem("Department") === "" ? 

<div style={{margin:"5% 5% 5% 5%"}}>
<label className="search-label">status: </label>
<select className="ticket-slect" onChange={(e)=> this.handleChanges("status",e.target.value)}>
  <option value="">Choose Option</option>
  <option value="All">All</option>
  <option value="New">New</option>
  <option value="Assigned">Assigned</option>
  <option value="Pending">Pending</option>
  <option value="Closed">Closed</option>
</select>&nbsp;&nbsp;
<label className="search-label">Priority: </label>
<select className="ticket-slect" onChange={(e)=> this.handleChanges("priority",e.target.value)}>
  <option value="">Choose Option</option>
  <option value="All">All</option>
  <option value="High">High Priority</option>
  <option value="Medium">Medium Priority</option>
  <option value="Low">Low Priority</option>
</select>&nbsp;&nbsp;
<button className="ticket-search" onClick={this.handleSearch}>Search</button>
</div>

: null}

{localStorage.getItem("Role") !== "Manager" && localStorage.getItem("Department") !== "" ? 

<div style={{margin:"5% 5% 5% 5%"}}>
<label className="search-label">AssignedBy: </label>
<select className="ticket-slect" onChange={(e)=> this.handleChanges("AssignedBy",e.target.value)}>
  <option value="">Choose Option</option>
  <option value="All">All</option>
  {taskList.map((result) =>{
             if(!Dublicate.includes(result.EmployeeId))
             {
               Dublicate.push(result.EmployeeId)
            return <option value={result.EmployeeId} >{result.EmployeeId}</option>
         }}
       )}
</select>&nbsp;&nbsp;
<label className="search-label">Assigned: </label>
<select className="ticket-slect" onChange={(e)=> this.handleChanges("Assigned",e.target.value)}>
<option value="">Choose Option</option>
<option value="All">All</option>
{taskList.map((result) =>{
               if(!Dublicate.includes(result.Assigned)&&localStorage.getItem("LoginId") === result.Assigned)
               {
                 Dublicate.push(result.Assigned)
            return <option value={result.Assigned} >{result.Assigned}</option>
         }
        }
       )}
 
</select>&nbsp;&nbsp;
<button className="ticket-search" onClick={this.handleSearch}>Search</button>
</div>

: null}



  <div style={{margin:"5% 5% 5% 5%"}}>
  {ticketData.length>0?
  <thead>
    <th className="required">Incident_Number</th>
    <th className="required">Description</th>
    <th className="required">LatestResponse</th>
    <th className="required">Status</th>
    <th className="required">AssignedBy</th>
    <th className="required">AssignedTo</th>
    <th className="required">Priority</th>
    <th className="required">Assigned</th>   
                                          
  </thead>
 
  :""}
 <tbody>
    <TicketData ticketData={ticketData} />
     </tbody> 
   </div>



   </div>


   </div>
  )
}}

export default Form;
