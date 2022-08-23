import React from 'react';
import Header from '../header/header.jsx'
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import Axios from 'axios';
import Moment from 'moment';
import TaskListEdit from './tasklistEdit_CA';
import TaskListSubmit from '../tasklistSubmit/TaskListSubmit_CA';

import { url } from '../URL/url'

//let k=localStorage.getItem("k");

class Form extends React.Component {
  
 

  state = {
      taskList: [{ 
      index: new Date().getTime(), 
      id:localStorage.getItem("LoginId"),
      Country:"",
   
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
        Cmt7: "",}],
      Submit:"",
      k:1,
      id:"",
      
  };

  

  addNewRow = () => {
    if(this.state.k===0)
    {
    let values = {
      index: new Date().getTime(), 
      id:localStorage.getItem("LoginId"),
   
      Country:"",
   
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
    };
  
    this.setState(prevState => ({
      taskList: [...prevState.taskList, values]
    }));
  };
  if(this.state.k===1)
  {
  let values = {
    index: new Date().getTime(), 
   
    Country:"",
   
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
  };


  this.setState(prevState => ({
    taskList: [...prevState.taskList, values]
  }));
};
  };


  
  clickOnDelete=(index)=> {
    
          //console.log("ids"+index)
          const allItems = [...this.state.taskList];
          allItems.splice(index,1);
          
          //console.log("idx123"+item);
          
          this.setState({
          
          // taskList: this.state.taskList.filter(r => r !== index),
          taskList: allItems
           
           });
          
           alert("TimeSheet Successfully Deleted")
    
    }
  
    handleChanges = (propertyName, Data, index) => {
    const allItems = this.state.taskList;
    let item = allItems[index];
    //console.log("item:"+item)
    item[propertyName] = Data;
    allItems[index] = item;
    console.log("allitems",allItems);
   
    this.setState({
      taskList: allItems
    });

    //console.log("inside", propertyName, Data, index);
  };

  handleSubmit = e => {


    e.preventDefault();
  
    var data = this.props.location.state.Data
        
    const user = data.users.split("^")[0]
    const employeeGroup = data.EmployeeGroup
    const country = localStorage.getItem("Country")
      Axios.post(url+"/DENTSPLY/superadminedittimesheet",{

       taskList: this.state.taskList,
        id:user,
        myDate:localStorage.getItem("WeekDate"),
        SubmittedBy:localStorage.getItem('LoginId'),
        Submit:1,
        EmployeeGroup:employeeGroup,
        country:country

        }).then((response)=>{
          if(response.data.message==="TimeSheet Successfully Saved for this Period")
          {
            alert(response.data.message)
         return  this.props.history.push('/Header')
          }
      
          else{
            alert(response.data.message)
          }
            
            
              
         
         
        });
        };
       
        componentDidMount()
        {


          var data = this.props.location.state.Data
          console.log("super admin data: ",data)
          const user = data.users.split("^")[0]
       

          const country = localStorage.getItem("Country")
          Axios.get(url+"/DENTSPLY/TimeSheetSelect",{
            params:{
                   a:user,
                   myDate:localStorage.getItem("WeekDate"),
                   submit:localStorage.getItem("Submit"),
                   country:country
                  
            }
           
        }).then((response)=>{
          console.log("edit response: ",response.data.length)
        
 
          
  for(var i=0;i<response.data.length;i++)
  {
    if(response.data[i].UserId===user&&response.data[i].Date===localStorage.getItem("WeekDate")&&(response.data[i].Submit==="1"||response.data[i].Submit==="Reject"))
    {
      this.setState({k:1})
   
    
    }
    if(response.data[i].UserId===user&&response.data[i].Date===localStorage.getItem("WeekDate")&&(response.data[i].Submit==="Approval"||response.data[i].Submit==="0"))
    {
      this.setState({k:2})
   
    }
  }

  if(response.data.length>0)
  {
   
  this.setState({ taskList: response.data })
    
    }
    
     }
         )
        
    }

