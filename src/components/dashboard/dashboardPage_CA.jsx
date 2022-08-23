import React from 'react';
import Header from '../header/header.jsx'

import Axios from 'axios';
import {Launcher} from 'react-chat-window'
//import { withRouter } from 'react-router'
import { url } from '../URL/url'




class Form extends React.Component {
  
 
superAdmin=(e)=>{
 
  console.log("Submit",this.state.SuperAdmin)
  
     localStorage.setItem("SuperAdmin",this.state.SuperAdmin)
      
      this.props.history.push('/ManagerApprovalRequest_CA')
   
      if(this.state.SuperAdmin === "2"){
        this.props.history.push('/SuperAdminTimesheetRequest_CA')
      }
  
  
}

  state = {
      taskList:[{id:"",}],
      EmployeeData:[{id:"",}],
      ApprovalData:[{id:"",}],
      Submit:"",
      k:0,
      id:"",
      SuperAdmin: "",
      messageList: [],
      setUserIds:[],
      setUser1:'',
      setUser:'',
      user:"",
      evaluation:"false"
  };



  time=(e)=>{
    e.preventDefault();
  let lock=1

  this.setState({evaluation: true})

  const country = localStorage.getItem("Country")
  
  Axios.get(url+"/DENTSPLY/LockTimesheet",{
    params:
        {
            Lock: lock,
            Country:country,
        }
   
  }).then((response)=>{
      console.log(response)
      alert("To start Time Evaluation click on above link")
                //alert(response.data.message)
                //return  this.props.history.push('/dashboardPage')
});

  
  }

  Handle=(e)=>{
  const country = localStorage.getItem("Country")
  
    alert("Time evaluation process started")
  
  Axios.get(url+"/DENTSPLY/timeevaluation",{
   params:
   {
     country:country
   }
  }).then((response)=>{
    console.log("time evaluation response:",response.data.message)
    if(response.data.message === "Time Evaluation Completed"){
      this.timeout(e)
      alert("Time Evaluation Completed...")
    }

  })
  
  }
  
  timeout=(e)=>{
    e.preventDefault();
    let lock=0
    this.setState({evaluation: false})

    const country = localStorage.getItem("Country")
    
    Axios.get(url+"/"+country+"/LockTimesheet",{
      params:
          {
              Lock: lock,
              Country:country
          }
     
    }).then((response)=>{
      console.log(response)
      alert("Time Evaluation Process Stopped")
      //alert(response.data.message)
     // return  this.props.history.push('/dashboardPage')

    
    //alert("Time evaluation process stopped")
  
  
  
  });
 

  }


