
//import logo1 from '../../Dentsply_Sirona_Logo.png'
import logo1 from '../../Dentsply_Sirona_Logo.png'
import {Link} from 'react-router-dom';
import React from "react";
import {useHistory} from 'react-router-dom';


export default function Header({location}){
	const history = useHistory();

	const Role =localStorage.getItem("Role")
	const LoginId = localStorage.getItem('LoginId');
	const country = localStorage.getItem("Country")

	
	if(Role == null || LoginId == null){
		localStorage.clear();
		history.push("/")
	}

	const LogOut = ()=>{
		window.localStorage.clear();
		history.push("/");
		
		
	}



return(
<div>
<div class="header" align='left'>

<img style={{height: "70px",width:"25%"}} clasName="header-image" src={logo1} alt='Logo'/>
<div style={{float:"right",marginTop:"20px"}}>
<label class="timesheet-font" style={{fontSize:"40px",color:"white"}}>ERP</label><label class="timesheet-font" style={{fontSize:"30px",color:"black"}}></label>
</div>
</div>
    <div className="navbar">
		<ul>
  		
		
		<li>
			 <Link to="/dashboardpage_CA">DashBoard</Link>
			 
		</li>
		{Role=="SalesAdmin"?	<li><Link to="/DealsPage">Deals</Link></li>:''}

		{Role!=="Admin"&&Role!=="Super Admin"?	<li><Link to="/timesheetPage">Timesheet</Link></li>:''}

		{Role=="HR"|| Role=="SalesAdmin"? <li><Link to="/hrpage">Onboarding</Link></li>:''}

		{Role=="PM" ||Role=="SalesAdmin"?<li><Link to="/projectdashboard">Project Dashboard</Link></li>:''}	
		
		{Role=="SalesAdmin"? <li><Link to="/InvoicePage">Invocie</Link></li>:''}

            <li>	<Link to="/reportsPage_CA">Reports</Link>	</li>
			
			<li><a href="" id="uid">UserId-{LoginId}</a></li>
			<li><Link to="/" onClick={LogOut}>Logout</Link></li> 
			
			
			
			{/* <li class="dropdown">
                <a href="" class="dropbtn">Support</a>
    		        <div class="dropdown-content">
      			        <Link to="/ticketGeneration">Create Ticket</Link>
      			        <Link to="/tickets">Tickets</Link>
    		        </div>
            </li> */}

			
		
        </ul>
	</div>
</div>
)

}