    Sub=(e)=>{

      
      var validate = true

      for(let i=0;i<this.state.taskList.length;i++){
        if((this.state.taskList[i].AA_Types !== "" && this.state.taskList[i].Location !== "" && this.state.taskList[i].Country !== "")){

        }else{
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Sunday !== ""||parseInt(this.state.taskList[i].Sunday) !== 0) && this.state.taskList[i].Cmt1 !== "")||((this.state.taskList[i].Sunday === ""||parseInt(this.state.taskList[i].Sunday) === 0) || this.state.taskList[i].Cmt1 !== ""))
        {
         
        }
        else{
         
         
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Monday !== ""||parseInt(this.state.taskList[i].Monday) !== 0) && this.state.taskList[i].Cmt2 !== "")||((this.state.taskList[i].Monday === ""||parseInt(this.state.taskList[i].Monday) === 0) || this.state.taskList[i].Cmt2 !== ""))
        {
         
        }
        else{
         
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Tuesday !== ""||parseInt(this.state.taskList[i].Tuesday) !== 0) && this.state.taskList[i].Cmt3 !== "")||((this.state.taskList[i].Tuesday === ""||parseInt(this.state.taskList[i].Tuesday) === 0) || this.state.taskList[i].Cmt3 !== ""))
        {
         
        }
        else{
       
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Wednesday !== ""||parseInt(this.state.taskList[i].Wednesday) !== 0) && this.state.taskList[i].Cmt4 !== "")||((this.state.taskList[i].Wednesday === ""||parseInt(this.state.taskList[i].Wednesday) === 0) || this.state.taskList[i].Cmt4 !== ""))
        {
         
        }
        else{
          
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Thursday !== ""||parseInt(this.state.taskList[i].Thursday) !== 0) && this.state.taskList[i].Cmt5 !== "")||((this.state.taskList[i].Thursday === ""||parseInt(this.state.taskList[i].Thursday) === 0) || this.state.taskList[i].Cmt5 !== ""))
        {
         
        }
        else{
        
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Friday !== ""||parseInt(this.state.taskList[i].Friday) !== 0) && this.state.taskList[i].Cmt6 !== "")||((this.state.taskList[i].Friday === ""||parseInt(this.state.taskList[i].Friday) === 0) || this.state.taskList[i].Cmt6 !== ""))
        {
         
        }
        else{
        
          validate = false;
          break;
        }
        if(((this.state.taskList[i].Saturday !== ""||parseInt(this.state.taskList[i].Saturday) !== 0) && this.state.taskList[i].Cmt7 !== "")||((this.state.taskList[i].Saturday === ""||parseInt(this.state.taskList[i].Saturday) === 0) || this.state.taskList[i].Cmt7 !== ""))
        {
         
        }
        else{
        
          validate = false;
          break;
        }
      }
      if(validate){
        var data = this.props.location.state.Data
        
        const user = data.users.split("^")[0]
        const employeeGroup = data.EmployeeGroup
      //console.log("Submit",e.target.value)
      const country = localStorage.getItem("Country")
      Axios.post(url+"/DENTSPLY/superadminedittimesheet",{

        taskList: this.state.taskList,
         id:user,
         myDate:localStorage.getItem("WeekDate"),
         SubmittedBy:localStorage.getItem('LoginId'),
         Submit:e.target.value,
         EmployeeGroup:employeeGroup,
         country:country
         }).then((response)=>{
       
          if(response.data.message==="TimeSheet Successfully Submitted for this Period")
          {
            alert(response.data.message)
         return  this.props.history.push('/Header')
          }
        
          else{
            alert(response.data.message)
          }
            
            
          
          
         });
        }else{
          alert("Please Enter Valid Fields")
        }
    }
   


  render() {
   
      
   
      var data = this.props.location.state.Data
      console.log("request data:",data)
     var myDate = data.week
     var user = data.users
     var user = data.users.split("^")[0]
     var fname = data.users.split("^")[1]
      var HireDate = data.hireDate;
     
      
      
      let { taskList } = this.state;
      let { id } = this.state;
      let {k}=this.state;

      let Role=localStorage.getItem("Role")

      var CurrentDate = new Date(new Date(parseInt(myDate.substring(0,4)), parseInt(myDate.substring(5,7))-1, parseInt(myDate.substring(8,10))));
    
      var CurrentWeekDay = CurrentDate.getDay();
      
     
      var CurrentWeekDate = new Date(
          new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
      );
      

     
      var Day1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0)).toDateString();
      var Day1_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0)).getMonth()+1
      var Day1_str = Day1.substring(0, 4) + Day1.substring(8, 11);
      var SundayDate = Day1.substring(4,15)
      var compareHireDay1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0))
      var Day1_AAType = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0))

      
      var Day2 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1)).toDateString();
      var Day2_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1)).getMonth()+1
      var Day2_str = Day2.substring(0, 4) + Day2.substring(8, 11);
      var MondayDate = Day2.substring(4,15)
      var compareHireDay2 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1))


      var Day3 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 2)).toDateString();
      var Day3_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 2)).getMonth()+1
      var Day3_str = Day3.substring(0, 4) + Day3.substring(8, 11);
      var TuesdayDate = Day3.substring(4,15)
      var compareHireDay3 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 2))

      var Day4 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 3)).toDateString();
      var Day4_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 3)).getMonth()+1
      var Day4_str = Day4.substring(0, 4) + Day4.substring(8, 11);
      var WednesdayDate = Day4.substring(4,15)
      var compareHireDay4 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 3))


      var Day5 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 4)).toDateString();
      var Day5_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 4)).getMonth()+1
      var Day5_str = Day5.substring(0, 4) + Day5.substring(8, 11);
      var ThursdayDate = Day5.substring(4,15)
      var compareHireDay5 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 4))


      var Day6 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 5)).toDateString();
      var Day6_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 5)).getMonth()+1
      var Day6_str = Day6.substring(0, 4) + Day6.substring(8, 11);
      var FridayDate = Day6.substring(4,15)
      var compareHireDay6 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 5))

      var Day7 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 6)).toDateString();
      var Day7_month = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 6)).getMonth()+1
      var Day7_str = Day7.substring(0, 4) + Day7.substring(8, 11);
      var SaturdayDate = Day7.substring(4,15)
      var compareHireDay7 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 6))


      var start_Date = Day1.substring(4,15);
      var end_Date = Day7.substring(4,15);
     
      //below code used for disable hour fields as per the given month
      var gmonth = CurrentDate.toDateString().substring(3, 7);//Selected Day Month
      var sun, mon, tue, wed, thu, fri, sat;
      sun=mon=tue=wed=thu=fri=sat= false;

      // if(!Day1.includes(gmonth))
      //     sun = true;
      
      // if(!Day2.includes(gmonth))
      //     mon = true;

      // if(!Day3.includes(gmonth))
      //     tue = true;

      // if(!Day4.includes(gmonth))
      //     wed = true;

      // if(!Day5.includes(gmonth))
      //     thu = true;

      // if(!Day6.includes(gmonth))
      //     fri = true;

      // if(!Day7.includes(gmonth))
      //     sat = true;
         
      //  var t=   Moment(myDate).format('MMM DD yyyy')
      //  var CurrentMon=t.substring(0,3)
       var WeekDate=   Moment(Day1).format('MMM DD yyyy')
       localStorage.setItem("WeekDate",WeekDate)
