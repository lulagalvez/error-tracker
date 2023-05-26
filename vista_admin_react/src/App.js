//import logo from './logo.svg';
import './App.css';
import React from 'react';
import {MyNavBar} from './templates/MyNavBar';
import {TablaAdmin} from './templates/TablaAdmin';

function App() {
  return (
    <div>
      <React.Fragment>
        <MyNavBar/>
        <br/><br/>
        <TablaAdmin/>
      </React.Fragment>
    </div>
  );
}

export default App;
