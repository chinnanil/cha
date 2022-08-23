import React,{useState,useEffect } from 'react';
import Axios from 'axios';
import { BsTrash } from "react-icons/bs";
import { Country, State, City }  from 'country-state-city';
import { url } from '../URL/url'

const TaskListEdit = props => {


  var SundayDate = props.SundayDate;
   var MondayDate = props.MondayDate;
   var TuesdayDate = props.TuesdayDate;
   var WednesdayDate = props.WednesdayDate;
   var ThursdayDate = props.ThursdayDate;
   var FridayDate = props.FridayDate;
   var SaturdayDate = props.SaturdayDate;

   const date = new Date();
   const year = date.getFullYear();
   let Dublicate=[]
   var compareHireDay1 = props.compareHireDay1
   var compareHireDay2 = props.compareHireDay2
  var compareHireDay3 = props.compareHireDay3
  var compareHireDay4 = props.compareHireDay4
  var compareHireDay5 = props.compareHireDay5
  var compareHireDay6 = props.compareHireDay6
  var compareHireDay7 = props.compareHireDay7



 var Country_Var=localStorage.getItem("Country")

    const [WeekDate]=useState(props.WeekDate)
   
    localStorage.setItem("WeekDate",WeekDate)
  
   const [ClientData,setClientData]=useState([State.getStatesOfCountry(Country_Var)])
   const [AA_Types,setAA_Types]=useState([])
   const [holiday,setHoliday]=useState("")
   const [clients,setClients]=useState([])
   const [projects,setProjects] = useState([])


   let Client=[];
   var myDate = localStorage.getItem("HireDate");
   var HireDate = new Date(new Date(parseInt(myDate.substring(0,4)), parseInt(myDate.substring(5,7))-1, parseInt(myDate.substring(8,10))));
   
   

  var d = new Date();
   const dmon = d.getMonth();
   const dyear = d.getFullYear();
   const dday = d.getDate();

   var currentDate_AATypes = new Date(dyear,dmon,dday);
   var Day1_AAType = props.Day1_AAType
  

   
   useEffect(()=>{
    
    
    aa_Types();
    
  },[])
 
  
  const aa_Types = ()=>{
    const country = localStorage.getItem("Country")
    Axios.get(url+"/DENTSPLY/aa_types", {
      params:{
      Country:localStorage.getItem("Country")
    }
    }).then((response)=>{
     setAA_Types(response.data)
  
    }
   )
   Axios.post(url+"/DENTSPLY/holiday",{
   
    myDate:localStorage.getItem("WeekDate"),
    country:country,
   
     }).then((response1)=>{
      if(response1) {
    
  
    setHoliday(response1.data)
      
      
    }
   
     
     })

     Axios.get(url+"/DENTSPLY/resources", {
      params:{
        userid:localStorage.getItem("LoginId")
      }
    
    }).then((response)=>{
    
    console.log("resources",response)
    // console.log(response.data.ClientName);
    setClients(response.data.Clients);
    setProjects(response.data.Project)
   
       
   
    }
   )

    }
  
    return props.taskList.map((val,idx) => {

      var holSun=false;
      var holMon=false;
      var holTue=false;
      var holWed=false;
      var holThu=false;
      var holFri=false;
      var holSat=false;

      var holSun8=8;
      var holMon8=8;
      var holTue8=8;
      var holWed8=8;
      var holThu8=8;
      var holFri8=8;
      var holSat8=8;

      var future_AAType = false;

      if(Day1_AAType>currentDate_AATypes){
        future_AAType = true;
      }

      for(let i=0;i<holiday.length;i++){
        var states=[]
        states = holiday[i].states.split(",")
        
       
        if(holiday[i].HolidayDate===SundayDate){holSun=true}
        if(holiday[i].HolidayDate===MondayDate){holMon=true}
        if(holiday[i].HolidayDate===TuesdayDate){holTue=true}
        if(holiday[i].HolidayDate===WednesdayDate){holWed=true}
        if(holiday[i].HolidayDate===ThursdayDate){holThu=true}
        if(holiday[i].HolidayDate===FridayDate){holFri=true}
        if(holiday[i].HolidayDate===SaturdayDate){holSat=true}

        
      
    
      }
      
          return (
            
            
               <tr key={val.index}>
                  <td>
                  <i style={{paddingLeft:"7px"}} onClick={() => props.delete(idx)}><BsTrash style={{height:"25px",width:"30px"}}/></i>
                  </td>
                
                 <td>
                 <select name="Country" className="timesheet-select" value={val.Country} onChange={e => props.changes("Country", e.target.value, idx)} required>
                
                   <option value="">Choose Option</option>

                   {clients.map((client,index)=>{
                      return <option key={index} value={client}>{client}</option>
                    })}

              </select>
                 </td>

             
                 <td>
                    <select name="Location" className="timesheet-select" value={val.Location} onChange={e => props.changes("Location", e.target.value, idx)} required>
                      <option value="">Choose Location</option>
                    
                      {projects.map((project,index) =>{
                        console.log("val.Country"+val.Country);
                        if(project.ClientName===val.Country)
                        {
                        return <option value={project.ProjectName} >{project.ProjectName} </option>
                        }
                     })}
                        </select>
                        </td>

                       <td>
                         {future_AAType ?
                 <select name="AA_Types" className="timesheet-select" value={val.AA_Types} onChange={e => props.changes("AA_Types", e.target.value, idx)} required>
                 <option value="">Choose AA_Types</option>
                 {AA_Types.filter(result1 => result1.AA_Types === "Vacation").map((result) =>{
            return <option value={result.AA_Types} >{result.AA_Types}</option>
                      })}
               </select>
                 :<div>
                   {localStorage.getItem("EmployeeGroup") !== "TEMP"?
                   <select name="AA_Types" className="timesheet-select" value={val.AA_Types} onChange={e => props.changes("AA_Types", e.target.value, idx)} required>
                   <option value="">Choose AA_Types</option>
                   {AA_Types.map((result) =>{
         return <option value={result.AA_Types} >{result.AA_Types}</option>
                   })}
                 </select>
                   :<select name="AA_Types" className="timesheet-select" value={val.AA_Types} onChange={e => props.changes("AA_Types", e.target.value, idx)} required>
                      <option value="">Choose AA_Types</option>
                      {AA_Types.filter(result1 => result1.AA_Types !== "Bereavement" && result1.AA_Types !== "Jury Duty").map((result) =>{
            return <option value={result.AA_Types} >{result.AA_Types}</option>
                      })}
                    </select>
                    }</div>
                  }
                        </td>

                        <td>
       
              <input type="text" class="hours"  placeholder="Hrs" id="Sunday" value={(val.AA_Types === "Holiday" && holSun)?val.Sunday=holSun8:val.Sunday}  pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Sunday", e.target.value, idx)}  disabled ={(!(compareHireDay1>=HireDate)  )} />
            
              <input type="text" required={val.Sunday!==""&&val.Sunday!=="0"?true:false} class="comments" id="cmt1" value={val.Cmt1} placeholder="Enter Comments"   onChange={e => props.changes("Cmt1", e.target.value, idx)}  disabled ={(!(compareHireDay1>=HireDate)  )} />
          
            </td>

           
            <td>
                   
                   <input type="text" class="hours"  placeholder="Hrs" id="Monday" value={(val.AA_Types === "Holiday" && holMon)?val.Monday=holMon8:val.Monday} pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Monday", e.target.value, idx)}  disabled ={(!(compareHireDay2>=HireDate)   )} />
                   <input type="text" required={val.Monday!==""&&val.Monday!=="0"?true:false} class="comments" id="cmt2" value={val.Cmt2} placeholder="Enter Comments"   onChange={e => props.changes("Cmt2", e.target.value, idx)}  disabled ={(!(compareHireDay2>=HireDate)   )} />
               
                 </td>
                 <td>
                   <input type="text" class="hours"  placeholder="Hrs" id="Tuesday" value={(val.AA_Types === "Holiday" && holTue)?val.Tuesday=holTue8:val.Tuesday} pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Tuesday", e.target.value, idx)}  disabled ={(!(compareHireDay3>=HireDate)  )} />
                   <input type="text" required={val.Tuesday!==""&&val.Tuesday!=="0"?true:false} class="comments" id="cmt3" value={val.Cmt3} placeholder="Enter Comments"  onChange={e => props.changes("Cmt3", e.target.value, idx)}  disabled ={(!(compareHireDay3>=HireDate)  )} />
                 </td>
                 <td>
                   <input type="text" class="hours"  placeholder="Hrs" id="Wednesday" value={(val.AA_Types === "Holiday" && holWed)?val.Wednesday=holWed8:val.Wednesday} pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Wednesday", e.target.value, idx)}  disabled ={(!(compareHireDay4>=HireDate)  )} />
                   <input type="text" required={val.Wednesday!==""&&val.Wednesday!=="0"?true:false} class="comments" id="cmt4" value={val.Cmt4} placeholder="Enter Comments"  onChange={e => props.changes("Cmt4", e.target.value, idx)}  disabled ={(!(compareHireDay4>=HireDate)  )} />
                 </td>
                 <td>
                   <input type="text" class="hours"  placeholder="Hrs" id="Thursday" value={(val.AA_Types === "Holiday" && holThu)?val.Thursday=holThu8:val.Thursday} pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Thursday", e.target.value, idx)}  disabled ={(!(compareHireDay5>=HireDate)  )} />
                   <input type="text" required={val.Thursday!==""&&val.Thursday!=="0"?true:false} class="comments" id="cmt5" value={val.Cmt5} placeholder="Enter Comments"   onChange={e => props.changes("Cmt5", e.target.value, idx)}  disabled ={(!(compareHireDay5>=HireDate)  )} />
                 </td>
                 <td>
                   <input type="text" class="hours"  placeholder="Hrs" id="Friday" value={(val.AA_Types === "Holiday" && holFri)?val.Friday=holFri8:val.Friday} pattern="^-?[0-9]\d*\.?\d*$"  onChange={e => props.changes("Friday", e.target.value, idx)}   disabled ={(!(compareHireDay6>=HireDate)  )} />
                   <input type="text" required={val.Friday!==""&&val.Friday!=="0"?true:false} class="comments" id="cmt6" value={val.Cmt6} placeholder="Enter Comments"    onChange={e => props.changes("Cmt6", e.target.value, idx)}   disabled ={(!(compareHireDay6>=HireDate)  )} />
                 </td>
                 <td>
                   <input type="text" class="hours"  placeholder="Hrs" id="Saturday" value={(val.AA_Types === "Holiday" && holSat)?val.Saturday=holSat8:val.Saturday} pattern="^-?[0-9]\d*\.?\d*$"   onChange={e => props.changes("Saturday", e.target.value, idx)}  disabled ={(!(compareHireDay7>=HireDate)  )} />
                   <input type="text" required={val.Saturday!==""&&val.Saturday!=="0"?true:false} class="comments" id="cmt7" value={val.Cmt7} placeholder="Enter Comments"  onChange={e => props.changes("Cmt7", e.target.value, idx)} disabled ={(!(compareHireDay7>=HireDate)  )}/>
                 </td>

               
                  
               </tr>
  
         );
        });
   
      
  };
  export default TaskListEdit