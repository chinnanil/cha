import React, { useState,useEffect } from 'react';
import './createDeal.css'
import Header from "../header/header";
import { url } from '../URL/url'
import Axios from 'axios';
import {useHistory,useLocation} from 'react-router-dom';
import {AiOutlineUserDelete, AiOutlineUserAdd} from "react-icons/ai"
import {IoIosAddCircle, IoIosRemoveCircle} from 'react-icons/io'



const UpdateDeal = ()=>{
        const history = useHistory()
        const location = useLocation();

        const Role = localStorage.getItem("Role")

        
        const [state, setState]=useState({
       
            ClientName:"",
            ProjectName:"",
            DealType:"",
            ClientContact:"",
            DealStage:"",
            ProjectStartDate:"",
            ProjectEndDate:"",
            Hours:"",
            SOWAmount:"",
            DealOwner:"",
            ClosedBy:"*",
            ClientAddress:'',
            SourceCompany:""
        })
    
        const [rrState,setRRState] = useState([{ 
            id:"",
            Rate:"",
            Hours:""
        }])

        
    const [address, setAddress]=useState({
        HouseNo:"",
        Address1:"",
        Address2:"",
        Street:"",
        State:"",
        ZipCode:"",
        Country:""
         
     })

     const [addressHide, setAddressHide] = useState(false)

    const [dealOwners1, setDealOwners1 ] = useState([])
    const [resources1, setResources1 ] = useState([])

    useEffect(() => {
        const deal = location.state.Deal
        var arr2=[];
        const rdata = deal.Resources
        const address = deal.AddressDetails
        console.log("Rdata: ",rdata)
        // var nameArr = rdata.split(',');
        
        // for(var i=0;i<nameArr.length;i++){
        //     var Array = nameArr[i].split('-');
        //     let x={id:Array[0],Rate:Array[1]}
        //     arr2.push(x)
        // }

         setRRState(JSON.parse(rdata))
         setAddress(JSON.parse(address))

        var statevalues = {
            ClientName:deal.ClientName,
            ProjectName:deal.ProjectName,
            DealType:deal.DealType,
            ClientContact:deal.ClientContact,
            DealStage:deal.DealStage,
            ProjectStartDate:deal.ProjectStartDate,
            ProjectEndDate:deal.ProjectEndDate,
            Hours:deal.Hours,
            SOWAmount:deal.SOWAmount,
            DealOwner:deal.DealOwner,
            ClosedBy:"*",
            SourceCompany:deal.SourceCompany

        }
        
        setState(statevalues)

        
        var users = []
        var owners = []
    
        Axios.get(url+"/DENTSPLY/users", {
           
        }).then((response) => {
            
        
            for(let i=0;i<response.data.length;i++){
          
                if(response.data[i].Role === "SalesAdmin"){
                    owners.push(response.data[i])
                }else{
                    users.push(response.data[i])
                }
            }
            setDealOwners1(owners)
            setResources1(users)
        }
    
        )
       
           
    }, [])
    


    var disableFields = true;
    var uid = localStorage.getItem("LoginId")

    if(uid === state.DealOwner.toUpperCase()){
        disableFields = false;
    }
   

    const DealState = (e)=>{
       
    let value =e.target.value;

    setState({
        ...state,
        [e.target.name]:value})

    }

    const AddressState = (e)=>{
      
        let value =e.target.value;
        setAddress({ ...address, [e.target.name]:value})

        }  

    const AddressHide = (e)=>{
        e.preventDefault()
    setAddressHide(prev=>!prev)

    }    


    const AddResource = (e)=>{
        
        let val = {
        id:"",
        Rate:"",
        Hours:""
        }
        setRRState(prestate=> [...prestate,val])
    }

    const DeleteResource = (index)=>{

        const temp = [...rrState];
        temp.splice(index, 1);
        setRRState(temp);
        alert("Resource Deleted")
    }
    
    const handleResources = (data,property,index)=>{
      
        let newArr = rrState.map((item, i) => {
            if (index == i) {
              return { ...item, [property]: data };
            } else {
              return item;
            }
          });
          setRRState(newArr);
    }


    const dateFormats = (myDate)=>{
        if(myDate){
            var d = new Date(new Date(parseInt(myDate.substring(0,4)), parseInt(myDate.substring(5,7))-1, parseInt(myDate.substring(8,10))));
            return d;
        }else{alert("Date Should be mandatory")}

    }  

    const errResources = (rrState)=>{
        var err = false;
        let Arr =[]
        for(let i=0;i<rrState.length;i++){
          
            if(!(Arr.includes(rrState[i].id))){
                Arr.push(rrState[i].id)

            }else{
                err=true
               break;
            }
        }
        return err

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("State values:",state)
        console.log("Resource values:",rrState)
        const errState = errResources(rrState)
        if(!errState){
        Axios.post(url+"/DENTSPLY/updatedeal",{
            id:localStorage.getItem('LoginId'),
            tasklist:state,
            resources:rrState,
            address:address

              }).then((response)=>{
               if(response) {

                if(response.data.message==="Deal Updated")
                {
                  alert(response.data.message)
                 history.push("/Header")
              }
            }
        })
        }else{   alert("Resources Could not be Same")   }
    }

   

    return(
        <div>
        <Header />
        <br/><br/>
        <div className="deal-create">
          

<center>
<h1> Update Deal </h1>
</center>


<form onSubmit={handleSubmit} >



  <div className="deal-input-container">
    <label className="deal-input-label">Client Name<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ClientName"
            disabled={true}
        value={state.ClientName}
        onChange={(e)=>DealState(e)}
        required 
            />
    </div>
</div>
<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Project Name<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ProjectName"
            disabled={true}
            value={state.ProjectName}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
<label className="deal-input-label">Deal Type<super style={{color:"red"}}>*</super> : </label>

<select className="deal-input-select" 
name="DealType"
value={state.DealType}
disabled={true}
onChange={(e)=>DealState(e)}
required>
<option value="">Choose Option</option>
<option value="New Business">New Business</option>
<option value="Existing Business">Existing Business</option>

</select>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Client Contact<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="ClientContact"
            disabled={disableFields}
            value={state.ClientContact}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>
<br/><br/>




<div className="deal-addresource-container">
    <label className="deal-addresource-label">Client Address:&nbsp;&nbsp;
    {addressHide? 
    <IoIosRemoveCircle className="resource-icon" onClick={(e)=>AddressHide(e)}/>
    :
    <IoIosAddCircle className="resource-icon" onClick={(e)=>AddressHide(e)}/>
}
    </label>

</div>
<br/><br/>

{addressHide ? 
<div>
<div className="deal-input-container">
    <label className="deal-input-label">House No<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="HouseNo"
            value={address.HouseNo}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Address1<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="Address1"
            value={address.Address1}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Address2: </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="Address2"
            value={address.Address2}
            onChange={(e)=>AddressState(e)}
          
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Street<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="Street"
            value={address.Street}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">State<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="State"
            value={address.State}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Zip Code<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="ZipCode"
            value={address.ZipCode}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Country<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input  
           type="text"
            name="Country"
            value={address.Country}
            onChange={(e)=>AddressState(e)}
            required 
            />
    </div>
</div>
</div>

:null}
<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">Source Company<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
    <select className="deal-input-select" 
            name="SourceCompany"
            value={state.SourceCompany}
            onChange={(e)=>DealState(e)}
            required>
            <option value="">Choose Option</option>
            <option value="EALABS">EALABS</option>
            <option value="CHACHAPOYA">CHACHAPOYA</option>
            
    </select>
    </div>
</div>

<br/><br/>


<div className="deal-input-container">
<label className="deal-input-label">Deal Stage<super style={{color:"red"}}>*</super> : </label>

<select className="deal-input-select" 
name="DealStage"
disabled={disableFields}
value={state.DealStage}
onChange={(e)=>DealState(e)}
required>
<option value="">Choose Option</option>
<option value="Appointment Scheduled">Appointment Scheduled</option>
<option value="Qualified to Buy">Qualified to buy</option>
<option value="Presentation Scheduled">Presentation Scheduled</option>
<option value="Contract sent">Contract sent</option>
<option value="Closed won">Closed won</option>
<option value="Closed lost">Closed lost</option>
</select>
</div>

<br/><br/>
<div className="deal-input-container">
    <label className="deal-input-label">Project Start Date<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="date" 
            name="ProjectStartDate"
            disabled={true}
            value={state.ProjectStartDate}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>

<br/><br/>
<div className="deal-input-container">
    <label className="deal-input-label">Project End Date<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="date" 
            name="ProjectEndDate"
            disabled={true}
            value={state.ProjectEndDate}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">Hours<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="Hours"
            pattern="^-?[0-9]\d*\.?\d*$"
            disabled={disableFields}
            value={state.Hours}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>

<br/><br/>

<div className="deal-input-container">
    <label className="deal-input-label">SOW Amount<super style={{color:"red"}}>*</super> : </label>
    <div className="deal-inputs">
        <input
            type="text" 
            name="SOWAmount"
            pattern="^-?[0-9]\d*\.?\d*$"
            disabled={disableFields}
            value={state.SOWAmount}
            onChange={(e)=>DealState(e)}
            required 
            />
    </div>
</div>

<br/><br/>


<div className="deal-input-container">
    <label className="deal-input-label">Deal Owner<super style={{color:"red"}}>*</super> : </label>

    <select className="deal-input-select" 
    name="DealOwner"
    disabled={true}
    value={state.DealOwner}
    onChange={(e)=>DealState(e)}
    required>
    <option value="">Choose Option</option>
    {dealOwners1.map(dealOwner=>{
        return <option value={dealOwner.uid}>{dealOwner.fname}</option>
    })}
    </select>
</div>



<br/><br/>

<div className="deal-addresource-container">
    <label className="deal-addresource-label">Add Resource:&nbsp;&nbsp;
    {disableFields?
    <AiOutlineUserAdd className="resource-icon" style={{color:"green"}}/>
    :
    <AiOutlineUserAdd className="resource-icon" style={{color:"green"}} onClick={(e)=>AddResource(e)}/>
    }
    
    </label>
    


</div>
<br/><br/>

{rrState.map((element,index)=>{
return(
   
<div className="resource-rate-component" key={index}>

    <div className="rr-component">
        {disableFields?
        <AiOutlineUserDelete className="resource-icon" style={{color:"red"}} />
        :
        <AiOutlineUserDelete className="resource-icon" style={{color:"red"}} onClick={(e)=>DeleteResource(index)}/>
        }   
    </div>
   
   <div className="rr-component">
       <label>Resource<super style={{color:"red"}}>*</super>:</label>
  
       <select className="deal-input-select" 
       name="id"
       value={element.id}
       onChange={(e)=>handleResources(e.target.value,e.target.name,index)}
       required
       disabled={disableFields}
       >
       <option value="">Choose Option</option>
       {resources1.map(resource=>{
           return <option value={resource.uid}>{resource.uid}-{resource.fname}</option>
       })}
       </select>
   </div>
  
   
   <div className="rr-component">
        <label>Rate<super style={{color:"red"}}>*</super>:</label>
      <input className="resource-rate"  style={{width:"30px"}}
      name="Rate"  
      value={element.Rate}
      onChange={(e)=> handleResources(e.target.value,e.target.name,index)} 
      pattern="^-?[0-9]\d*\.?\d*$" 
      required
      disabled={disableFields}
      />
      </div>

    <div className="rr-component">
        <label>Hours:</label>
      <input className="resource-rate" style={{width:"30px"}}
      name="Hours"  
      value={element.Hours}
      onChange={(e)=> handleResources(e.target.value,e.target.name,index)} 
      pattern="^-?[0-9]\d*\.?\d*$" 
      disabled={disableFields}
      />
    </div> 
   </div>
)
})}

<br/><br/>


{(disableFields)?null:<input type="submit" value="Submit"/>}
</form>
        </div>
        <br/><br/>
        </div>
    )
}
export default UpdateDeal;