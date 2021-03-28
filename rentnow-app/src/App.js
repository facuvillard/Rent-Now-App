import React from 'react';
import './App.css';
import Login from './components/Login/Login.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes"
import Landing from "./components/Landing/Landing"
import AuthProvider from "./Auth/Auth";
import DetalleComplejo from "components/App/Complejo/DetalleComplejo"
import DetalleEspacio from "components/App/Espacios/DetalleEspacio"
import RouteWithNavbar from "components/Layout/withNavbar/RouteWithNavbar"
import { Complejos } from "components/Complejos/Complejos";
import RegisterUser from './components/RegisterUser/RegisterUser';
import VerFotos from 'components/App/Complejo/VerFotos';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path={Routes.LOGIN} exact component={() => <Login />} />
          <Route path={Routes.LANDING} exact component={() => <Landing />} />
          <RouteWithNavbar path= {Routes.COMPLEJOS} exact isPrivate={true} component={() => <Complejos />} />
          <RouteWithNavbar path={Routes.DETALLE_COMPLEJO}  exact isPrivate={true} component={() => <DetalleComplejo  />} />
          <RouteWithNavbar path={Routes.DETALLE_COMPLEJO_VER_FOTOS} exact isPrivate={true} component={()=> <VerFotos />} />
          <RouteWithNavbar path={Routes.DETALLE_ESPACIO} exact isPrivate={true} component={() => <DetalleEspacio />} />
          <RouteWithNavbar path={Routes.REGISTER_USER}  exact isPrivate={false} component={() => <RegisterUser />} />
          <Route path="*" exact component={() => <Landing />} />

        </ Switch>
      </ Router>
    </AuthProvider>
  );
}

export default App;
