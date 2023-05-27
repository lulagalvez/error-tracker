import React, {Component} from 'react';
import Navbar from './components/Navbar';
import './components/css/App.css';
import Home from './components/pages/Home/Home';
import CrearBug from './components/pages/BugForm/bugForm';
import AdminView from './components/pages/AdminView/AdminView';
import DevView from './components/pages/DevView/DevView';
import DevView_test from './components/pages/DevView/DevView_test';
import UserReportView from  './components/pages/User/UserReportView'; 
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import SideBar from './components/pages/Sidebar/Sidebar';

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
           <Route path='/' exact element={<Home/>}/>
           <Route path='/adminview' element={<AdminView/>}/> 
           <Route path='/devview' element={<DevView_test/>}/> 
           <Route path='/my_reports' element={<UserReportView/>}/> 
          <Route path='/report' element={<div className='page-container'><CrearBug title='Reportar Bug' /></div>}/>   
          </Routes>   
        </Router>

      </> 
    );
  }
}

export default App;
