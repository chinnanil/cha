import { React, useState} from 'react';
import { Link } from 'react-router-dom'
import {useHistory} from 'react-router-dom';
import logo from '../../Dentsply_Sirona_Logo.png'
import Axios from 'axios';
import { url } from '../URL/url'


export default function Login (){
  
  const [usernameReg,setUsernameReg]=useState('')
  const [passwordReg,setPasswordReg]=useState('')
  const [loginstatus,setLoginStatus]=useState('')

 
  const history = useHistory();
  


  //const history = useHistory();
  localStorage.clear();



  

  const Login=(e)=>{
    e.preventDefault();




    Axios.post(url+"/apiCalls/login",{
    username: usernameReg,
    password: passwordReg,
   
}).then((response)=>{
  console.log("response :",response)
  if(response.data.message){
    setLoginStatus(response.data.message);
  
     }
  else{ 
   
const status = response.data[0].Status;
console.log("response data:",response)
if(status === "A"){
 localStorage.setItem("LoginId",usernameReg.toUpperCase());
 localStorage.setItem("Role",response.data[0].Role);
 localStorage.setItem("Reports_To",response.data[0].Reports_To);
 localStorage.setItem("Fname",response.data[0].fname)
 localStorage.setItem("Department",response.data[0].Department)
 localStorage.setItem("Country",response.data[0].Country)
 localStorage.setItem("EmployeeGroup",response.data[0].EmployeeGroup)
 localStorage.setItem("HireDate",response.data[0].HireDate)
 localStorage.setItem("Company",response.data[0].cid)
 
 history.push('/dashboardpage_CA')
 
 



}else{
setLoginStatus("User Inactive");
}
  }
   
});
};


return (
  <div className="background-login">

<div className="login-design">

<div style={{height:"100vh",marginTop:"25%",width:"40%"}}>
<div>
<img className="login-img" src={logo} alt='Logo'/>
</div>
<br/>

<div>
<label class="timesheet-font" style={{fontSize:"60px",color:"black"}}>ERP</label><label class="timesheet-font" style={{fontSize:"50px",color:"black"}}></label>
</div>
</div>


<div class="login">



<form className="loginst" onSubmit={Login}>
<h3 >{loginstatus}</h3>
<h3 className="login-forget-fonts">LOGIN</h3>
<div>
<div className="login-input">
<label className="login-label">USER ID:</label>
<input type="text"
placeholder="Enter Username"
value={usernameReg}
onChange= {(e) => {
setUsernameReg(e.target.value);
}}
required
/>
</div><br/>
<div className="login-input">
<label className="login-label">PASSWORD:</label>
<input type="password" id="pwd" name="pwd" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{0,7}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
placeholder="Enter password"
onChange={(e) => {
setPasswordReg(e.target.value);
}}
required/>
</div>
<br/>
<input type="submit" value="Login" style={{backgroundColor:"black"}} />
<br/><br/>

Forgot{' '} <Link to="/forget" style={{fontWeight:"bold"}}>your password?</Link><br/><br/>
</div>
<br/><br/>
</form>

</div>

</div>
</div>

)
}

