import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Moment from 'moment';
import Axios from 'axios'
import { url } from '../URL/url'
import Header from "../header/header";
import logo1 from '../../Dentsply_Sirona_Logo.png'
import './createInvoice.css'


 
    const CreateInvoice = ()=>{

    const history = useHistory()
    const location = useLocation()

    const [data, setData] = useState(false)
    const [invoiceDate,setInvoiceData] = useState([])
    const [clientTotal,setClientTotal] = useState('')
    const [responseData, setResponseData] = useState([])

    const client = location.state.Data.Client.split("-")[0]
    var month = location.state.Data.Month
    var year = location.state.Data.Year

    var date =  month + " 01 "+ year
    const d = new Date(date);
    const d1 = new Date();
    var WeekDate=   Moment(d1).format('MM/DD/yyyy')

    var m = d.getMonth()+1;
    var y = d.getFullYear();
    const daysInMonth = new Date(y, m, 0).getDate();

    var InvoiceNumber = client+'# '+responseData.InvoiceNumber+' '+year



    useEffect(() => {
        const data = location.state.Data

        Axios.post(url+"/DENTSPLY/createInvoice", {
            Data:data
         
        }).then((response) => {

            if(response.data.message){
                alert(response.data.message)
                history.push("/InvoicePage")
            }else{
                console.log("Response Invoice Data:",response)
                setData(true)
                setInvoiceData(response.data.OutPutData)
                setClientTotal(response.data.ClientTotal)
                setResponseData(response.data)

            }
            

          
      
    }

    )
    }, [])

 

    const generateInvoice =(invoiceNumber,id,client)=>{
        console.log("invoice and id",invoiceNumber,id)

        Axios.post(url+"/DENTSPLY/invoiceNoUpdate", {
            ClientName:client,
            InvoiceNumber:invoiceNumber
         
        }).then((response) => {

            if(response.data.message){
                alert(response.data.message)
                history.push("/InvoicePage")
            }else{
                console.log("Response Invoice Data:",response)
                

            }
            

          
      
    }

    )

    }
   
    // const DealState = (e)=>{
      
    // let value =e.target.value;
    // setState({ ...state, [e.target.name]:value})

    // }

    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     console.log("data: ",state)

    // }

 

    return(
        <div>
            <Header />
        {data ? 

<div>
        <div className="invoice-format" id="invoice">
            <div className="invoice-header-top">
                <img className="invoice-image" src={logo1} alt='Logo'/>
                <span className="invoice-font">INVOICE</span>
            </div>

            <div className="invoice-company-no">

                    <div className="invoice-company-details">
                    <span className="company-name">Chachapoya Consulting, LLC</span>
                    <span className="company-tagline">Warriors of the Cloud</span>
                    <span className="company-address">
                        <span>7061 S Shawnee St</span>
                        <span>Aurora</span>
                        <span>CO, 80016</span>
                        <span>Phone +1 (303) 400-6401</span>
                        <span>Fax  +1 (408) 317-0300</span>
                    
                        </span>
                    </div>

                    <div className="invoice-no">
                        <span>INVOICE:  {InvoiceNumber}</span>
                        <span>Date: {WeekDate}</span>
                        
                        
                    </div>

            </div>

            <div className="invoice-to-for">
                <div className="invoice-company-details">
                    <span style={{fontWeight:"700"}}>TO:</span>
                    <span>{responseData.ClientContact}</span>
                    <span>{client}</span>
                    {/* <span>{responseData.ClientAddress}</span> */}
                    <span>13320-B Ballantyne Corporate Place,</span>
                    <span>Charlotte, North Carolina 28277 U.S.A.</span>
 
                </div>
                <div className='invoice-for'>
                    <span style={{fontWeight:"700"}}>For: </span>
                    <span>SuccessFactors Program Support </span>
                </div>
            </div>    


            <div>
                <table style={{marginTop: "5%",border: "1px solid"}}>
                    <tr>
                        <th className="invoice-header">Description</th>
                        <th className="invoice-header">Hours</th>
                        <th className="invoice-header">Rate</th>
                        <th className="invoice-header">LINE ITEM AMOUNT</th>
                        <th className="invoice-header" style={{borderRight:"none"}}>Amount</th>
                    </tr>
                   
                        <tr>
                            <td colSpan={5} style={{borderBottom: "1px solid"}}>
                                {month} 01<sup>st</sup>-{daysInMonth}<sup>st</sup>, {year} 
                                </td>
                        </tr>


                        {invoiceDate.map((invoice,index)=>{



                            return(

                                    <tr key={index}>
                                        <td className="invoice-table-definition">
										<div className="resource-content" style={{alignItems:"flex-start"}}>
                                            <span className="invoice-project-details">SoW # {invoice.SOWAmount} {invoice.ProjectName}</span>
											
											{invoice.Data.map((resource,idx)=>{
											return <span key={idx} className="invoice-main-data" style={{alignSelf:"flex-start"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*{resource.Resource}</span>
											
											})}
                                            </div>
											
                                        </td>
                                        <td className="invoice-table-definition">
                                        <div className="resource-content">
                                            <span className="invoice-project-details">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											{invoice.Data.map((resource,idx)=>{
											return <span key={idx} className="invoice-main-data" style={{alignSelf:"flex-end"}}>{resource.Hrs}</span>
											
											})}
                                        </div>
                                        </td>
                                        <td className="invoice-table-definition">
                                            <div className="resource-content">
                                            <span className="invoice-project-details">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											{invoice.Data.map((resource,idx)=>{
											return <span key={idx} className="invoice-main-data" style={{alignSelf:"flex-end"}}>${resource.Rate}</span>
											
											})}
                                            </div>
                                        </td>
                                        <td className="invoice-table-definition">
                                        <div className="resource-content">
                                            <span className="invoice-project-details">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
											{invoice.Data.map((resource,idx)=>{
											return <span key={idx} className="invoice-main-data">${resource.Total}</span>
											
											})}
                                         </div>   
                                        </td>
                                        <td style={{borderBottom:"1px solid"}}>
                                            <div>
                                            <span>${invoice.ProjectTotal}</span>
                                            </div>
                                        </td>
                                    
                                    </tr>
                            )
                        })}

                        <tr>
                            <td colSpan={4} style={{borderRight:"1px solid"}}>
                                Grand Total
                            </td>
                            <td>
                                ${clientTotal}
                            </td>
                        </tr>


                        

                  
                </table>
            </div>
            <br/><br/>
            <div className="invoice-ending">
                <span className="invoice-ending-content" style={{fontWeight:"500"}}>Electronic Transfer c/o Wells Fargo North America, Swift WFBIUS6S Routing: 102000076, Account: 2116755352</span>
                <span className="invoice-ending-content">Make all checks payable to Chachapoya Consulting, LLC</span>
                <span className="invoice-ending-content">Total due in 30 days. Overdue accounts subject to a service charge of 1% per month.</span>
                <br/>
                <span className="invoice-ending-thankyou">THANK YOU FOR YOUR BUSINESS</span>
            </div>

            
        </div>
        
<button onClick={()=>generateInvoice(responseData.InvoiceNumber,"invoice",client)}>Generate</button>
</div>
        :null}
        <br /><br /><br />
        
        </div>
            
    )
}
export default CreateInvoice;