import React,{useState } from 'react';


const TaskListSubmit = props => {
    const [WeekDate]=useState(props.WeekDate)
    localStorage.setItem("WeekDate",WeekDate)
   // alert(WeekDate)
    return props.taskList.map((val,idx) => {
      
          return (
            
            
               <tr key={val.index}>
                 
               
                 <td>
                 {val.Country}
                 </td>
                 
                 <td>
                  {val.Location}
                 </td>
                 <td>
                  {val.AA_Types}
                 </td>
                 <td>
                 {val.Sunday} {val.Cmt1}
                 </td>
                 <td>
                 {val.Monday} {val.Cmt2}
                 </td>
                 <td>
                 {val.Tuesday} {val.Cmt3}
                 </td>
                 <td>
                 {val.Wednesday} {val.Cmt4}
                 </td>
                 <td>
                 {val.Thursday} {val.Cmt5}
                 </td>
                 <td>
                 {val.Friday} {val.Cmt6}
                 </td>
                 <td>
                 {val.Saturday} {val.Cmt7}
                 </td>
             
                  
               </tr>
  
         );
        });
   
      
  };
  export default TaskListSubmit
  