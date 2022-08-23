import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import './allDeals.css'
import Axios from 'axios';
import { url } from '../URL/url'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'


const AllDeals = ()=>{
    const history = useHistory();

    const [deals,setDeals] = useState([])
    const [ClientName, setClientName ] = useState([])
    const [ProjectName, setProjectName ] = useState([])
const[ClientNamehrs, setClientNamehrs] = useState([])
const[ProjectNamehrs,setProjectNamehrs] = useState([])



const[phrs,setphrs]=useState([])
    const [Jobstate, setJobState]=useState({
       
        PercentageCompleted:"",
        Status:"",
        Comments:"",
        Showstopper:"",
        priority:"",
        attachment:""
    });

    const [resources, setresources]=useState([])
       
    const [searchOptions,setSearchOptions]=useState({
                                                    ClientName:"",
                                                    ProjectName:""
                                                   
                                                })



    var loginId = localStorage.getItem("LoginId")                                            


   
    
    useEffect(() => {
        var owners=[]
        var client=[]
        var project1=[]
        var project=[]
        var hrs=[]
       
        console.log("user id: ",loginId)
           
        Axios.get(url+"/DENTSPLY/allProjects", {
            params:{
            id:loginId
        }
          
                }).then((response) => {

                    var fArray=[]

                    for(let i=0;i<response.data.length;i++){
                        if(!owners.includes(response.data[i].ClientName)){
                            owners.push(response.data[i].ClientName)
                        }if(!project.includes(response.data[i].ProjectName)){
                            project.push(response.data[i].ProjectName)
                        }



                        var res=JSON.parse(response.data[i].Resources)
                        console.log(res,"res22")
                        var resources=[]
                       for(var j=0;j<res.length;j++){ 
                          if(parseInt(j)===parseInt(res.length)){
                               resources.push(res[j])
                            }else{
                                resources.push(res[j]+",")
                            }
                           console.log(j,"j")
                           console.log(res.length,"res.length")
                        }
                        console.log(resources,"resources")
                        fArray.push(resources)


                        console.log(owners[i],"owners")
                        hrs.push(response.data[i].HoursUsed)
                        console.log(hrs)
                    }
                    setphrs(hrs)
                    setClientName(owners)
                    setProjectName(project)
                    setDeals(response.data)
                    setresources(fArray)
                    setJobState(response.data)
                }
        
                )
              
                Axios.get(url+"/DENTSPLY/phours", {
                    params:{
                    id:loginId
                }
            }).then((response) => {
                for(var i=0;i<response.data.length;i++){
                    client.push(response.data[i].Country)
                    project1.push(response.data[i].Location)
                    hrs.push(parseInt(response.data[i].Monday)+parseInt(response.data[i].Tuesday)+parseInt(response.data[i].Wednesday)+parseInt(response.data[i].Thursday)+parseInt(response.data[i].Friday)+parseInt(response.data[i].Saturday)+parseInt(response.data[i].Sunday))
               }
                console.log(hrs,"hrs");
//console.log(response.data[0].Country,"response hrs");
setClientNamehrs(client)
setProjectNamehrs(project1)
//setphrs(hrs)
            });
console.log(owners[0],"owners")
            for(var i=0;i<owners;i++){
console.log(owners[i],"owners",client[i],"client[i]")
                if((owners[i]==client[i])&& (project[i]==project1[i])){
                            setphrs(hrs[i])
                }
            }

    }, [])
    

   

    const JobState = (e)=>{
       
       
        let value =e.target.value;
        
        
        console.log(value+"value aa")
        
        setJobState({
                ...Jobstate,
                [e.target.name]:value})
        
        console.log("jobDetails: ",Jobstate)
            }
        

    const SearchOptions=(e)=>{
        console.log("property:",e.target.name+"value:",e.target.value)
        const value=e.target.value
        
        setSearchOptions({
            ...searchOptions,
            [e.target.name]:value})
        
        
        }

    const NavigateDeal = (val)=>{
        history.push({

            pathname: '/updateDeal',
           // search: '?update=true',  // query string
            state: {  // location state
              Deal: val, 
            },
        })

        
    }









    const filterDeal = (deal)=>{

        if(searchOptions.ClientName && searchOptions.ProjectName){
            
            if(searchOptions.ClientName === deal.ClientName && searchOptions.ProjectName === deal.ProjectName){
                return true
            }else {return false}
            
        }if(searchOptions.ClientName && !searchOptions.ProjectName){
            if(searchOptions.ClientName === deal.ClientName){
                return true
            }else {return false}

        }if(!searchOptions.ClientName && searchOptions.ProjectName){
            if(searchOptions.ProjectName === deal.ProjectName){
                return true
            }else {return false}

        }else if(searchOptions.ClientName && !searchOptions.ProjectName){
            if(searchOptions.ClientName === deal.ClientName){
                return true
            }else {return false}

        }else if(!searchOptions.ClientName && searchOptions.ProjectName){
            if(searchOptions.ProjectName === deal.ProjectName){
                return true
            }else {return false}

        }else{
            return true
        }  

    }
    
   
    return(
        <div >
    
            <div className="deal-filters">
            <div className="deal-filter-container">
                <label  style={{color:"black"}} >Client Name:</label>&nbsp;
                <select className ="deal-filter-select" name="ClientName" value={searchOptions.ClientName} onChange={(e)=>SearchOptions(e)}>
                    <option value="">Choose One</option>
                    {ClientName.map(owner=>{
                        return <option value={owner}>{owner}</option>
                    })}
                </select>
            </div>&nbsp;

            <div className="deal-filter-container">
                <label style={{color:"Black"}}>Project Name:</label>&nbsp;
                <select className ="deal-filter-select" name="ProjectName" value={searchOptions.ProjectName} onChange={(e)=>SearchOptions(e)}>
                    <option value="">Choose One</option>
                    {ProjectName.map(project=>{
                        return <option value={project}>{project}</option>
                    })}
                </select>
            </div>&nbsp;

           </div>
        <br></br>           
            <table id="AllDeals" className="deal-table">
                <thead className="deal-thead">
                    
                    <th className="deal-th">Client Name</th>
                    <th className="deal-th">Project Name</th>
                    <th className="deal-th">Resources </th>
                    
                    <th className="deal-th">Project<br></br> Start Date</th>
                    <th className="deal-th">Project <br></br> End Date</th>
                    <th className="deal-th">SOW<br></br> Hours</th>
                    <th className="deal-th">Hours<br></br> Used </th>
                    <th className='deal-th'>Percentage<br></br> Completed</th>
                    <th className='deal-th'>Status</th>
                    <th className='deal-th'>Comments</th>
                    <th className='deal-th'>Show Stopper</th>
                    <th className='deal-th'>Priority</th>
                    <th className='deal-th'>Attachment</th>
                </thead>
                <tbody>
                   {deals.length>0 ?
                   deals.filter((deal)=>filterDeal(deal))
                   .map((deal,idx)=>{
                       return(
                           <tr>
                            <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.ClientName}</span></div></td>
                            <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.ProjectName}</span></div></td>

                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{resources[idx]}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.ProjectStartDate}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.ProjectEndDate}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.Hours}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{phrs}</span></div></td>

                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.PercentageCompleted}</span></div></td>
                              
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.Status}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.Comments}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.Showstopper}</span></div></td>
                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}>{deal.priority}</span></div></td>

                               <td><div className="deal-field"><span className="navigate-deal" style={{color:"black"}}><input type="file"name="attachment"value={deal.attachment}onChange={(e)=>JobState(e)}required/></span></div></td>

                           
                           
                           </tr>
                       )
                   })
                 
                   
                :null}
                </tbody>


            </table>
            <br/> 

    
        

       
     
       
        </div>
    )
}
export default AllDeals;