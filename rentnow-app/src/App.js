import React from 'react';
import './App.css';
import Login from './components/Login/Login.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes"
import Landing from "./components/Landing/Landing"
import AuthProvider from "./Auth/Auth";
import PrivateRoute from "utils/PrivateRoute/PrivateRoute";
import RouteWithNavbar from "components/Layout/withNavbar/RouteWithNavbar"
import { Complejos } from "components/Complejos/Complejos";
import { ComplejoDetail } from "components/Complejos/ComplejoDetail.js/ComplejoDetail";
import RegisterUser from './components/RegisterUser/RegisterUser';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} exact component={() => <Login />} />
          <Route path={Routes.LANDING} exact component={() => <Landing />} />
          <RouteWithNavbar path= {Routes.COMPLEJOS} exact isPrivate={true} component={() => <Complejos />} />
          <RouteWithNavbar path="/complejos/:id"  exact isPrivate={true} component={() => <ComplejoDetail />} />
          <RouteWithNavbar path={Routes.REGISTER_USER}  exact isPrivate={false} component={() => <RegisterUser />} />
          <Route path="*" exact component={() => <Landing />} />
        </ Switch>
      </ Router>
    </AuthProvider>
  );
}

export default App;
