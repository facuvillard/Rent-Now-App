import React from 'react';
import './App.css';
import Login from './components/Login/Login.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as Routes from './constants/routes';
import Landing from './components/Landing/Landing';
import RegisterUser from './components/RegisterUser/RegisterUser';
import AuthProvider from './Auth/Auth';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route path={Routes.LOGIN} exact component={() => <Login />} />
					<Route path={Routes.REGISTER_USER} exact component={() => <RegisterUser />} />
					<Route path={Routes.LANDING} exact component={() => <Landing />} />
					<Route path="*" exact component={() => <Landing />} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
