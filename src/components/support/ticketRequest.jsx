import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import Header from "../header/header";
import Select from 'react-select'

const TicketRequest = () => {

    const history = useHistory();

    const LoginId = localStorage.getItem('LoginId');
    const Role = localStorage.getItem("Role");
    const Fname = localStorage.getItem("Fname");
    const Department = localStorage.getItem('Department');

    const [ mTicketType, setMTicketType] = useState("");
    const [ mTicketGroup, setMTicketGroup] = useState("");

    const [ gTicketType, setGTicketType] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        //Below if condition for depart(group) users and they are not managers.
        if(gTicketType !== "" && Role !== "Manager"){
            localStorage.setItem("GroupTicketType",gTicketType);
            history.push('/tickets')
        }

        if(Role !== "Manager"){
   
            localStorage.setItem("ManagerTicketType",mTicketType);
            localStorage.setItem("ManagerTicketGroup",mTicketGroup)
            history.push('/tickets')
        }
        if(Role === "Manager")
        {
            localStorage.setItem("ManagerTicketType",mTicketType);
            localStorage.setItem("ManagerTicketGroup",mTicketGroup)
           
            history.push('/tickets')
        }
        
    }

    return(

        <div style={{height:"100vh"}}>
            <Header />

            <div style={{display: "inline-flex", marginTop: "10%"}}>
                <form style={{display:"inline-flex",alignItems: "center"}} onSubmit={handleSubmit}>
                    {Role === "Manager" ?
                    
                    <div style={{display: "contents"}}>
                        <label>Ticket Type: </label>&nbsp;
                        <select required onClick={(e) => setMTicketType(e.target.value)}>
                            <option value="">Choose Option</option>
                            <option value="My Tickets">My Tickets</option>
                            <option value="Group Tickets">Group Tickets</option>
                        </select>&nbsp;&nbsp;
                        {mTicketType === "Group Tickets" ? 
                            <div>
                                <label>Groups: </label>
                                <select required onClick={(e) => setMTicketGroup(e.target.value)}>
                                    <option value="">Choose Option</option>
                                    <option value="IT">IT Group</option>
                                    <option value="FGRP">Finance Group</option>
                                    <option value="TGRP">Timesheet Group</option>
                                </select>&nbsp;&nbsp;
                            </div>
                            

                        : null}
                        <input type="submit" />
                    </div>

                    :null}

                    {(Role !== "Manager" && (Department === "IT" || Department === "FGRP" || Department === "TGRP")) ? 
                    
                    <div>
                        <label>Ticket Type: </label>
                        <select required onClick={(e) => setGTicketType(e.target.value)}>
                            <option value="">Choose Option</option>
                            <option value="My Tickets">My Tickets</option>
                            <option value="All Tickets">All Tickets</option>
                            <option value="Assigned Tickets">Assigned Tickets</option>
                        </select>&nbsp;&nbsp;
                        <input type="submit" />
                    </div>

                    : null}
                    
                </form>
            </div>




        </div>
    )

}
export default TicketRequest;