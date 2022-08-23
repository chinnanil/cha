import React,{useEffect,useState  } from 'react';
import Header from '../header/header.jsx'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {useHistory} from "react-router-dom"
import { url } from '../URL/url'


export default function TimesheetPage() {
const [userids, setUserIds] = useState('');
 
const [vYear, setVYear] = useState('');
const [users, setUser] = useState('');
const [user1, setUser1] = useState('');
const country = localStorage.getItem("Country")

const history=useHistory();

    useEffect(() => {
        LockTS();
    
    }, [])

    const LockTS = () => {
        
		const country = localStorage.getItem("Country")
        Axios.post(url+"/"+country+"/LockTimesheetres", {

        }).then((response) => {

           
            console.log("users",users)
                    
            setUserIds(response.data[0].lockTS);
            console.log("responselock",response.data[0].lockTS)
           
        }
        )

    }
    

    

	return (
 
		<div>
		
			<Header />
			 {(userids!=="1")?
			<div class="timesheet">
               <Link to='/requesttimesheet_CA' style={{ color: "white" }}>Create</Link>
               
			&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='Updaterequesttimesheet_CA' style={{ color: "white" }}>Edit</Link>
			

		</div>	:alert("Time Evaluation process started so timesheet cant be entered")}	
		

			
			
			
			
		
		
	</div>		
		

	);
};
