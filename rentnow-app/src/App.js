import React from "react"
import './App.css';
import Login from './components/Login/Login.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes"
import Landing from "./components/Landing/Landing"
import AuthProvider from "./Auth/Auth";
import DetalleComplejo from "components/App/Complejo/DetalleComplejo"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} exact component={() => <Login />} />
          <Route path={Routes.LANDING} exact component={() => <Landing />} />
          <Route path={Routes.DETALLE_COMPLEJO} exact component={()=> <DetalleComplejo />} />
          <Route path="*" exact component={() => <Landing />} />
        </ Switch>
      </ Router>
    </AuthProvider>
  );
}

export default App;
