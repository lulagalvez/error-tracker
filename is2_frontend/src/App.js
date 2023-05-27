import Navbar from './components/Navbar';
import './components/css/App.css';
import React, {Component} from 'react';
import Home from './components/pages/Home/Home';
import CrearBug from './components/pages/BugForm/bugForm';
import AdminView from './components/pages/AdminView/AdminView';
import DevView from './components/pages/DevView/DevView';
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
        {/*  <Navbar />  */}
          <Routes>
              <Route path='/signup' element={<SignUp />} /> 
              <Route path='/login' element={<LogIn />} />
              <Route path='/' exact element={<LogIn/>}/>
              <Route path="*" element={<p>No hay nada aqui: 404</p>} />
              {/* RUTAS PROTEGIDAS */} 
              <Route 
                path='/adminview'
                element={<ProtectedRoute redirectPath="/login" 
                isAllowed={logged && type_of_user === 'admin'}>
                  <AdminView/>  
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
         
          </Routes>   
        </Router>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </> 
    );
  }
}

export default App;
