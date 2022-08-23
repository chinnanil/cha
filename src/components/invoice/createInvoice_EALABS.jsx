import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Moment from 'moment';
import Axios from 'axios'
import { url } from '../URL/url'
import Header from "../header/header";
import logo1 from '../../ealabs.jpg'
import './createInvoice_EALABS.css'


 
    const CreateInvoice_EALABS = ()=>{

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
            <div className="invoice-header-image">
                <img className="invoice-image" src={logo1} alt='Logo'/>
            </div>

            <div className="invoice-header-details">
                <div className="invoice-company">
                    <span className="invoice-text">INVOICE</span>
                    <br/>
                    <span>Rizing LLC</span>
                    <span>Attention: Accounts Payable</span>
                    <span>Rizing HQ	</span>
                    <span>300 First Stamford Place,</span>
                    <span>Stamford, CT,06902</span>
                    <span>USA</span>

                </div>

                <div className="invoice-details">

                    <span>Invoice Date</span>
                    <span>05JAN2022</span>
                    <br/>

                    <span>Invoice Number</span>
                    <div><span>23 2021-22</span></div>
                    {/* <div><span>23</span><input type="text"/></div> */}
                    <br/>

                    <span>Reference</span>
                    <span>SAC Code:440452</span>

                </div>

                <div className="invoice-source-company">

                    <span>EA Labs India Private Limited</span>
                    <br/>

                    <span>Attention: Daniel Pasumarthy</span>
                    <span>D.NO:5-96-2, IInd Floor,</span>
                    <span>Besides CRDA office, 6/12</span>
                    <span>Brodipet,</span>
                    <span>GUNTUR, ANDHRA PRADESH</span>
                    <span>522 002</span>
                    <span>INDIA</span>
                    <span>GST No:37AAECE058F1ZR</span>
                    <span>PAN No: AAECE0583F</span>

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
                <div>

                </div>

                <div>

                </div>
            
            
            </div>






            
        </div>
        
<button onClick={()=>generateInvoice(responseData.InvoiceNumber,"invoice",client)}>Generate</button>
</div>
        :null}
        <br /><br /><br />
        
        </div>
            
    )
}
export default CreateInvoice_EALABS;