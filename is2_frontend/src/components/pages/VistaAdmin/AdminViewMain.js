//import logo from './logo.svg';
import React from 'react';
//import {MyNavBar} from './templates/MyNavBar';
import {TablaAdmin} from './templates/TablaAdmin';
/*import {CambiarEstado} from './templates/CambiarEstado'
import {CambiarPrioridad} from './templates/CambiarPrioridad'*/
import "./styles.css";

function AdminViewMain() {
  return (
    <div>
      <React.Fragment>
        <br/><br/>
        <TablaAdmin/>
        <br/><br/>
      </React.Fragment>
    </div>
  );
}

export default AdminViewMain;
