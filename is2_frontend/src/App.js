import Navbar from './components/Navbar';
import './App.css';
import React, {Component} from 'react';
import Home from './components/pages/Home';
import CrearBug from './components/ReportBug/bugForm';
import Contact from './components/pages/Contact';
import Services from './components/pages/Services';
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
           <Route path='/contact' element={<Contact/>}/> 
           <Route path='/report' element={<div className='page-container'><CrearBug title='Reportar Bug' /></div>}/>   
          </Routes>   
        </Router>

      </> 
    );
  }
}

export default App;
