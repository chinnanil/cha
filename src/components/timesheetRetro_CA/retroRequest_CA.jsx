import Header from '../header/header'
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Moment from 'moment';
import Select from 'react-select'
import Axios from 'axios'
import { url } from '../URL/url'
import {Link} from "react-router-dom";
import { weeksToDays } from 'date-fns';

var users;

const RetroRequest = ()=>{
const history = useHistory();
    const [user, setUser] = useState('');
    
    const [userids, setUserIds] = useState([]);
    const [rWeek, setRWeek] = useState('');
    const [weeks,SetWeeks] = useState([])
    const [hireDate, SetHireDate ] = useState('');

    const Role = localStorage.getItem("Role");
    const LoginId = localStorage.getItem('LoginId');
    const country = localStorage.getItem("Country")

    useEffect(() => {
        idsdropdown();
        weeksForm();
    }, [])

    const idsdropdown = () => {
        
        //The below axios is used for getting all user id's
        
        Axios.get(url+"/DENTSPLY/idsdropdown", {
            params:{
                Country:country,
                User:LoginId,
                Role:Role,
        }

        }).then((response) => {

            var ids = [];
            response.data.map(id => { ids.push(id.uid + "-" + id.fname) })
            users = ids.toString()

           
            setUserIds(response.data.map(value =>({label:value.fname,value:value.uid+'^'+value.fname+'^'+value.HireDate})));
            //setUserIds(pre => ([...pre,{label:'All',value:'All'}]))
           
        }
        )

    }

    const UserIds = (val) => {
        console.log("Selected value: ",val)
           
            setUser(val.value);
            const values = val.value.split('^')

            SetHireDate(values[2]) 
        
   
 }

 
const weeksForm = ()=>{
    var CurrentDate = new Date();
    
    var CurrentWeekDay = CurrentDate.getDay();
    var CurrentWeekDate = new Date(new Date(CurrentDate).setDate(CurrentDate.getDate() - CurrentWeekDay));
//var Day1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() + 7)).toDateString();
var Week1 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() - 7)).toDateString();
var Week2 = new Date(new Date(CurrentWeekDate).setDate(CurrentWeekDate.getDate() - 14)).toDateString();
//var CurrentWeek = Moment(Day1).format('MM-DD-YYYY')
var Week1_label=   Moment(Week1).format('MM-DD-YYYY')
var Week1_value = Moment(Week1).format('YYYY-MM-DD')
var Week2_label=   Moment(Week2).format('MM-DD-YYYY')
var Week2_value = Moment(Week2).format('YYYY-MM-DD')


let Arr = []
Arr.push({label:Week1_label,value:Week1_value})
Arr.push({label:Week2_label,value:Week2_value})
SetWeeks(Arr)


}


console.log("State weeks:",weeks)
console.log("Rweek: ",rWeek)
 const onHandleSubmit = () =>{
//e.preventDefault();
var hire= [];
var week = [];
var weekDate;
var HireDate

hire=hireDate.split("-")
week = rWeek.split("-")

weekDate = new Date(week[0],week[1]-1, week[2]);
var HireDate
HireDate = new Date(hire[0], hire[1]-1,hire[2]);

if(user !== "" && rWeek !== ""){
   
    const data ={users:user,week:rWeek,hireDate:hireDate}
    console.log("data: ",data)
    history.push({

        pathname: '/RetroTimesheet_CA',
       // search: '?update=true',  // query string
        state: {  // location state
          Data: data, 
        },
    })
    
console.log("users: ",user)
console.log("Week: ",rWeek)

}else{
alert("Please Select User and Week");
 }
}







    return(

        <div style={{height:"100vh"}}>
            <Header />
           <div style={{display: "inline-flex", marginTop: "5%"}}>
           <div style={{alignItems: 'center',display: "flex"}}><br/>
                <label>Select User: </label>&nbsp;
    			<Select className="test-select" autosize={true} options={userids} onChange={val => UserIds(val) } placeholder="search name..."/>
            </div>
            
            <div>&nbsp;
                <label>Week/Date: </label>
              <select  className="reports-request-select" required value={rWeek} onChange={(e) => { setRWeek(e.target.value) }}>
                <option value="">Choose Week</option>
                {weeks.map(week => {
                                return <option value={week.value}>{week.label}</option>
                            })
               }
            </select>
            </div>&nbsp;&nbsp;
            <input type="submit" onClick={onHandleSubmit}/>
            </div>
           
        </div>
    )
}
export default RetroRequest