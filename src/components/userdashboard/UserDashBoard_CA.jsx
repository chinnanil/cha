import React from 'react';
import Header from '../header/header.jsx'
import Axios from 'axios';
import {useHistory} from "react-router-dom"
import {useState,useEffect } from 'react';
import { url } from '../URL/url'

const TaskList = props => {
 console.log("tasklist")


 const history = useHistory();

const [ClientData,setClientData]=useState([])
useEffect(()=>{
    
  user();
 

 
  
},[])
const user = ()=>{
  const country = localStorage.getItem("Country")
  Axios.get(url+"/"+country+"/User", {
    params:{
  a:localStorage.getItem("LoginId"),
  country:country
    }
  }).then((response)=>{
   setClientData(response.data)
   console.log(response.data.Reports_To)
 
 
  }
 )
  }
	return props.taskList.map((val,idx) => {
  
     
  
	return (
    
	
	<tr key={val.index} >
     <td><input type="checkbox" checked={val.Checked} onChange={e => props.changes("Checked", "", idx)}/></td>
  <td>{val.UserId}</td>
 
  {localStorage.getItem("Role")==="Admin"&&val.Submit==="0"?
  <td>{ClientData.map((m)=>{
   {if(m.uid===val.Reports_To)
    return m.fname
  }
  })}</td>
  :""}
	<td>{val.Country}</td>
  <td>{val.Date}</td>
	
	<td>{val.Location}</td>
	<td>{val.AA_Types}</td>
	<td> {val.Sunday} 
   {val.Cmt1} </td>
	<td>{val.Monday} {val.Cmt2}</td>
	<td>{val.Tuesday} {val.Cmt3}</td>
	<td >{val.Wednesday} {val.Cmt4}</td>
	<td >{val.Thursday} {val.Cmt5}</td>
	<td>{val.Friday} {val.Cmt6}</td>
	<td>{val.Saturday} {val.Cmt7}</td>
  {localStorage.getItem("Role")==="Admin"||localStorage.getItem("Role")==="Manager"?
  <td><input type="text" class="comments" value={val.Remarks}    onChange={e => props.changes("Remarks",e.target.value,idx)}/></td>
 
 :""}
 
	</tr>
  
	);
	});
	
	
	};

class Form extends React.Component {
  
 

  state = {
      taskList: [{ 
        id:"",
      index: new Date().getTime(), 
      UserId:"",
      Date:"",
      Project:"",
      Shift_Premium:"none",
      Location:"",
      AA_Types:"",
      
      Monday: "",
      Cmt1: "",
      Tuesday: "",
      Cmt2: "",
      Wednesday:"",
      Cmt3: "",
      Thursday:"",
      Cmt4: "",
      Friday:"",
      Cmt5: "",
      Saturday:"",
      Cmt6: "",
      Sunday: "",
      Cmt7: "",
      Remarks:"",
      Checked: false
    }],
    enabledCheckBox: false,
      Submit:"",
      k:0,
      id:"",
      
  };


  handleChanges = (propertyName, Data, index) => {
    
    const allItems = this.state.taskList;
    let item

    if(propertyName !== "enableCheckBox")
    item = allItems[index];
    
    if(propertyName === "Checked"){

      item[propertyName]=!item[propertyName]
      allItems[index] = item;
      this.setState({taskList: allItems});
    }else if(propertyName === "enableCheckBox") {

      for(let i=0;i<allItems.length;i++){
        console.log("for loop")
      allItems[i].Checked=!this.state.enabledCheckBox;
      }
      this.setState({taskList: allItems,enabledCheckBox:!this.state.enabledCheckBox});
console.log("state after:",this.state)
    }else{
    item[propertyName] = Data;
    allItems[index] = item;
    this.setState({taskList: allItems});
    }
  };

 
  handleSubmit = e => {

    e.preventDefault();
    console.log("Submit",e.target.value)
  console.log("submit state:",this.state)
  const country = localStorage.getItem("Country")
     Axios.post(url+"/DENTSPLY/ApprovalTimeSheet",{
      
       taskList: this.state.taskList,
       id:localStorage.getItem("LoginId"),
       Submit:e.target.value,
        }).then((response)=>{
      
          if(response.data.message==="Please Select anyone of them")
          {
            alert(response.data.message)
          }
          // if(response.data.message==="Successfully Submitted")
          // {
          //   alert(response.data.message)
          // }
          else{
          alert("Successfully Submitted")
            this.props.history.push('/Header')
          }
      
          
         
        });
        };


