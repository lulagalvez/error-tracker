import Navbar from './components/pages/Navbar';
import './components/css/App.css';
import React, {Component} from 'react';
import Home from './components/pages/Home';
import CrearBug from './components/pages/bugForm';
import Contact from './components/pages/Contact';
import AdminView from './components/pages/AdminView';
import Services from './components/pages/Services';
import DevView from './components/pages/DevView';
import SignUp from './components/pages/SignUp';
import SideBar from './components/pages/Sidebar/Sidebar';
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";

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
           <Route path='/services' element={<Services/>} />
           <Route path='/adminview' element={<AdminView/>}/> 
           <Route path='/devview' element={<DevView/>}/> 
           <Route path='/signup' element={<SignUp />} /> 
           <Route path='/report' element={<div className='page-container'><CrearBug title='Reportar Bug' /></div>}/>   
          </Routes>   
        </Router>

      </> 
    );
  }
}

export default App;
