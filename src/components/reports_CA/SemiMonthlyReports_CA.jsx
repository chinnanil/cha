import React,{useState } from 'react';
import Header from '../header/header.jsx'
import axios from 'axios';
import Moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Holiday from 'date-holidays'
import { url } from '../URL/url'

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
     axios.get(url+"/DENTSPLY/TimeSheetReports",{
       params:{
       country:country,
       WeekDate:window.myDate
       }
    }).then((response)=>{
     
      let LoginId = localStorage.getItem('LoginId');
      axios.get(url+"/"+country+"/User",{
        params:
        {
          country:country
        }
      }).then((response1)=>{
        const allstates = new Holiday();
        allstates.init('US',"PR")
        console.log("WeekDate123",window.WeekDate)
        var Year= window.WeekDate.substring(6,11);
      
      let Holidays=  allstates.getHolidays(Year)
      console.log("states holidays: ",allstates.getHolidays(Year),Holidays[0],Year);
        for(var i=0;i<response1.data.length;i++)
        {
          console.log(response1.data+"response.data")
    if(LoginId===response1.data[i].uid)
    {
      Fname=response1.data[i].fname;
    }}
      
      
    
      let ReportUsers=localStorage.getItem("ReportUsers")
    //console.log(ReportUsers);
    let Employee=[];
    let EmployeeId=[];
    if(ReportUsers==="")
    {
      ReportUsers=LoginId+"-"+Fname;
    }
     Employee=ReportUsers.split(",");
     let EmployeeLength=Employee.length;
     //console.log("Employeelen",Employee)
     // const ReportType=localStorage.getItem("ReportType")
    
    for(i=0;i<EmployeeLength;i++)
    {
        EmployeeId.push(i)
    }
      //console.log("Employee",EmployeeId)
    
      let String="";
     var WeekDate= window.WeekDate;
     //console.log("WeekDateDid",WeekDate)
    EmployeeId.forEach((i) => {
      let Emp=[];
      Emp=Employee[i].split("-");
       
        let uname=Emp[0]
        let Client=[];
const ClientProject=[];
let c=0;
let Type=[];
let t=0;
        let Response=[];

        var firstWeek=  Moment(WeekDate).format('yyyy-MM-DD')
      
        var d = new Date(firstWeek)
        
        let nextWeek=new Date(d.setDate(d.getDate() + 7))
         firstWeek=   Moment(nextWeek).format('MMM DD yyyy')
         var secondWeek=  Moment(firstWeek).format('yyyy-MM-DD')
      
         var d = new Date(secondWeek)
         
          nextWeek=new Date(d.setDate(d.getDate() + 7))
         secondWeek=   Moment(nextWeek).format('MMM DD yyyy')
let Sub="";
        if(response)
        { 
        
        //console.log("response",response)
        for(var j=0;j<response.data.length;j++)
        {
        Response.push(j);
        }
        
        //  console.log(Response)
        Response.forEach((j)=>
        {
        
        const Date=response.data[j].Date.substring(0,3)+","+response.data[j].Date.substring(7,11)
        
        let key=response.data[j].Country+","+response.data[j].Location
    
         
     
        if(response.data[j].UserId===uname&&(response.data[j].Date===WeekDate||response.data[j].Date===firstWeek||response.data[j].Date===secondWeek))
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
        }
    
        let ProjectClient=[];

        for(i=0;i<c;i++)
        {
        ProjectClient.push(i);
        } 
        
        if(response)
        { 
        
       
        for(var j=0;j<response.data.length;j++)
        {
    
        Response.push(j);
        }
        ProjectClient.forEach((cli)=>{
          let arr=[];
          arr=Client[cli].split(",")
       
       console.log("ProjectClient",Client,uname)
          let TotalMonth=[];
          let TotalDays=[];
         let Tot=0;
        
      let count1=0;
      let Types=["ST","Bereavement","Holiday","Jury Duty","Training"]
 
for(let m=0;m<Types.length;m++)
{
  
  let    Week1= window.MonthDate
     
  var e = new Date(Week1)
 
  let count2=0;
  let concat="ST"
   
    let ST="ST";
        

  
       
       
    
      
      
     for(let D=0;D<window.NoOfDays;D++)
     {    
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
    
          if(response.data[l].UserId===uname&&response.data[l].Date===Week1&&arr[0]===response.data[l].Country&&response.data[l].Location===arr[1]&&response.data[l].Time_Type===Types[m])
          {
      
            count=1;
          count2=1
          Sub=response.data[l].SubmittedBy;
            ST=ST+"^"+response.data[l].Hrs;
          }
        }
      
          if(count===0){
            ST=ST+"^"+0
          }
       
    concat=concat+"^"+ST;
       
     
    
 
    }
    let WeekDays=[];
    
    console.log("ST",ST,uname)
   
    
    if(count1===0&&count2===1)
    {
    if(ST!=="ST")
    {
    
    count1=1
    WeekDays=ST.split("^");
    let MonthDays=[]
    let total=0;
   
     
        let j=0;
       for(let i=1;i<=window.NoOfDays;i++)
        {
            MonthDays[j]=WeekDays[i];
            j++;
            total=total+parseFloat((WeekDays[i]))  
            
        }
    
  
   
    String=String+uname+","+Emp[1]+","+arr[0]+","+arr[1]+","+window.MonthDate+","+Types[m]+","+MonthDays+","+Sub+","+total+"^";
   
    this.setState({
    concat:String});
    TotalDays[Tot]=MonthDays;
   
    Tot++;
    }
    }
    else if (count2===1&&count1===1){
        if(ST!=="ST")
        {
        WeekDays=ST.split("^");
        let MonthDays=[]
        let total=0;
       
     
         
            let j=0;
           for(let i=1;i<=window.NoOfDays;i++)
            {
                MonthDays[j]=WeekDays[i];
                j++;
                total=total+parseFloat((WeekDays[i]))  
            }
        
       
        String=String+""+","+""+","+""+","+arr[1]+","+window.MonthDate+","+Types[m]+","+MonthDays+","+Sub+","+total+"^";
    
        this.setState({
        concat:String});
        TotalDays[Tot]=MonthDays;
     
    Tot++;
        }  
    }
  
    
  
    
    }
    
    let DaysTotal=[];
  
    let Total=0;
        for(let n=0;n<TotalDays.length;n++)
        {
            
    DaysTotal[n]=TotalDays[n];
   
    if(n===0)
    {
    for(let m=0;m<DaysTotal[n].length;m++){
       
        TotalMonth[m]=0;
        TotalMonth[m]=TotalMonth[m]+parseFloat(DaysTotal[n][m]);  
        Total=Total+parseFloat(DaysTotal[n][m]);
    }
    
    }
    
    else{
        for(let m=0;m<DaysTotal[n].length;m++){
         
           
            TotalMonth[m]=TotalMonth[m]+parseFloat(DaysTotal[n][m]);  
            Total=Total+parseFloat(DaysTotal[n][m]);
    }
        }
        // eslint-disable-next-line no-native-reassign
   
    }
    
    String=String+""+","+""+","+""+","+arr[1]+","+window.MonthDate+","+"Total Hours"+","+TotalMonth+","+Sub+","+Total+"^";
    //console.log("use",use)
    this.setState({
    concat:String});
    
  
     
    
    
    })
     } })
    let concat2=[];
  
    if(this.state.concat.length>0)
    {
    this.setState({concat:this.state.concat.substring(0,this.state.concat.length-1)})
    
    let Array=[];
    
    let fil=[];
    fil=this.state.concat.split("^")
    
    for(i=0;i<fil.length;i++)
    {
    
    
    Array=fil[i].split(",")
    
    
    //console.log("con",Array.length)
    
    
    concat2.push(Array);
    }
    }
    this.setState({concat1:concat2})
   
    })
    })}
    
 
    render(){
       let {concat1}=this.state;
       
        var myDate=localStorage.getItem("RWeek")
      
        var RYear=myDate.substring(0,4);
        var RMonth=myDate.substring(5,7)
        window.YEAR=RYear+"-"+RMonth
        var FirstDay=Moment(RYear+"-"+RMonth+"-"+"01").format('yyyy-MM-DD')
        var fifteenDay=Moment(RYear+"-"+RMonth+"-"+"15").format('yyyy-MM-DD')
        var sixteenDay=Moment(RYear+"-"+RMonth+"-"+"16").format('yyyy-MM-DD')
        var lastDay=Moment(RYear+"-"+RMonth+"-"+"30").format('yyyy-MM-DD')
        var NoOfDays=Moment(RYear+"-"+RMonth, "YYYY-MM").daysInMonth();
      
        if(fifteenDay>=myDate)
        {
            myDate=FirstDay;
            NoOfDays=15;
        }
        else{
            myDate=sixteenDay;
            NoOfDays=NoOfDays-15;
        }
        window.NoOfDays=NoOfDays;
     
     
        var CurrentDate = new Date(new Date(parseFloat(myDate.substring(0,4)), parseFloat(myDate.substring(5,7))-1, parseFloat(myDate.substring(8,10))));
    
        var CurrentWeekDay = CurrentDate.getDay();
        
      
      
        var CurrentWeekDate = new Date(
            new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
        );
        
        var Day1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1)).toDateString();
        //console.log("Day1:"+Day1)
      
      var DayValue= Moment(myDate).isoWeekday()
        var WeekDate= Moment(Day1).format('MMM DD yyyy')
    
     
     
      
        window.DayValue=DayValue
        window.WeekDate=WeekDate
      
        window.myDate=Moment(myDate).format('MMM DD yyyy')
        window.MonthDate=window.myDate
        console.log("window.WeekDate",window.myDate)
        let Monthlydays=[]
        for(var i=1;i<=NoOfDays;i++)
{
  Monthlydays.push(i);

}


const List=Monthlydays.map(product => <th key={product}>Day{product}</th>)
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
<th >WeekDate</th>
<th >Time_Type</th>
{List}
<th>SubmittedBy</th>
<th>Total</th>

</tr>
</thead>
<tbody >
{concat1.map((rows) => {
  
  
var row = rows.map((cell) => <td>{cell} </td>

);

return (
<>

 
 
<tr style={{color: row[5]=== "Total Hours"? 'blue':''}}>{row}</tr>



</>

);
})}

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
    