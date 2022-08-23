import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import { url } from '../URL/url'
import Header from "../header/header";
import './invoicePage.css'
import CreateInvoice from './createInvoice'

 
    const InvoicePage = ()=>{

    var thisYear = (new Date()).getFullYear();
    const history = useHistory()

    const [clients, setClients ] = useState([])

    const [state, setState] = useState({
        Client:"",
        Month:"",
        Year:""
      
})

    useEffect(() => {

        Axios.get(url+"/DENTSPLY/selectClients", {
         
        }).then((response) => {

           console.log("response: ",response)
            setClients(response.data)
      
    }

    )
    }, [])



 

   
    const DealState = (e)=>{
      
    let value =e.target.value;
    setState({ ...state, [e.target.name]:value})

    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        var SourceCompany = state.Client.split("-")[1]
        console.log("source:",SourceCompany)

        if(SourceCompany === "CHACHAPOYA"){

            history.push({

                pathname: '/CreateInvoice',
               // search: '?update=true',  // query string
                state: {  // location state
                  Data: state, 
                },
            })

        }else if(SourceCompany === "EALABS"){

            history.push({

                pathname: '/CreateInvoice_EALABS',
               // search: '?update=true',  // query string
                state: {  // location state
                  Data: state, 
                },
            })


        }else{
            alert("Selected Client dosen't contain Source Company")
            history.push('/Header')
        }


        console.log("data: ",state)

    }

 

    return(
        <div>
            <Header />
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="invoice-input-container">
               
                <div>
                    <label>Select Client<super style={{color:"red"}}>*</super>:</label>
                    <select className="deal-input-select" 
                    name="Client" 
                    value={state.Client} 
                    onChange={(e)=>DealState(e)} 
                    required
                    >
                        <option value="">Choose Option</option>
                        {clients.map((client,index)=>{
                            return <option key={index} value={client.client+"-"+client.SourceCompany}>{client.client}</option>
                        })}
                    </select>
                </div>&nbsp;
                <div>
                    <lable>Month<super style={{color:"red"}}>*</super>: </lable>
                    <select className="reports-request-select"
                    name="Month" 
                    required 
                    value={state.Month} 
                    onChange={(e) => { DealState(e) }}>
                        <option value="">Choose Option</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>&nbsp;
                    </div>&nbsp;
                    <div>
                    <label>Year<super style={{color:"red"}}>*</super>: </label>
                    <select className="reports-request-select" 
                    name="Year"
                    required 
                    value={state.Year} 
                    onChange={(e) => {  DealState(e) }}
                    >
                        <option value="">Choose Year</option>
                        <option value={thisYear}>{thisYear}</option>
                        
                    </select>
                </div>&nbsp;
                <div>
                    <input type="submit" />
                </div>
                
            </div>
            </form>
        </div>
            
    )
}
export default InvoicePage;