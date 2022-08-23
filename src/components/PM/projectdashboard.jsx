import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
//import Axios from 'axios'
import Header from "../header/header";
import './dealsPage.css'
import PMO from'./pmo'
import AllDeals from './project_dashboard_main'

const DealsPage = ()=>{

    // const [ createDeal, setCreateDeal ] = useState(false)
    // const [ myDeals, setMyDeals ] = useState(false)
    // const [ allDeals, setAllDeals ] = useState(false)
const [dealSelect, setDealSelect] = useState('')
//var dealSelect = ""
const DealSelect = (e,val)=>{
    e.preventDefault();
    console.log("value:",val)
    
    setDealSelect(val)


}

    return(
        <div>
            <Header />
            <div class="deals-nav">
               
                <span class="deal-box" onClick={(e)=>DealSelect(e,"MyDeals")}>Project Dashboard</span>
                <span class="deal-box" onClick={(e)=>DealSelect(e,"PMO")}>PMO</span>
                
            </div>

            <div style={{padding:"80px 0px"}}>
           
        
          
           {dealSelect === "MyDeals"?<AllDeals />:null}
           {dealSelect==="PMO"?<PMO/>:null}
           </div>
        </div>
            
    )
}
export default DealsPage;