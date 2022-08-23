import React,{useState } from 'react';
import Header from '../header/header.jsx'
import axios from 'axios';
import Moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { url } from '../URL/url'

const TaskList = props => {
  const [WeekDate,setUseridReg]=useState(props.WeekDate)
  localStorage.setItem("WeekDate",WeekDate)
 
  //console.log("WeekDate"+WeekDate)

return props.taskList.map((val,idx) => {
  if(val.day01==='' ) val.day01=0
  if(val.day02==='' ) val.day02=0
  if(val.day03==='' ) val.day03=0
  if(val.day04==='' ) val.day04=0
  if(val.day05==='' ) val.day05=0
  if(val.day06==='' ) val.day06=0
  if(val.day07==='' ) val.day07=0
  
//console.log("Hello",val.Cmt1,val.Cmt2)
let total=0;
   total=parseFloat(val.day01)+parseFloat(val.day02)+parseFloat(val.day03)+parseFloat(val.day04)+parseFloat(val.day05)+parseFloat(val.day06)+parseFloat(val.day07)
     
return (


<tr key={val.index} style={{color: val.Time_Type=== "Total Hours"? 'blue':''}}>
<td>{val.id}</td>
<td>{val.username}</td>
<td>{val.Project}</td>
<td>{val.Location}</td>
<td> {val.WeeklyDate} </td>
<td>{val.Time_Type}</td>
<td>{val.day01}</td>
<td >{val.day02}</td>
<td >{val.day03}</td>
<td>{val.day04}</td>
<td>{val.day05}</td>
<td>{val.day06}</td>
<td>{val.day07}</td>
<td>{total}</td>
<td>{val.Cmt}</td>

</tr>

);
});


};
class Reports extends React.Component {