//        var Monday=   Moment(Day2).format('MMM DD yyyy')
//        var Tuesday=   Moment(Day3).format('MMM DD yyyy')
//        var Wednesday=   Moment(Day4).format('MMM DD yyyy')
//        var Thursday=   Moment(Day5).format('MMM DD yyyy')
//        var Friday=   Moment(Day6).format('MMM DD yyyy')
//        var Saturday=   Moment(Day7).format('MMM DD yyyy')
	
//        var WeekDate="";
//        //console.log("sun:"+Sunday)
//        if(Sunday.includes(CurrentMon))
//        {
         
//          WeekDate=Sunday;
//        }
//        else if(Monday.includes(CurrentMon))
//        {
         
//          WeekDate=Monday;
//        }
//        else if(Tuesday.includes(CurrentMon))
//        {
         
//          WeekDate=Tuesday;
//        }
//        else if(Wednesday.includes(CurrentMon))
//        {
         
//          WeekDate=Wednesday;
//        }
//        else if(Thursday.includes(CurrentMon))
//        {
         
//          WeekDate=Thursday;
//        }
//        else if(Friday.includes(CurrentMon))
//        {
         
//          WeekDate=Friday;
//        }
//        else if(Saturday.includes(CurrentMon))
//        {
         
//          WeekDate=Saturday;
//        }
//        //console.log("bef WeekDate:"+WeekDate);
//     //  WeekDate=   Moment(WeekDate).format('yyyy-MM-DD')
// // console.log("calen:"+CurrentMon);
// // console.log("WeekDate:"+WeekDate);
// // console.log("sun:"+sun+"mon"+mon+"tue"+tue+"wed"+wed+"thu"+thu);



      return (
         
          <div>
         
        < Header/>
    {k!==2?
     <form onSubmit={this.handleSubmit}>
          <br/><br/><br/><br/>
          <div className="superUser"><label>User: </label><span>{user}-{fname}</span></div>
          <div class="weekDate">{start_Date} To {end_Date}&nbsp;&nbsp;
        {localStorage.getItem("Reports_To")==="default"?
            <button type="button" name="Submit" value="Approval" className="btn btn-primary text-center" onClick={this.Sub}>
                Submit
              </button>
              :""}
                {localStorage.getItem("Reports_To")!=="default"?
             
            <button type="button" name="Submit" value="0" className="btn btn-primary text-center" onClick={this.Sub}>
                Submit
              </button>
            :""}
          </div>
          </form>
        :""}
             <form onSubmit={this.handleSubmit}>
      <div class="Tcontainer">
      <NotificationContainer /><br/>
                              <table className="table">
                                  <thead>
                                      <tr>
                                        {k!==2?
                                          <th className="Delete">Delete</th>
                                          :''}
                                        
                                          <th className="required">Client</th>
                                          
                                          <th className="required">Project</th>
                                          <th className="required">AA_Types</th>
                                          <th id="Day1">{Day1_str+"/"+Day1_month}</th>
                                          <th id="Day2">{Day2_str+"/"+Day2_month}</th>
                                          <th id="Day3">{Day3_str+"/"+Day3_month}</th>
                                          <th id="Day4">{Day4_str+"/"+Day4_month}</th>
                                          <th id="Day5">{Day5_str+"/"+Day5_month}</th>
                                          <th id="Day6">{Day6_str+"/"+Day6_month}</th>
                                          <th id="Day7">{Day7_str+"/"+Day7_month}</th>
                                      </tr>
                                  </thead>
                                  {k===1?
                                  <tbody >
                                  <TaskListEdit
                                            delete={this.clickOnDelete.bind(this)}
                                            changes={this.handleChanges.bind(this)}
                                            taskList={taskList} sun={sun} mon={mon} tue={tue} wed={wed} thu={thu} fri={fri} sat={sat}
                                            WeekDate={WeekDate}
                                            SundayDate={SundayDate} 
                                            MondayDate={MondayDate} 
                                            TuesdayDate={TuesdayDate}
                                            WednesdayDate={WednesdayDate}
                                            ThursdayDate={ThursdayDate}
                                            FridayDate={FridayDate}
                                            SaturdayDate={SaturdayDate}
                                            compareHireDay1={compareHireDay1} 
                                            compareHireDay2={compareHireDay2}
                                            compareHireDay3={compareHireDay3}
                                            compareHireDay4={compareHireDay4}
                                            compareHireDay5={compareHireDay5}
                                            compareHireDay6={compareHireDay6}
                                            compareHireDay7={compareHireDay7} 
                                            Day1_AAType={Day1_AAType}
                                            HireDate={HireDate}


                                      
                                      />
                                  </tbody>
                                  :''}
                                  
                                    {k===2?
                                    
                                  <tbody >
                                  <TaskListSubmit
                                            delete={this.clickOnDelete.bind(this)}
                                            changes={this.handleChanges.bind(this)}
                                            taskList={taskList} sun={sun} mon={mon} tue={tue} wed={wed} thu={thu} fri={fri} sat={sat}
                                            WeekDate={WeekDate}


                                      
                                      />
                                  </tbody>
                                  :''}
                                  </table>
                                  </div><br/>
                                  {k===1?
                                  <div class="button">
                                    <button
                                                  onClick={this.addNewRow}
                                                  type="button"
                                                  className="btn btn-primary text-center"
                                              >
                                                  Add row
                        <i className="fa fa-plus-circle" aria-hidden="true" />
                                              </button>&nbsp;&nbsp; 
                                           
                                                    
                <button type="submit" className="btn btn-primary text-center">
                  Save
                </button>&nbsp;&nbsp;
               
             
              </div>
  :""}
    
                </form> 
                                 
              </div>

                             
                       

      );

  }
}

export default Form;
