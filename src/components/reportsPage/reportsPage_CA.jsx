import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import Header from "../header/header";
import Select from 'react-select'
import { url } from '../URL/url'

var users;
var years = [];



const ReportsRequestPage = () => {

    const history = useHistory();

    
    const [reportType, setReportType] = useState('');
    const [user, setUser] = useState('');
    const [user1, setUser1] = useState('');
    const [mReports, setMReports] = useState('');
    const [hReports, setHReports] = useState('');

    const [rYear, setRYear] = useState('');
    const [rMon, setRMon] = useState('');
    const [rWeek, setRWeek] = useState('');

    const [userids, setUserIds] = useState([]);

    const Role = localStorage.getItem("Role");
    
    const LoginId = localStorage.getItem('LoginId');
    const country = localStorage.getItem("Country")
    

    useEffect(() => {
        idsdropdown();
        Datesform();
    }, [])

    const idsdropdown = () => {
        
        //The below axios is used for getting all user id's
     
        Axios.get(url+"/DENTSPLY/idsdropdown", {

    params:{
        Country:country,
        User:LoginId,
        Role:Role,

    }

        }).then((response) => {

            var ids = [];
            response.data.map(id => { ids.push(id.uid + "-" + id.fname) })
            users = ids.toString()

           
            setUserIds(response.data.map(value =>({label:value.fname,value:value.uid+'-'+value.fname})));
            setUserIds(pre => ([...pre,{label:'All',value:'All'}]))
           
        }
        )

    }


    const UserIds = (val) => {

if(val.value === 'All'){
    setUser1("All")
    setUser(users);
} else{
    setUser1(val.value);
    setUser(val.value);
   
}

    }


    const Datesform = () => {

        let thisYear = (new Date()).getFullYear();
        let pYear = thisYear - 15;
        let mYear = thisYear + 15;
        do {
            years.push(pYear + 1)
            pYear++;
        } while (pYear <= mYear)

    }

    const reportsState = (e) =>{
        e.preventDefault();
        if(e.target.value === "Vacation"){
            setMReports(e.target.value)
            setReportType('')
            setRYear('');
            setRMon('');
            setRWeek('');

        }else{
            setMReports(e.target.value)
            setRYear('');
            setRMon('');
            setRWeek('');
           
        }

    }


const ReporttypeValidate = (e) =>{
    setReportType(e.target.value)
    setRWeek('');
    setRMon('');
    setRYear('')
}


    const handleSubmit = (e) => {
       
e.preventDefault();


if(Role === "Super Admin" || Role === "Admin" || Role === "Manager"){
   
if(user !== ""){
    if((reportType==="Semi Monthly") && (rWeek !== "")){
        history.push('/SemiMonthlyReports_CA')
    }else if((reportType==="Bi-WeeklyPRS") && (rWeek !== "")){
        history.push('/Bi_WeeklyPRSReports')
    }else if((reportType==="Monthly")&& (rMon !== "" && rYear !== "")){       
         console.log("monthly reports 1");
        history.push('/MonthlyReports')
    }else if((reportType==="Weekly")){
        console.log("weekly reports 1");
        history.push('/WeeklyReports')
    }else{
       
    }
}else{
    alert("Mandatory Fields are Missing..")
}
    
}



if(Role !== "Super Admin" && Role !== "Admin" && Role !== "Manager"){
  

    if(LoginId !== ""){

    if((reportType==="Semi Monthly") && (rWeek !== "")){
        history.push('/SemiMonthlyReports_CA')
    }else if((reportType==="Bi-WeeklyPRS") && (rWeek !== "")){
        history.push('/Bi_WeeklyPRSReports')
    }else if((reportType==="Monthly")){
        history.push('/MonthlyReports')
        console.log("monthly reports 1")
    }else if((reportType==="Weekly")){
            console.log("weekly reports ");
            history.push('/WeeklyReports')
        }else{
        console.log("Monthly reports"+reportType)
        alert("Mandatory Fields are Missing..")
    }
}else{
    console.log("Monthly reports else")
    alert("Mandatory Fields are Missing..")
}
    
}


// if((Role === "Super Admin" || Role === "Admin" || Role === "Manager") && (user !== "") && (mReports === "Vacation" || reportType==="Vacation" || hReports ==="Vacation" ) && (rYear !== "")){
 
//     history.push('/VacationReports_CA')
// }else if((Role !== "Super Admin" || Role !== "Admin" || Role !== "Manager") && (LoginId !== "") && (mReports === "Vacation" || reportType==="Vacation" || hReports ==="Vacation") && (rYear !== "")){
    
//     history.push('/VacationReports_CA')
// }else if((Role === "Super Admin" || Role === "Admin" || Role === "Manager") && user !== "" && (mReports === "Semi Monthly" || reportType==="Semi Monthly"  || hReports ==="Semi Monthly") && rWeek !== ""){
    
//     history.push('/SemiMonthlyReports_CA')
// }else if((Role !== "Super Admin" || Role !== "Admin" || Role !== "Manager") && LoginId !== "" && (mReports === "Semi Monthly" || reportType==="Semi Monthly" || hReports ==="Semi Monthly") && rWeek !== ""){
    
//     history.push('/SemiMonthlyReports_CA')
// }else {
//     alert("Mandatory Fields are Missing..")
// }



        localStorage.setItem("ReportUsers", user)// selected users from dropdown
        localStorage.setItem("MReports", mReports)//if user== manager then it chooses which type of reports Projec or Timesheet
        localStorage.setItem("ReportType", reportType)//Report type weekly or monthly or yearly
        localStorage.setItem("HReports", hReports)//if hr login and used for the user Reports

        localStorage.setItem("RYear", rYear)
        localStorage.setItem("RMonth", rMon)
        localStorage.setItem("RWeek", rWeek)
        localStorage.setItem("ReportUsers1", user1)




//         if((Role === "Super Admin" || Role === "Admin" || Role === "Manager") && user !== ""){
// console.log("Super admin",user,"user")
//         if (reportType === "Semi Monthly" && rWeek !== "" && (user !== "" || LoginId !== "")) {
//             localStorage.setItem("rDate",rWeek)
//             history.push('/SemiMonthlyReports_CA')
//         }
//         else if (mReports === "Vacation"||hReports==="Vacation"||reportType==="Vacation" ) {
//             history.push('/VacationReports_CA')
//         }/*
//         else if (mReports === "Sick Leave"||hReports==="Sick Leave"||reportType==="Sick Leave" ) {
//             history.push('/SickLeaveReports')
//         }
//         else if (mReports === "Vacation_Accural"||hReports==="Vacation_Accural"||reportType==="Vacation_Accural" ) {
//             history.push('/VacationAccural')
//         }*/
//         localStorage.setItem("ReportUsers", user)// selected users from dropdown
//         localStorage.setItem("MReports", mReports)//if user== manager then it chooses which type of reports Projec or Timesheet
//         localStorage.setItem("ReportType", reportType)//Report type weekly or monthly or yearly
//         localStorage.setItem("HReports", hReports)//if hr login and used for the user Reports

//         localStorage.setItem("RYear", rYear)
//         localStorage.setItem("RMonth", rMon)
//         localStorage.setItem("RWeek", rWeek)
//         localStorage.setItem("ReportUsers1", user1)

    
// } else if ((Role !== "Super Admin" || Role !== "Admin" || Role !== "Manager") && LoginId !== ""){
//     console.log("user login")    
//     if (reportType === "Semi Monthly" && rWeek !== "" && (user !== "" || LoginId !== "")) {
//             localStorage.setItem("rDate",rWeek)
//             history.push('/SemiMonthlyReports_CA')
//         }
//         else if (mReports === "Vacation"||hReports==="Vacation"||reportType==="Vacation" ) {
//             history.push('/VacationReports_CA')
//         }/*
//         else if (mReports === "Sick Leave"||hReports==="Sick Leave"||reportType==="Sick Leave" ) {
//             history.push('/SickLeaveReports')
//         }
//         else if (mReports === "Vacation_Accural"||hReports==="Vacation_Accural"||reportType==="Vacation_Accural" ) {
//             history.push('/VacationAccural')
//         }*/
//         localStorage.setItem("ReportUsers", user)// selected users from dropdown
//         localStorage.setItem("MReports", mReports)//if user== manager then it chooses which type of reports Projec or Timesheet
//         localStorage.setItem("ReportType", reportType)//Report type weekly or monthly or yearly
//         localStorage.setItem("HReports", hReports)//if hr login and used for the user Reports

//         localStorage.setItem("RYear", rYear)
//         localStorage.setItem("RMonth", rMon)
//         localStorage.setItem("RWeek", rWeek)
//         localStorage.setItem("ReportUsers1", user1)

//     }else{
//         alert("Please Enter Required Fields...")
//     }


    }

    return (

        <div style={{height:"100vh"}}>
            <Header />

            <div className="reports-request-form">
                <form onSubmit={handleSubmit}>
                    {Role !== "Super Admin" && Role !== "Manager" && Role !=="Admin" ?
                        <div style={{ paddingTop: "5px",display: "-webkit-inline-box"  }}>
                            <label>Report Type<super style={{color:"red"}}>*</super>: </label>
                            <select className="reports-request-select" required onChange={(e) => {ReporttypeValidate(e)}} >
                                <option value="">Choose Option</option>
                                 {/* <option value="Sick Leave">Sick Leave</option> 								<option value="Vacation">Vacation Entitlement</option> */}
                                {/* <option value="Vacation_Accural">Vacation_Accrual</option>*/}
                               { <option value="Weekly">Weekly</option> }
								{ <option value="Bi-WeeklyPRS">Bi-Weekly</option> }
                                {/* <option value="Weekly">Weekly</option> */}
                                {/* <option value="Vacation">Vacation Entitlement</option>*/}
								<option value="Semi Monthly">Semi Monthly</option>
                               
                                { <option value="Monthly">Monthly</option> }
                              
							
                            </select>&nbsp;
                            {reportType === "Bi-WeeklyPRS" || reportType === "Weekly" || reportType === "WeeklyPRS" || reportType === "Semi Monthly" ?
                                <div>&nbsp;
                                    <label>Week/Date<super style={{color:"red"}}>*</super>: </label>
                                    <input type="date" className="reports-request-date" required value={rWeek} onChange={(e) => { setRWeek(e.target.value) }} />
                                </div>
                                : reportType === "Monthly"
                                    ? <div style={{ height: "100%" }}>&nbsp;
                                        <lable>Month: </lable>
                                        <select className="reports-request-select" required value={rMon} onChange={(e) => { setRMon(e.target.value) }}>
                                            <option value="">Choose Option</option>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                        </select>&nbsp;
                                        <label>Year<super style={{color:"red"}}>*</super>: </label>
                                        <select className="reports-request-select" required value={rYear} onChange={(e) => { setRYear(e.target.value) }}>
                                            <option value="">Choose Year</option>
                                            {years.map(year => {
                                                return <option value={year}>{year}</option>
                                            })

                                            }
                                        </select>&nbsp;
                                    </div>
                                    : reportType === "Yearly" 
                                        ? <div style={{ height: "100%" }}>
                                            <label>Year<super style={{color:"red"}}>*</super>: </label>
                                            <select className="reports-request-select" required value={rYear} onChange={(e) => { setRYear(e.target.value) }}>
                                                <option value="">Choose Year</option>
                                                {years.map(year => {
                                                    return <option value={year}>{year}</option>
                                                })

                                                }
                                            </select>&nbsp;
                                        </div> : ''}
                                        </div>
                        :''}
        

                            {Role === "Manager" || Role === "Super Admin" || Role === "Admin" ?
								<div style={{display:'flex',flexDirection:'column'}}>
								<div className="reports-type-manager">
                                    <div style={{height: '30%'}}>
								<label>Reports<super style={{color:"red"}}>*</super>: </label>&nbsp;&nbsp;
                                    <select className="reports-request-select" required onChange={(e) => { reportsState(e) }}>
                                        <option value="">Choose Option</option>
                                         {/* <option value="Sick Leave">Sick Leave</option>  */}
									
                                        {/* <option value="Vacation_Accural">Vacation_Accrual</option> */}
										{/* <option value="Project">Project</option> */}
                                        <option value="Timesheet">Timesheet</option>
                                    </select>&nbsp;
								</div>
                                    
								{mReports === 'Timesheet'?
                                        <div style={{alignItems: 'center',display: "flex"}}><br/>
                                        <label>Select User<super style={{color:"red"}}>*</super>: </label>&nbsp;
										<Select className="test-select" autosize={true} required options={userids} onChange={val => UserIds(val) } placeholder="search name..."/>
                                        </div>
								:''} 
                                </div><br/>
                                {mReports === 'Timesheet'?
								<div style={{display:'inline-flex'}}>
										{mReports === 'Timesheet'?
                                            <div style={{height: '10%'}}>
                                            <label>Report Type<super style={{color:"red"}}>*</super>: </label>
                                            <select className="reports-request-select" required value={reportType} onChange={(e) => { setReportType(e.target.value) }}>
                                                <option value="">Choose Option</option>
                                                { <option value="Weekly">Weekly</option> }
								{ <option value="Bi-WeeklyPRS">Bi-Weekly</option> }
                                {/* <option value="Weekly">Weekly</option> */}
                               
								<option value="Semi Monthly">Semi Monthly</option>
                                {/* <option value="Yearly">Yearly</option> */}
                               
                                { <option value="Monthly">Monthly</option> }
                              
                                            </select></div>
                                            :''}
											{(reportType === "Bi-WeeklyPRS"  || reportType ==="Weekly"|| reportType === "WeeklyPRS" || reportType === "Semi Monthly")?
											<div>&nbsp;
                                                    <label>Week/Date<super style={{color:"red"}}>*</super>: </label>
                                                    <input type="date" className="reports-request-date" required value={rWeek} onChange={(e) => { setRWeek(e.target.value) }} />
                                                </div>
											: ''}
											{(reportType === "Monthly")?
												<div style={{ height: "100%" }}>&nbsp;
                                                        <lable>Month: </lable>
                                                        <select className="reports-request-select" required value={rMon} onChange={(e) => { setRMon(e.target.value) }}>
                                                            <option value="">Choose Option</option>
                                                            <option value="1">January</option>
                                                            <option value="2">February</option>
                                                            <option value="3">March</option>
                                                            <option value="4">April</option>
                                                            <option value="5">May</option>
                                                            <option value="6">June</option>
                                                            <option value="7">July</option>
                                                            <option value="8">August</option>
                                                            <option value="9">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>&nbsp;
                                                      
                                                        <label>Year<super style={{color:"red"}}>*</super>: </label>
                                                        <select className="reports-request-select" value={rYear} onChange={(e) => { setRYear(e.target.value) }}>
                                                            <option value="">Choose Year</option>
                                                            {years.map(year => {
                                                                return <option value={year}>{year}</option>
                                                            })}
                                                        </select>
                                                   
                                                    </div>
												
											:''}
											{reportType === "Yearly"?
														<div style={{ height: "100%" }}>&nbsp;&nbsp;
                                                            <label>Year<super style={{color:"red"}}>*</super>: </label>
                                                            <select className="reports-request-select" required value={rYear} onChange={(e) => { setRYear(e.target.value) }}>
                                                                <option value="">Choose Year</option>
                                                                {years.map(year => {
                                                                    return <option value={year}>{year}</option>
                                                                })}
                                                            </select>
                                                        </div>
											:''}
											
								</div>
							:''}
							</div>
							
                                : ''}&nbsp;&nbsp;
                    <br/><br/>
                    <input type="submit" value="Submit" onClick={(e) => { handleSubmit(e) }} />
                </form>
                
                
            </div>
            
        </div>
    );
}

export default ReportsRequestPage;