    state = {
    concat1:[],
    taskList: [{id:""}],
    concat:[],
    
    };
    
    
    componentDidMount()
    {
     let Fname="";
      
  
    
     const country = localStorage.getItem("Country")

    ///console.log(window.myDate+"window.myDate")
     axios.get(url+"/DENTSPLY/TimeSheetReports",{
      
    }).then((response)=>{
     
     // console.log(JSON.stringify(response)+"response reports")
      let LoginId = localStorage.getItem('LoginId');
      axios.get(url+"/DENTSPLY/User",{
        
      }).then((response1)=>{
        for(var i=0;i<response1.data.length;i++)
        {
         
          if(LoginId===response1.data[i].uid.toUpperCase())
          {
            console.log(LoginId+","+response1.data[i].uid.toUpperCase(),"fname")
         
            Fname=response1.data[i].fname;
          }
        }
      
      
    
      let ReportUsers=localStorage.getItem("ReportUsers")
  console.log(ReportUsers);
    let Employee=[];
    let EmployeeId=[];
    if(ReportUsers==="")
    {
      console.log(ReportUsers,"ReportUsers")
      ReportUsers=LoginId+"-"+Fname;
    }
     Employee=ReportUsers.split(",");
     let EmployeeLength=Employee.length;
    
    
    for(i=0;i<EmployeeLength;i++)
    {
        EmployeeId.push(i)
    }
      
     var WeekDate= window.WeekDate;

  
    EmployeeId.forEach((i) => {
      let Emp=[];
      Emp=Employee[i].split("-");
       
        let uname=Emp[0]
        let Client=[];
const ClientProject=[];
let c=0;

        let Response=[];
        var firstWeek=  Moment(WeekDate).format('yyyy-MM-DD')
      
        var d = new Date(firstWeek)
        
        let nextWeek=new Date(d.setDate(d.getDate() + 7))
         firstWeek=   Moment(nextWeek).format('MMM DD yyyy')
        if(response)
        { 
        
     
        for(var j=0;j<response.data.length;j++)
        {
        Response.push(j);
        }
      
        Response.forEach((j)=>
        {
        
        //const Date=response.data[j].Date.substring(0,3)+","+response.data[j].Date.substring(7,11)
        
        let key=response.data[j].Country+","+response.data[j].Location

       
        //  console.log(response.data[j].UserId+"  "+uname+"  "+response.data[j].Date+"  "+WeekDate+" "+response.data[j].Date+"  "+firstWeek)

console.log(response.data[j].UserId,uname)
        if(response.data[j].UserId===uname.toUpperCase()&&(response.data[j].Date===WeekDate||response.data[j].Date===firstWeek))
        {
         
        //Dublicates Removal
        if(!ClientProject.includes(key))
        {
     
            
           ClientProject[j]=key;
        
           Client[c]=response.data[j].Country+","+response.data[j].Location;
           c++;
     
        }
    

        }
        
        
        })

        console.log(Client+"Client")

        }
        
        let ProjectClient=[];

        for(i=0;i<c;i++)
        {
        ProjectClient.push(i);
        } 

        console.log(ProjectClient+"ProjectClient")
        
        if(response)
        { 
        
       
        for(let j=0;j<response.data.length;j++)
        {
    
        Response.push(j);
        }
        ProjectClient.forEach((cli)=>{
          let arr=[];
          arr=Client[cli].split(",")
          let Types=["ST","Bereavement","Holiday","Jury Duty","Training"];
         
          let ConcatString=[];
         
          let count1=0;
        

for(let m=0;m<Types.length;m++)
{
      let    Week1= WeekDate
     
      var e = new Date(Week1)
     
     
      let concat="ST"
       
        let ST="ST";
       
    let count2=0;  
     
     for(let D=0;D<7;D++)
     {    
  //   console.log(Types[m])
     let count=0;
       if(D===0)
       {
       Week1=new Date(e.setDate(e.getDate() + 0))
       Week1= Moment(Week1).format('MMM DD yyyy')
       }
       if(D>0)
       {
       Week1=new Date(e.setDate(e.getDate() + 1))
       Week1= Moment(Week1).format('MMM DD yyyy')
       }
     
     for(let l=0;l<response.data.length;l++)
     {
    
          if(response.data[l].UserId===uname.toUpperCase()&&response.data[l].Date===Week1&&arr[0]===response.data[l].Country&&response.data[l].Location===arr[1]&&response.data[l].Time_Type===Types[m])
          {
      
            count=1;
            count2=1;
             concat=concat+"^"+response.data[l].Hrs;
          
            ST=ST+"^"+response.data[l].Hrs;
            console.log(ST+"ST values");
          }
        }
      
          if(count===0){
          
          ST= ST+"^"+"0"
          concat=concat+"^"+"0";
         // console.log(ST+"ST values count==0");
          }
       
   
    
   
      
	
 
     
    }
  
   
   if(count1===0&&count2===1)
   {
	  if(ST!=="ST")
	  {
    
      count1=1;
	  let STARR=[];
	 STARR=ST.split("^");

	let  day1=STARR[1];
	let  day2=STARR[2];
	let  day3=STARR[3];
	let  day4=STARR[4];
	let  day5=STARR[5];
	let  day6=STARR[6];
	let  day7=STARR[7];
  
  
	  let values={id:uname,username:Emp[1],Project:arr[0],Location:arr[1],WeeklyDate:WeekDate,Time_Type:Types[m],day01:day1,day02:day2,day03:day3,day04:day4,day05:day5,day06:day6,day07:day7};
  //console.log(this.state.taskList[0].Day01)
    if(this.state.taskList[0].id==="")
    {
     
      this.setState( ({
        taskList: [values]
      }));
    }else{
	   this.setState(prevState => ({
    taskList: [...prevState.taskList, values]
  }));
}
}
   }
   else if(count1===1&&count2===1){
    if(ST!=="ST")
    {
    let STARR=[];
    STARR=ST.split("^");
  
      let  day1=STARR[1];
      let  day2=STARR[2];
      let  day3=STARR[3];
      let  day4=STARR[4];
      let  day5=STARR[5];
      let  day6=STARR[6];
      let  day7=STARR[7];
   
    
    let values={id:"",username:"",Project:"",Location:arr[1],WeeklyDate:WeekDate,Time_Type:Types[m],day01:day1,day02:day2,day03:day3,day04:day4,day05:day5,day06:day6,day07:day7};
    
     this.setState(prevState => ({
    taskList: [...prevState.taskList, values]
    }));
    }
   }




ConcatString[m]=concat;


}
             
          let Total_Hours=[];
          let day01=0;
          let day02=0;
          let day03=0;
          let day04=0;
          let day05=0;
          let day06=0
          let day07=0;
      
       
      
      
          for(let i=0;i<ConcatString.length;i++)
          {
            let Array=[];
            //console.log("Total",Total_Hours[i])
            Array=ConcatString[i].split("^");
         // console.log(Array[1])
      
    
            day01=day01+parseFloat(Array[1]);
            day02=day02+parseFloat(Array[2]);
            day03=day03+parseFloat(Array[3]);
            day04=day04+parseFloat(Array[4]);
            day05=day05+parseFloat(Array[5]);
            day06=day06+parseFloat(Array[6]);
            day07=day07+parseFloat(Array[7]);
       
          }
         
          let values={id:"",username:"",Project:"",Location:"",WeeklyDate:"",Time_Type:"Total Hours",day01:day01,day02:day02,day03:day03,day04:day04,day05:day05,day06:day06,day07:day07};

 this.setState(prevState => ({
taskList: [...prevState.taskList, values]
}));

                   })


	}
   
    
}
)
    
    
})
    })}
    render(){
    
      let { taskList } = this.state;
       
      var myDate=localStorage.getItem("RWeek")
     // console.log("myDate",myDate)
      var CurrentDate = new Date(new Date(parseFloat(myDate.substring(0,4)), parseFloat(myDate.substring(5,7))-1, parseFloat(myDate.substring(8,10))));
     // console.log(CurrentDate,myDate)
      var CurrentWeekDay = CurrentDate.getDay();
      var CurrentWeekDate =""
    
    
    
      CurrentWeekDate = new Date(
          new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
      );
      
    //  console.log(CurrentWeekDate,"CurrentWeekDate")
      var Day1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 0)).toDateString();
      //console.log("Day1:"+Day1)
      var Day1_str = Day1.substring(0, 4) + Day1.substring(8, 11);
      
      var Day2 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1)).toDateString();
      var Day2_str = Day2.substring(0, 4) + Day2.substring(8, 11);
      
      var Day3 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 2)).toDateString();
      var Day3_str = Day3.substring(0, 4) + Day3.substring(8, 11);
      
      var Day4 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 3)).toDateString();
      var Day4_str = Day4.substring(0, 4) + Day4.substring(8, 11);
      
      var Day5 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() +4)).toDateString();
      var Day5_str = Day5.substring(0, 4) + Day5.substring(8, 11);
      
      var Day6 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 5)).toDateString();
      var Day6_str = Day6.substring(0, 4) + Day6.substring(8, 11);
      
      var Day7 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 6)).toDateString();
      var Day7_str = Day7.substring(0, 4) + Day7.substring(8, 11);
      
      var Day8 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 7)).toDateString();
      var Day8_str = Day8.substring(0, 4) + Day8.substring(8, 11);
     
      var Day9 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 8)).toDateString();
      var Day9_str = Day9.substring(0, 4) + Day9.substring(8, 11);

      var Day10 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 9)).toDateString();
      var Day10_str = Day10.substring(0, 4) + Day10.substring(8, 11);

      var Day11 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 10)).toDateString();
      var Day11_str = Day11.substring(0, 4) + Day11.substring(8, 11);

      var Day12 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 11)).toDateString();
      var Day12_str = Day12.substring(0, 4) + Day12.substring(8, 11);

      var Day13 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 12)).toDateString();
      var Day13_str = Day13.substring(0, 4) + Day13.substring(8, 11);

      var Day14 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 13)).toDateString();
      var Day14_str = Day14.substring(0, 4) + Day14.substring(8, 11);
      
    //  var t= Moment(myDate).format('ddd MMMM, yyyy')
    //  var CurrentMon=t.substring(3,7)
      var WeekDate= Moment(Day1).format('MMM DD yyyy')
     // console.log("WeekDate",WeekDate)
   
      // var Monday= Moment(Day2).format('ddd MMMM, yyyy')
      // var Tuesday= Moment(Day3).format('ddd MMMM, yyyy')
      // var Wednesday= Moment(Day4).format('ddd MMMM, yyyy')
      // var Thursday= Moment(Day5).format('ddd MMMM, yyyy')
      // var Friday= Moment(Day6).format('ddd MMMM, yyyy')
      // var Saturday= Moment(Day7).format('ddd MMMM, yyyy')
      
      // var WeekDate="";
      // //console.log("sun:"+Sunday)
      // if(Sunday.includes(CurrentMon))
      // {
      
      // WeekDate=Day1;
      // }
      // else if(Monday.includes(CurrentMon))
      // {
      
      // WeekDate=Day2;
      // }
      // else if(Tuesday.includes(CurrentMon))
      // {
      
      // WeekDate=Day3;
      // }
      // else if(Wednesday.includes(CurrentMon))
      // {
      
      // WeekDate=Day4;
      // }
      // else if(Thursday.includes(CurrentMon))
      // {
      
      // WeekDate=Day5;
      // }
      // else if(Friday.includes(CurrentMon))
      // {
      
      // WeekDate=Day6;
      // }
      // else if(Saturday.includes(CurrentMon))
      // {
      
      // WeekDate=Day7;
      // }
      // //console.log("bef WeekDate:"+WeekDate);
      // WeekDate= Moment(WeekDate).format('MMM DD yyyy')
       window.WeekDate=WeekDate
      // //console.log("calen:"+CurrentMon);
      // //console.log("WeekDate:"+WeekDate);

        return (
 
            <div>
            
            < Header/>
            <form>
<br/><br/><br/><br/>

<div class="Tcontainer">
<table id="Project" className="table" width="100%" >
<thead>
<tr>
<th >Employee Id</th>
<th>UserName</th>
<th>Client</th>
<th>Project</th>
<th >Date</th>
<th >Time_Type</th>
<th id="Day1">{Day1_str}</th>
<th id="Day2">{Day2_str}</th>
<th id="Day3">{Day3_str}</th>
<th id="Day4">{Day4_str}</th>
<th id="Day5">{Day5_str}</th>
<th id="Day6">{Day6_str}</th>
<th id="Day7">{Day7_str}</th>

<th>Total</th>
<th>Comments</th>
</tr>
</thead>
<tbody >
<TaskList


taskList={taskList} 
/>
</tbody>

</table><br/>
<ReactHTMLTableToExcel
className="btn btn-info"
table="Project"
filename="WeeklyReportExcel"
sheet="Sheet"
buttonText="Download" />
</div><br/>
</form>
</div>
);

}
}

export default Reports;
    