import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import './allDeals.css'
import Axios from 'axios';
import { url } from '../URL/url'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'


const AllDeals = ()=>{
    const history = useHistory();

    const [deals,setDeals] = useState([])
    const [dealOwners1, setDealOwners1 ] = useState([])

    const [searchOptions,setSearchOptions]=useState({
                                                    DealOwner:"",
                                                    DealType:"",
                                                    DealStage:""
                                                })

    var loginId = localStorage.getItem("LoginId")                                            



    
    useEffect(() => {
        console.log("user id: ",loginId)
             var owners = []


        Axios.get(url+"/DENTSPLY/allDeals", {
            params:{
            id:loginId
        }
          
                }).then((response) => {

                    for(let i=0;i<response.data.length;i++){
                        if(!owners.includes(response.data[i].DealOwner)){
                            owners.push(response.data[i].DealOwner)
                        }
                    }
                    setDealOwners1(owners)
                    setDeals(response.data)
                   
                }
        
                )
    }, [])


    const SearchOptions=(e)=>{
        console.log("property:",e.target.name+"value:",e.target.value)
        const value=e.target.value
        
        setSearchOptions({
            ...searchOptions,
            [e.target.name]:value})
        
        
            }

    const NavigateDeal = (val)=>{
        history.push({

            pathname: '/updateDeal',
           // search: '?update=true',  // query string
            state: {  // location state
              Deal: val, 
            },
        })

        
    }

    const filterDeal = (deal)=>{

        if(searchOptions.DealOwner && searchOptions.DealStage && searchOptions.DealType){
            
            if(searchOptions.DealOwner === deal.DealOwner && searchOptions.DealStage === deal.DealStage && searchOptions.DealType === deal.DealType ){
                return true
            }else {return false}
            
        }if(searchOptions.DealOwner && !searchOptions.DealStage && !searchOptions.DealType){
            if(searchOptions.DealOwner === deal.DealOwner){
                return true
            }else {return false}

        }if(!searchOptions.DealOwner && searchOptions.DealStage && !searchOptions.DealType){
            if(searchOptions.DealStage === deal.DealStage){
                return true
            }else {return false}

        }if(!searchOptions.DealOwner && !searchOptions.DealStage && searchOptions.DealType){
            if(searchOptions.DealType === deal.DealType){
                return true
            }else {return false}

        }else if(searchOptions.DealOwner && searchOptions.DealStage && !searchOptions.DealType){
            if(searchOptions.DealOwner === deal.DealOwner && searchOptions.DealStage === deal.DealStage){
                return true
            }else {return false}

        }else if(searchOptions.DealOwner && !searchOptions.DealStage && searchOptions.DealType){
            if(searchOptions.DealOwner === deal.DealOwner && searchOptions.DealType === deal.DealType){
                return true
            }else {return false}

        }else if(!searchOptions.DealOwner && searchOptions.DealStage && searchOptions.DealType){
            if(searchOptions.DealStage === deal.DealStage && searchOptions.DealType === deal.DealType){
                return true
            }else {return false}

        }else{
            return true
        }  

    }
    

    return(
        <div>

            <div className="deal-filters">
            <div className="deal-filter-container">
                <label>Deal Owner:</label>&nbsp;
                <select className ="deal-filter-select" name="DealOwner" value={searchOptions.DealOwner} onChange={(e)=>SearchOptions(e)}>
                    <option value="">Choose One</option>
                    {dealOwners1.map(owner=>{
                        return <option value={owner}>{owner}</option>
                    })}
                </select>
            </div>&nbsp;
            <div className="deal-filter-container">
                <label>Deal Stage:</label>&nbsp;
                <select className ="deal-filter-select" name="DealStage" value={searchOptions.DealStage} onChange={(e)=>SearchOptions(e)}>
                <option value="">Choose One</option>
                <option value="Appointment Scheduled">Appointment Scheduled</option>
                <option value="Qualified to Buy">Qualified to buy</option>
                <option value="Presentation Scheduled">Presentation Scheduled</option>
                <option value="Contract sent">Contract sent</option>
                <option value="Closed won">Closed won</option>
                <option value="Closed lost">Closed lost</option>
                </select>
            </div>&nbsp;
            <div className="deal-filter-container">
                <label>Deal Type:</label>&nbsp;
                <select className ="deal-filter-select" name="DealType" value={searchOptions.DealType} onChange={(e)=>SearchOptions(e)}>
                    <option value="">Choose One</option>
                    <option value="New Business">New Business</option>
                    <option value="Existing Business">Existing Business</option>
                </select>
            </div>
            </div>
            <br/>
           
            <table id="AllDeals" className="deal-table">
                <thead className="deal-thead">
                    <th className="deal-th">
                        Deal Owner
                    </th>
                    <th className="deal-th">Deal Stage</th>
                    <th className="deal-th">Deal Type</th>
                    <th className="deal-th">Client Name</th>
                    <th className="deal-th">Project Name</th>
                    <th className="deal-th">Client Contact</th>
                    <th className="deal-th">SOW Amount</th>
                </thead>
                <tbody>
                   {deals.length>0 ?
                   deals.filter(deal=>filterDeal(deal))
                   .map(deal=>{
                       return(
                           <tr>
                               <td><div className="deal-field"><span className="navigate-deal" onClick={(e)=>NavigateDeal(deal)}>{deal.DealOwner}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" onClick={(e)=>NavigateDeal(deal)}>{deal.DealStage}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.DealType}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" onClick={(e)=>NavigateDeal(deal)}>{deal.ClientName}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" onClick={(e)=>NavigateDeal(deal)}>{deal.ProjectName}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.ClientContact}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.SOWAmount}</span></div></td>
                           </tr>
                       )
                   })
                 
                   
                :null}
                </tbody>


            </table>
            <br/> 

        <ReactHTMLTableToExcel
            className="download_preview"
            table="AllDeals"
            filename="AllDeals_Preview"
            sheet="AllDeals"
            buttonText="Download" />
        </div>
    )
}
export default AllDeals;