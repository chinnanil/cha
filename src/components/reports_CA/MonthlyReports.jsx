import React from 'react';
import Header from '../header/header.jsx'
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Moment from 'moment';
//import Holiday from 'date-holidays'
import { url } from '../URL/url'



class Reports extends React.Component {

state = {
concat1:[],
concat:[],

};


componentDidMount()
{
let Fname="";
console.log("Monthly Reportssss")
const country = localStorage.getItem("Country")

axios.get(url+"/DENTSPLY/TimeSheetReports",{
}).then((response)=>{

let LoginId = localStorage.getItem('LoginId');
axios.get(url+"/DENTSPLY/User",{
    params:
    {
      country:country
    }

}).then((response1)=>{
for(var i=0;i<response1.data.length;i++)
{
if(LoginId===response1.data[i].uid)
{
Fname=response1.data[i].fname;
}}



let ReportUsers=localStorage.getItem("ReportUsers")

let Employee=[];
let EmployeeId=[];
if(ReportUsers==="")
{
ReportUsers=LoginId+"-"+Fname;
}
Employee=ReportUsers.split(",");
let EmployeeLength=Employee.length;
//console.log("Employeelen",Employee)
for(i=0;i<EmployeeLength;i++)
{
EmployeeId.push(i)
}

let String="";
EmployeeId.forEach((i) => {
let Emp=[];
Emp=Employee[i].split("-");

let uname=Emp[0]




const RYear=localStorage.getItem("RYear")
const RMonth=localStorage.getItem("RMonth")
let RDay=1
const YEAR=RYear+"-"+RMonth;
let myDate=RYear+"-"+RMonth+"-"+RDay;
var DateFormat= Moment(myDate).format('ddd MMM,yyyy')

const Week=DateFormat.substring(4,12)
var NoOfDays=Moment(YEAR, "YYYY-MM").daysInMonth();

myDate=Moment(myDate).format('YYYY-MM-DD')

var CurrentDate = new Date(new Date(parseFloat(myDate.substring(0,4)), parseFloat(myDate.substring(5,7))-1, parseFloat(myDate.substring(8,10))));

var CurrentWeekDay = CurrentDate.getDay();

  
                                    
                                    var CurrentWeekDate = new Date(
                                        new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay)
                                    );
                                    
                                 

var Day1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 1)).toDateString();

var Week1= Moment(Day1).format('MMM DD yyyy')




let Client=[];
const ClientProject=[];
let c=0;
let Response=[];




if(response)
{


for(var j=0;j<response.data.length;j++)
{
Response.push(j);
}

Response.forEach((j)=>
{

const Date=response.data[j].Date.substring(0,3)+","+response.data[j].Date.substring(7,11)

let key=response.data[j].Country+","+response.data[j].Location



if(response.data[j].UserId===uname&&(Date===Week||response.data[j].Date===Week1))
{


if(!ClientProject.includes(key))
{


ClientProject[j]=key;

Client[c]=response.data[j].Country+","+response.data[j].Location
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

ProjectClient.forEach((cli)=>{
    let TotalMonth=[];

let TotalDays=[];
let Tot=0;



let arr=[];
arr=Client[cli].split(",")

let Types=["ST","Jury Duty","Training","Bereavement","Holiday"];



let count1=0;

   
for(let m=0;m<Types.length;m++)
{
    
    let count2=0;
  



     DateFormat= Moment(DateFormat).format('MMM DD yyyy')

let WeekDate= DateFormat
    
var e = new Date(WeekDate)
let ST="ST";


// eslint-disable-next-line no-loop-func
for(let D=0;D<NoOfDays;D++)
{
    let count=0;
if(D===0)
{
    WeekDate=new Date(e.setDate(e.getDate() + 0))
    WeekDate= Moment(WeekDate).format('MMM DD yyyy')
}
if(D>0)
{
    WeekDate=new Date(e.setDate(e.getDate() + 1))
    WeekDate= Moment(WeekDate).format('MMM DD yyyy')
}

for(let l=0;l<response.data.length;l++)
{

if(response.data[l].UserId===uname&&response.data[l].Date===WeekDate&&arr[0]===response.data[l].Country&&response.data[l].Location===arr[1]&&response.data[l].Time_Type===Types[m])
{

count=1;
count2=1

ST=ST+"^"+response.data[l].Hrs;



}
}

if(count===0)
{

ST=ST+"^"+0;


}
}
let WeekDays=[];

if(count1===0&&count2===1)
{
if(ST!=="ST")
{
count1=1
WeekDays=ST.split("^");
let MonthDays=[]
let total=0;

    let j=0;
for(let i=1;i<=NoOfDays;i++)
{
MonthDays[j]=WeekDays[i];
j++;
total=total+parseFloat((WeekDays[i]))
}





String=String+uname+","+Emp[1]+","+arr[0]+","+Moment(YEAR).format('MMM yyyy')+","+arr[1]+","+Types[m]+","+MonthDays+","+total+"^";
//console.log("use",use)
this.setState({
concat:String});
TotalDays[Tot]=MonthDays;

Tot++;
}
}
else if (count1===1&&count2===1){
    if(ST!=="ST")
    {
    WeekDays=ST.split("^");
    let MonthDays=[]
    let total=0;
   
        let j=0;
  for(let i=1;i<=NoOfDays;i++)
    {
    MonthDays[j]=WeekDays[i];
    j++;
    total=total+parseFloat((WeekDays[i]))
    }
    
  
   
    String=String+""+","+""+","+""+","+Moment(YEAR).format('MMM yyyy')+","+arr[1]+","+Types[m]+","+MonthDays+","+total+"^";
  
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
    
}



String=String+""+","+""+","+""+","+Moment(YEAR).format('MMM yyyy')+","+arr[1]+","+"Total Hours"+","+TotalMonth+","+Total+"^";
 
    this.setState({
    concat:String});
   
})


})
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





concat2.push(Array);
}
}
this.setState({concat1:concat2})

})
})
}

render(){
let {concat1}=this.state;
var NoOfDays=[];




const RYear=localStorage.getItem("RYear")
const RMonth=localStorage.getItem("RMonth")
console.log(RYear,RMonth,"monthlyrender")

const YEAR=RYear+"-"+RMonth;

var Days=Moment(YEAR, "YYYY-MM").daysInMonth();

for(var i=1;i<=Days;i++)
{
NoOfDays.push(i);

}


const List=NoOfDays.map(product => <th key={product} > Day{product}</th>)



return (

<div>

< Header/>



<form>

<br/><br/><br/><br/>

<div class="Tcontainer table-overflow">
<table id="Project" className="table" width="100%" >
<thead>
<tr>

<th>UserId</th>
<th>UserName</th>
<th>Project</th>
<th>Month/Year</th>
<th>Location</th>
<th>Time_Type</th>
{List}
<th style={{color:  'blue'}}>Total Hours</th>


</tr>
</thead>
<tbody >
{concat1.map((rows) => {
var row = rows.map((cell) => <td>{cell} </td>);
return (
<>
<tr>{row}</tr>

</>
);
})}

</tbody>

</table><br/>
<ReactHTMLTableToExcel
className="btn btn-info"
table="Project"
filename="MonthlyPRSReportsExcel"
sheet="Sheet"
buttonText="Download" />
</div><br/>
</form>

</div>
);

}
}

export default Reports;