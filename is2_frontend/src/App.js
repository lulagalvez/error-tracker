import React, {Component} from 'react';
import Navbar from './components/Navbar';
import './components/css/App.css';
import Home from './components/pages/Home/Home';
import CrearBug from './components/pages/BugForm/bugForm';
import AdminView from './components/pages/AdminView/AdminView';
import AdminViewMain from './components/pages/VistaAdmin/AdminViewMain';
import DevView from './components/pages/DevView/DevView';
import DevView_test from './components/pages/DevView/DevView_test';
import UserReportView from  './components/pages/User/UserReportView'; 
import SideBar from './components/pages/Sidebar/Sidebar';
import SignUp from './components/pages/SignUp/SignUp';
import SideBar from './components/pages/Sidebar/Sidebar';
import LogIn from './components/pages/Login/Login';
import {  BrowserRouter as Router,  Routes,  Route, Navigate, Outlet} from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/login',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
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
        <SideBar />
          <Navbar />  
          <Routes>
<<<<<<< HEAD
              <Route path='/signup' element={<SignUp />} /> 
              <Route path='/login' element={<LogIn />} />
              <Route path='/' exact element={<LogIn/>}/>
              <Route path="*" element={<p>No hay nada aqui: 404</p>} />
              {/* RUTAS PROTEGIDAS */} 
              <Route 
                path='/adminviewmain'
                element={<ProtectedRoute redirectPath="/login" 
                isAllowed={logged && type_of_user === 'admin'}>
                  <AdminViewMain/>  
                </ProtectedRoute>}
              />
            <Route path='/devview' element={
              <ProtectedRoute redirectPath="/login"
                isAllowed={logged && type_of_user === 'developer'}>
                <DevView />
              </ProtectedRoute>} 
            /> 
            
            <Route path='/report' element={
            <ProtectedRoute redirectPath="/login"
              isAllowed={logged && type_of_user === 'user'}>
              <CrearBug />
            </ProtectedRoute>} />
            
            <Route path='/my_reports' element={
            <ProtectedRoute redirectPath="/login"
              isAllowed={logged && type_of_user === 'user'}>
              <UserReportView />
            </ProtectedRoute>} /> 
         
=======
           <Route path='/' exact element={<Home/>}/>
           <Route path='/adminview' element={<AdminView/>}/> 
           <Route path='/adminviewmain' element={<AdminViewMain/>}/> 
           <Route path='/devview' element={<DevView_test/>}/> 
           <Route path='/my_reports' element={<UserReportView/>}/> 
>>>>>>> 1ec4c00e5c42947d8154aeb3342e0dc7699673db
          </Routes>   
        </Router>

      </> 
    );
  }
}

export default App;
