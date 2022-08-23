import React, { useState,useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
//import Axios from 'axios'
import Header from "../header/header";
import './dealsPage.css'
import Job_info from './job_info'
import EmployeeEdit  from './EmployeeEdit'
/*import AllDeals from './allDeals'
import MyDeals from './myDeals'*/
import { url } from '../URL/url'
import Axios from 'axios';


const DealsPage = ()=>{

     const [ uid, setuid ] = useState('')
    // const [ myDeals, setMyDeals ] = useState(false)
    // const [ allDeals, setAllDeals ] = useState(false)
const [hr_info, sethr_info] = useState('')
//var dealSelect = ""
const DealSelect = (e,val)=>{
    e.preventDefault();
    console.log("value:",val)
    
    sethr_info(val)


}



    return(
        <div>
            <Header />
            <div class="deals-nav">
                <span class="deal-box" onClick={(e)=>DealSelect(e,"Job_Info")}>Employee Information Create</span>
                <span class="deal-box" onClick={(e)=>DealSelect(e,"EmployeeEdit1")}>Employee Information Edit</span>

            </div>

            <div style={{padding:"80px 0px"}}>
            {hr_info === "Job_Info"?<Job_info sethr_info={sethr_info}/>:null}
            {hr_info === "EmployeeEdit1"?<EmployeeEdit sethr_info={sethr_info}/>:null}
           </div>
        </div>
            
    )
}
export default DealsPage;