  handleRetro = (e)=>{
    e.preventDefault();
    this.props.history.push('/RetroRequest_CA')
      }

// let {history}=this.props
		componentDidMount()
        {
          const country = localStorage.getItem("Country")
         console.log("history",this.props.history)

        if(localStorage.getItem("Role")=="Manager"){
          
          Axios.get(url+"/DENTSPLY/ManagerApproval",{
            params:{
                   a:localStorage.getItem("LoginId"),
                   myDate:localStorage.getItem("WeekDate"),
                   submit:localStorage.getItem("Submit"),
                   country:country
                  
            }
           
        }).then((response)=>{
         
     
       
  if(response.data.length>0)
  {
  
  this.setState({
        
    taskList: response.data
    

      })
    }
  
     }
         )
         if(this.state.taskList[0].id==="")
         {
           
           this.setState( ({
             taskList: []
           }));
         }    
      
    }
    if(localStorage.getItem("Role")!=="Super Admin"&&localStorage.getItem("Role")!=="Manager"&&localStorage.getItem("Role")!=="Admin")
    {
      const country = localStorage.getItem("Country")
      Axios.get(url+"/DENTSPLY/UserDashBoard",{
        params:{
               a:localStorage.getItem("LoginId"),
               myDate:localStorage.getItem("WeekDate"),
               submit:localStorage.getItem("Submit"),
               country:country
              
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
//alert(response.data[0].Client)
 }
     )
  
}
if(localStorage.getItem("Role")!=="Super Admin"&&localStorage.getItem("Role")!=="Manager"&&localStorage.getItem("Role")!=="Admin")
{
  const country = localStorage.getItem("Country")
  Axios.get(url+"/DENTSPLY/UserDashBoardSubmit",{
    params:{
           a:localStorage.getItem("LoginId"),
           myDate:localStorage.getItem("WeekDate"),
           submit:localStorage.getItem("Submit"),
           country:country
          
    }
   
}).then((response1)=>{
  if(this.state.EmployeeData[0].id==="")
  {
  
    this.setState( ({
      EmployeeData: []
    }));
  }


if(response1.data.length>0)
{
this.setState({

  EmployeeData: response1.data


})
}
//alert(response.data[0].Client)
}
 )

}
if(localStorage.getItem("Role")!=="Super Admin"&&localStorage.getItem("Role")!=="Manager"&&localStorage.getItem("Role")!=="Admin")
{
  const country = localStorage.getItem("Country")
  Axios.get(url+"/DENTSPLY/UserDashBoardApproval",{
    params:{
           a:localStorage.getItem("LoginId"),
           myDate:localStorage.getItem("WeekDate"),
           submit:localStorage.getItem("Submit"),
           country:country
          
    }
   
}).then((response2)=>{
  if(this.state.ApprovalData[0].id==="")
  {
  
    this.setState( ({
      ApprovalData: []
    }));
  }


if(response2.data.length>0)
{
this.setState({

  ApprovalData: response2.data


})
}
//alert(response.data[0].Client)
}
 )

}
      
    }
    
     
    generateLinks()
    {
      
      console.log(this.state.taskList)
      let path='ManagerApprovalRequest_CA';
      let path1='UserDashBoard_CA';
      let path2='UserdashboardPage_CA';
      let links =[];
     
      if(localStorage.getItem("Role")==="Manager")
      {
       
     
    if(this.state.taskList.length>0)   {
        links.push(<a href={path}>Pending Approvals</a>)
        links.push(<br/>)
    }else
    {
     
      links.push(<a href={path}>No Pending Approvals</a>)
      links.push(<br/>)
    }
  }
  
  if(localStorage.getItem("Role")!=="Super Admin"&&localStorage.getItem("Role")!=="Manager"&&localStorage.getItem("Role")!=="Admin")
  {
   
   
    if(this.state.taskList.length>0)   {
      links.push(<a href={path}>Pending Reject TimeSheets</a>)
      links.push(<br/>)
  }
  if(this.state.EmployeeData.length>0)   {
    links.push(<a href={path1}>Pending Submit TimeSheets</a>)
    links.push(<br/>)
}
if(this.state.ApprovalData.length>0)   {
  links.push(<a href={path2}>Pending Approval TimeSheets</a>)
  links.push(<br/>)
}
if(this.state.EmployeeData.length===0&&this.state.taskList.length===0&&this.state.ApprovalData.length===0)
  {
  
    links.push(<a href={path}>No Pending </a>)
    links.push(<br/>)
  }

}
  

      return links;
    }
  



    _onMessageWasSent(message) {
      this.setState({
        messageList: [...this.state.messageList, message]
      })
    }
 
    _sendMessage(text) {
      if (text.length > 0) {
        this.setState({
          messageList: [...this.state.messageList, {
            author: 'them',
            type: 'text',
            data: { text }
          }]
        })
      }
    }

   

  render() {
 let generateLinks=this.generateLinks();
 let Role=localStorage.getItem("Role")

 const lockdisable = this.state.evaluation

 //console.log(generateLinks,"123")  
 return(    
  <div>
    < Header/>
  {Role==="Manager"?
  <div style={{display:"flex"}}>   
  <div className="links-component">
  <h3>Message Board:</h3>
  {this.generateLinks()}
  </div>
  </div>
:""}
  {Role==="Admin"?
  <div style={{display:"flex"}}> 

<div className="links-component">
  <h3>Message Board:</h3>
  {lockdisable === true ?
  <div>
   <a href='#' onClick={this.Handle}>Time Evaluation Process</a> 
   </div>:""} &nbsp;
   <span align="center">
     <button onClick={this.time}>LOCK</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     <button onClick={this.timeout}>UNLOCK</button>
     </span>
    <p style={{float:"left",fontSize:"12px",color:"red"}}>*To start Time Evaluation Click on Lock</p>
 <br />
 
  </div>


  <div className="links-component">
  <h3>Timesheet Retro</h3>
   <a href='#' onClick={this.handleRetro}>Click Here to Retro Timesheet</a> 
 <br/>
 
  </div>
  
  </div>


:""}
  {Role==="Super Admin"?
      <div className="superadmin-dashboard">
        <form>
       
          <select className="reports-request-select" style={{padding: "10px 5px",height: "100%"}} required onChange={(e)=>{this.setState({SuperAdmin:e.target.value})}}>
          <option value="">Choose Option</option>
            <option value="0">Pendig_Approvals</option>
            <option value="1">Pending_Submit</option>
          
            <option value="2">Employee Timesheet</option>
          </select>&nbsp;&nbsp;
     
				
                            
                  
                                       
          <input  type="submit" onClick={this.superAdmin}/>
        </form>
      </div>

:''}
 {Role!=="Manager"&&Role!=="Super Admin"&&Role!=="Admin"?
 <div style={{display:"flex"}}>   
 <div className="links-component">
 <h3>Message Board:</h3>
 {this.generateLinks()}
 </div>
 </div>
:""}

<Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />




      </div>
  )
}
}

export default Form;
