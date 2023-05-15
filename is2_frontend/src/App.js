import Navbar from './components/Navbar';
import './App.css';
import React, {Component} from 'react';
import Home from './components/pages/Home';
import CrearBug from './components/ReportBug/bugForm';
import Contact from './components/pages/Contact';
import AdminView from './components/pages/Admin/AdminView';
import Services from './components/pages/Services';
import DevView from './components/pages/DevView';
import DevView_test from './components/pages/DevView_test';
import UserReportView from  './components/pages/User/UserReportView'; 
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

class App extends Component {

  constructor(props){
    super(props);   
  }
  render(){
    return (
        <>
        <Router>
        <Navbar />
          <Routes>
           <Route path='/' exact element={<Home/>}/>
           <Route path='/services' element={<Services/>} />
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
