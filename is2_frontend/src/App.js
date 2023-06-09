import React, {Component, useEffect} from 'react';
/* import Navbar from './components/Navbar'; */
import './components/css/App.css';/* 
import Home from './components/pages/Home/Home'; */
import CrearBug from './components/pages/BugForm/bugForm';
import AdminView from './components/pages/AdminView/AdminView';
/* import AdminViewMain from './components/pages/VistaAdmin/AdminViewMain'; */
import DevView from './components/pages/DevView/DevView';
/* import DevView_test from './components/pages/DevView/DevView_test'; */
import UserReportView from  './components/pages/User/UserReportView'; 
import SideBarUser  from './components/pages/Sidebars/SidebarUser';
import SideBarAdmin from './components/pages/Sidebars/SidebarAdmin';
import SideBarDeveloper from './components/pages/Sidebars/SidebarDeveloper';
import SignUp from './components/pages/SignUp/SignUp';
import LogIn from './components/pages/Login/Login';
import DevStats from './components/pages/DevStats/DevStats'
import WelcomeIcon from './components/welcome';
import {  BrowserRouter as Router,  Routes,  Route, Navigate, Outlet} from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}) => {
  const logged = Cookies.get('authenticated');
  const type_of_user = Cookies.get('type_of_user');

  if (!logged || !type_of_user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};

const logged = Cookies.get('authenticated');
const type_of_user = Cookies.get('type_of_user');

class App extends Component {
  
  constructor(props){
    super(props);   
  }
  render(){
    return (
        <>
        <Router>
          <Routes>
              <Route path='/signup' element={<SignUp />} />
             <Route path='/welcome' element={<WelcomeIcon />} />
              {/* <Route path='/adminview' element= {<AdminViewMain />} /> */}
              <Route path='/userreportview' element={<UserReportView />} />   
              <Route path='/login' element={<LogIn />} /> 
              <Route path='/' exact element={<LogIn/>}/>
              <Route path="*" element={<p>No hay nada aqui: 404</p>} />

              {/* RUTAS PROTEGIDAS */} 
              <Route path='/adminview'element={<ProtectedRoute redirectPath="/login" 
                isAllowed={logged && type_of_user === 'admin'}>
                  <WelcomeIcon/>
                  <SideBarAdmin/>
                  <AdminView/>  
                </ProtectedRoute>}
              />
            
            <Route path='/devview' element={
              <ProtectedRoute redirectPath="/login"
                isAllowed={logged && type_of_user === 'developer' | 'admin'}>
                <WelcomeIcon />
                <SideBarDeveloper/>
                <DevView />
              </ProtectedRoute>} 
            />
            
            <Route path='/devstats' element={
              <ProtectedRoute redirectPath="/login"
                isAllowed={logged && type_of_user === 'developer'}>
                <WelcomeIcon />
                <SideBarDeveloper />
                <DevStats />
              </ProtectedRoute>}
            /> 
            
            <Route path='/report' element={
            <ProtectedRoute redirectPath="/login"
              isAllowed={logged && type_of_user === 'user'}>
              <WelcomeIcon />
              <SideBarUser />
              <CrearBug title='Reportar bug'/>
            </ProtectedRoute>} />
            
            <Route path='/my_reports' element={
            <ProtectedRoute redirectPath="/login"
              isAllowed={logged && type_of_user === 'user'}>
              <WelcomeIcon />
              <SideBarUser/>
              <UserReportView />
            </ProtectedRoute>} /> 
          </Routes>   
        </Router>

      </> 
    );
  }
}

export default App;
