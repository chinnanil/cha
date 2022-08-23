import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
//import Axios from 'axios'
import Header from "../header/header";
import './dealsPage.css'
import CreateDeal from './createDeal'
import AllDeals from './allDeals'
import MyDeals from './myDeals'

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
                <span class="deal-box" onClick={(e)=>DealSelect(e,"CreateDeal")}>Create Deal</span>
                <span class="deal-box" onClick={(e)=>DealSelect(e,"MyDeals")}>My Deals</span>
                <span class="deal-box" onClick={(e)=>DealSelect(e,"AllDeals")}>All Deals</span>
                
            </div>

            <div style={{padding:"80px 0px"}}>
           
           {dealSelect === "CreateDeal"?<CreateDeal setDealSelect={setDealSelect}/>:null}
           {dealSelect === "AllDeals"?<AllDeals />:null}
           {dealSelect === "MyDeals"?<MyDeals />:null}
           </div>
        </div>
            
    )
}
export default DealsPage;