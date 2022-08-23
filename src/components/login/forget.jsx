import React,{useState } from 'react';
import Axios from 'axios';
//import logo1 from '../../chachapoya-logo.png'
import logo1 from '../../Dentsply_Sirona_Logo.png'
import {Link} from 'react-router-dom'
import { url } from '../URL/url'


function Forget(){
   const [usernameReg,setUsernameReg]=useState('')
   const [passwordReg,setPasswordReg]=useState('')
   const [cpasswordReg,setCPasswordReg]=useState('')
   const [pswdstatus,setPswdStatus]=useState('')
  // document.body.style.backgroundColor = "wheat"



const forget=(e)=>{
    e.preventDefault();
   
    
       Axios.post(url+"/apiCalls/forget",{
        username: usernameReg,
        password: passwordReg,
       cpassword:cpasswordReg,
        
    }).then((response)=>{
      
      
         setPswdStatus(response.data.message);
         setUsernameReg('');
         setPasswordReg('');
         setCPasswordReg('');
       // alert(response.data.message)
       
    });
};
return(
<div className="background-login">




<div className="login-design">


<div style={{height:"100vh",marginTop:"25%",width:"40%"}}>
<div>
<img className="login-img" src={logo1} alt='Logo'/>
</div>
<br/>

<div>
<label class="timesheet-font" style={{fontSize:"60px",color:"black"}}>ERP</label><label class="timesheet-font" style={{fontSize:"50px",color:"black"}}></label>
</div>
</div>

<div class="login">

<form className="loginst" onSubmit={forget}>
<h3>{pswdstatus}</h3>
<h3 className="login-forget-fonts">Forget Password</h3>
<div>
    <div className="login-input">
<label className="login-label">Login Id:</label><br/>
<input type="text" placeholder="Enter Username"  value={usernameReg}  onChange= {(e) => {
    setUsernameReg(e.target.value);
    }} required/>
    </div><br/>
    <div className="login-input">
<label className="login-label">New Password</label><br/>
<input type="password" placeholder="Enter New password" value={passwordReg}  onChange= {(e) => {
    setPasswordReg(e.target.value);
    }} required/>
    </div><br/>
    <div className="login-input">
<label className="login-label">Confirm Password</label><br/>
<input type="password" placeholder="Confirm password" value={cpasswordReg} onChange= {(e) => {
    setCPasswordReg(e.target.value);
    }} required/>
    </div>
<br/>
{/* <input type="button" value="Log in" class="button" onClick={()=> ReturnLogin()}/>{' '}  */}
<input type="submit" value="Submit" style={{backgroundColor:"black"}} />{' '}<br/><br/>
goto login page{'  '} <Link to="/Login" style={{fontWeight:"bold"}}>Sign in</Link><br/><br/>
</div>
</form>
</div>






</div>

</div>
)

}
export default Forget;
