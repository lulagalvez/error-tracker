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
           <Route path='/adminview' element={<AdminView/>}/> 
           <Route path='/devview' element={<DevView/>}/> 
           <Route path='/signup' element={<SignUp />} /> 
            <Route path='/login' element={<LogIn />} /> 
           <Route path='/report' element={<div className='page-container'><CrearBug title='Reportar Bug' /></div>}/>   
          </Routes>   
        </Router>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      </> 
    );
  }
}

export default App;
