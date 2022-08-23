import React from 'react';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'


import LoginNew from './components/login/login.jsx'
import Forget from './components/login/forget.jsx';
import Home from './components/menu/home.jsx'
import Header from './components/header/header';

//dashboard module
import DashboardPage_CA from './components/dashboard/dashboardPage_CA'
import UserDashboardPage_CA from './components/userdashboard/UserdashboardPage_CA'
import UserDashBoard_CA from './components/userdashboard/UserDashBoard_CA'

//manager approval
import ManagerApprovalRequest_CA from './components/managerApprovalRequest/ManagerApprovalRequest_CA'


//timesheet module
import TimesheetPage from './components/menu/timesheetPage.jsx'
import RequestTimesheet_CA from './components/requestTimesheet/requesttimesheet_CA'
import Updaterequesttimesheet_CA from './components/updateRequestTimesheet/Updaterequesttimesheet_CA'
import Edittimesheet_CA from './components/editTimesheet/edittimesheet_CA'
import Edit_CA from './components/Edit/Edit_CA'



//reports module
import ReportsPage_CA from './components/reportsPage/reportsPage_CA'
//CA Reports
import SemiMonthlyReports_CA from './components/reports_CA/SemiMonthlyReports_CA';
import Bi_WeeklyPRSReports from './components/reports_CA/Bi_WeeklyPRSReports';
import MonthlyReports from './components/reports_CA/MonthlyReports';
import WeeklyReports from'./components/reports_CA/WeeklyReports';



//deals module
import DealsPage from './components/deals/dealsPage'
import UpdateDeal from './components/deals/updateDeal'


//invoice module
import InvoicePage from './components/invoice/invoicePage'
import CreateInvoice from './components/invoice/createInvoice'
import CreateInvoice_EALABS from './components/invoice/createInvoice_EALABS'


//hr module
import hrpage from './components/HR/hrpage'
import job_info from './components/HR/job_info'
import EmployeeEdit from './components/HR/EmployeeEdit'
import EmpEdit from './components/HR/EmpEdit'



//projectdashboard and pmo module
import projectdashboard from './components/PM/projectdashboard'
import project_dashboard_main from './components/PM/project_dashboard_main'
import projectpage from'./components/PM/projectpage'




//super admin module
//Super Admin Timesheet CA

import SuperAdminTimesheetRequest_CA from './components/superAdminTimesheet_CA/suprAdminTimesheetRequest_CA'
import SuperAdminTimesheetCreate_CA from './components/superAdminTimesheet_CA/superAdminTimesheetCreate_CA'
import SuperAdminTimesheetEdit_CA from './components/superAdminTimesheet_CA/superAdminTimesheetEdit_CA'

//retro module
import RetroRequest_CA from './components/timesheetRetro_CA/retroRequest_CA'
import RetroTimesheet_CA from './components/timesheetRetro_CA/retroTimesheet_CA'


//ticketing module
import ticketGeneration from './components/support/ticketGeneration';
import Ticket from './components/support/tickets';
import UpdateTicketGeneration from './components/support/UpdateTicketGeneration';
import TicketRequest from './components/support/ticketRequest';



  export default function App(){
    return (
      
     <div class='App'>

      
       
    <>
    
    <Router>
      <Route exact path='/' component={LoginNew} />
      <Route exact path='/forget' component={Forget} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/Header' component={Header} />


      <Route exact path='/dashboardpage_CA' component={DashboardPage_CA} />
      <Route exact path='/UserdashboardPage_CA' component={UserDashboardPage_CA} />
      <Route exact path='/UserDashBoard_CA' component={UserDashBoard_CA} />


      <Route exact path='/ManagerApprovalRequest_CA' component={ManagerApprovalRequest_CA} />


      <Route exact path='/timesheetPage' component={TimesheetPage} />
      <Route exact path='/requesttimesheet_CA' component={RequestTimesheet_CA} />
      <Route exact path='/Updaterequesttimesheet_CA' component={Updaterequesttimesheet_CA} />
      <Route exact path='/Edittimesheet_CA' component={Edittimesheet_CA} />
      <Route exact path='/Edit_CA' component={Edit_CA} />


      <Route exact path='/reportsPage_CA' component={ReportsPage_CA} />
      <Route exact path='/SemiMonthlyReports_CA' component={SemiMonthlyReports_CA} />
      <Route exact path='/Bi_WeeklyPRSReports' component={Bi_WeeklyPRSReports}/>
      <Route exact path='/MonthlyReports' component={MonthlyReports}/>
      <Route exact path='/WeeklyReports' component={WeeklyReports}/>
      

      
      <Route exact path='/DealsPage' component={DealsPage} />
      <Route exact path='/updateDeal' component={UpdateDeal} />


      <Route exact path='/InvoicePage' component={InvoicePage} />
      <Route exact path='/CreateInvoice' component={CreateInvoice} />
      <Route exact path='/CreateInvoice_EALABS' component={CreateInvoice_EALABS} />

      
      <Route exact path='/hrpage' component={hrpage} />
      <Route exact path='/job_info' components={job_info}/>
      <Route exact path='/EmployeeEdit' component={EmployeeEdit}/>
      <Route exact path='/EmpEdit' component={EmpEdit}/>
      
    
      <Route exact path='/projectdashboard' component={projectdashboard}/>
      <Route exact path='/project_dashboard_main' component={project_dashboard_main}/>
      <Route exact path='/projectpage' component={projectpage}/>  


      <Route exact path='/SuperAdminTimesheetRequest_CA' component={SuperAdminTimesheetRequest_CA} />
      <Route exact path='/SuperAdminTimesheetCreate_CA' component={SuperAdminTimesheetCreate_CA} />
      <Route exact path='/SuperAdminTimesheetEdit_CA' component={SuperAdminTimesheetEdit_CA} />


      <Route exact path='/RetroRequest_CA' component={RetroRequest_CA} />
      <Route exact path='/RetroTimesheet_CA' component={RetroTimesheet_CA} />


      <Route exact path='/ticketGeneration' component={ticketGeneration} />
      <Route exact path='/ticketRequest' component={TicketRequest} />
      <Route exact path='/tickets' component={Ticket} />
      <Route exact path='/UpdateTicketGeneration/:id' component={UpdateTicketGeneration} />

  
    </Router>
    </>
    
    </div>
    )
  }


