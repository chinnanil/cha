import React, { useState,useEffect } from 'react';
import './createDeal.css'
import { url } from '../URL/url'
import Axios from 'axios';
import Moment from 'moment';
import { useHistory } from 'react-router';
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io'
import Select from 'react-select'

var users;

const EmployeeEdit1 = ()=>{
const history = useHistory();
    
    
    const [userids, setUserIds] = useState([]);
  
    const [user, setUser] = useState('');
   

    const Role = localStorage.getItem("Role");
    const LoginId = localStorage.getItem('LoginId');
    const country = localStorage.getItem("Country")

    useEffect(() => {
        idsdropdown();
    }, [])

    const idsdropdown = () => {
        
        //The below axios is used for getting all user id's
        
        Axios.get(url+"/DENTSPLY/empedit", {
            params:{
                Country:country,
                User:LoginId,
                Role:Role,
        }

        }).then((response) => {
        console.log("ids response ca: ",response)
            var ids = [];
            response.data.map(id => { ids.push(id.uid + "-" + id.fname) })
            users = ids.toString()

           
            setUserIds(response.data.map(value =>({label:value.uid,value:value.uid+'^'+value.fname})));
            //setUserIds(pre => ([...pre,{label:'All',value:'All'}]))
           
        }
        )

    }
var userid;
    const UserIds = (val) => {
        console.log("Selected value: ",val.label)
           
            setUser(val.value);
            const values = val.value.split('^')
            userid=val.label;
            console.log(userid,"userid")
            localStorage.setItem("userid",userid)
    }


//console.log(userid,"userid")

 const onHandleSubmit = () =>{
//e.preventDefault();
console.log("values: ",user)
  



if(user !== "" ){
    history.push("EmpEdit")
}else{
alert("User Mandatory");
 }
}

    return(

        <div style={{height:"100vh"}}>
           
           <div style={{display: "inline-flex", marginTop: "5%"}}>
           <div style={{alignItems: 'center',display: "flex"}}><br/>
                <label style={{color:"white", Fontweight:"900"}}>Select User: </label>&nbsp;
    			<Select className="test-select" autosize={true} options={userids} onChange={val => UserIds(val) } placeholder="search user..."/>
            </div>
            
            
            
           &nbsp;&nbsp;
            <input type="submit" onClick={onHandleSubmit}/>
            </div>&nbsp;
         
        </div>
    )
}
export default EmployeeEdit1