import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import Header from './Header';
import Admin from "./components/Admin/admin";
import Add from "./components/Admin/Add";
import User from "./components/User/user";
import ParkedList from "./components/Common/parked_list";
import {BrowserRouter as Router, Route} from "react-router-dom";

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	 	<Router>
	 	<div>
	 	<Header/>
	 	<hr/>
      			<Route exact path={"/"} component={App}/>
      			<Route path={"/user"} component={User}/>
      			<Route path={"/admin"} component={Admin}/>
      			<Route path={"/header"} component={Header}/>
      	    <Route path={"/parked_list"} component={ParkedList}/>
            <Route path={"/add"} component={Add}/>
    </div>
    </Router>

	, document.getElementById('root'));
registerServiceWorker();