        componentDidMount()
        {
          let Role=localStorage.getItem("Role");
          console.log("SuperAdmin",localStorage.getItem("SuperAdmin"))
    
   
if(Role!=="Admin"&&Role!=="Manager")
{
  const country = localStorage.getItem("Country")
  Axios.get(url+"/DENTSPLY/UserDashBoardSubmit",{
    params:{
           a:localStorage.getItem("LoginId"),
           country:country
           //SuperAdmin:localStorage.getItem("SuperAdmin"),
          
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

this.setState({taskList: response.data})

const allItems=this.state.taskList;

for(let i=0;i<this.state.taskList.length;i++){
// console.log("hello",response.data[0])
const item=allItems[i]
item["Checked"]=false;
allItems[i]=item;

//this.setState({...this.state.taskList[i][Checked],false})

}//end of for loop
this.setState({taskList: allItems});
console.log("Hello",this.state.taskList)
}
//alert(response.data[0].Client)
}
 )

}
       
    }  
     
    Sub=(e)=>{
      //console.log("Submit",e.target.value)
      const country = localStorage.getItem("Country")
      Axios.post(url+"/DENTSPLY/ApprovalTimeSheet",{
        taskList: this.state.taskList,
       id:localStorage.getItem("LoginId"),
         Submit:e.target.value,
         }).then((response)=>{
        if(response.data.message==="Please fill the Remarks field")
        {
        
           alert(response.data.message)
        }
        else if(response.data.message==="Please Select anyone of them")
        {
          alert(response.data.message)
        }
        else{
          alert("Successfully Submitted")
          this.props.history.push('/Header')
        }
          
         });
    }
 /*   onClick={e=>{this.onClick(e)}}
    onClick = (e) => {
      console.log("checkedAll")
      e.preventDefault();
        this.setState(...this.state.enabledCheckBox, !this.state.enabledCheckBox)

       
      };
      onClick = (e) => {
        //e.preventDefault();
        console.log("state before:",this.state)
          this.setState({enabledCheckBox: !this.state.enabledCheckBox}) 
         console.log("state after enable box:",this.state)
const enableBox = this.state.enabledCheckBox;
console.log("enableBox:",enableBox)

const allItems = this.state.taskList;
/*if(enableBox === true){


}
for(let i=0;i<allItems.length;i++){
  console.log("for loop")
allItems[i].Checked=enableBox;

}
this.setState({taskList: allItems});
console.log("checked all state:",this.state)
        };*/
  render() {
   

	let { taskList } = this.state;
  //let i=links[0]
  let Role=localStorage.getItem("Role");
  
  
// let Arr=[];
// Arr=this.props.history.push.location.pathname.split("/")
// console.log("hello",Arr[2])
      return (
     
          <div>
         
        < Header/>
        {this.state.taskList.length>0?
             <form >
      <div class="Tcontainer" style={{overflow:"auto"}}>
     <br/>
     
                              <table className="table">
                            
								                    <thead>
                                      <tr>
                                        
                                        <th className="required"><input type="checkbox" onChange={e => this.handleChanges("enableCheckBox", "", "")}/></th>
                                          <th className="required">UserId</th>
                                        
                                          {Role==="Admin"&&localStorage.getItem("SuperAdmin")==="0"?
                                          <th className="required">Reports_To</th>
                                          :""}
                                          <th className="required">Client</th>
                                          <th className="required">WeekDate</th>
                                        
                                          <th className="required">Project</th>
                                          <th className="required">AA_Types</th>
                                          <th className="required">Sunday</th>
                                          <th className="required">Monday</th>
                                          <th className="required">Tuesday</th>
                                          <th className="required">Wednesday</th>
                                          <th className="required">Thursday</th>
                                          <th className="required">Friday</th>
                                          <th className="required">Saturday</th>
                                         
                                          {Role=="Admin"||Role==="Manager"?
                                          <th className="required">Remarks</th>
                                          :""}
                                         
                                      
                                      </tr> 
                                  </thead>
           {this.state.taskList!==""?                    
								  <tbody >
								  <TaskList

changes={this.handleChanges.bind(this)}
// Click={this.onClick.bind(this)}
taskList={taskList} checkedAll={this.state.enabledCheckBox}
/>
                                  </tbody>
                                 :""}
                                  </table>
                               
                                  </div><br/>
                          {Role==="Manager"||localStorage.getItem("SuperAdmin")==="0"?
                                  <div class="button">
                                  
                                         
                                     
                <button type="submit" name="Submit" value="Approval" className="btn btn-primary text-center" onClick={this.handleSubmit}>
                  Approval
                </button>&nbsp;&nbsp; 
           
             
         
      
            
                                     
              <button type="button" name="Submit" value="Reject" className="btn btn-primary text-center" onClick={this.Sub}>
                Reject
              </button>
       </div>
       :""}
          {(Role!=="Manager"&&Role!=="Admin")||localStorage.getItem("SuperAdmin")==="1"?
                                  <div class="button">
                                  
                                         
                                     
               
             
         
      
            
                                     
              <button type="button" name="Submit" value="0" className="btn btn-primary text-center" onClick={this.Sub}>
                Submit
              </button>
       </div>
       :""}
      
       </form>
         :""}
       </div>
        
           
 
                                  
            

                     
                        

      );

  }
}

export default Form;
