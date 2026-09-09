import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import * as AppRoutes from './constants/routes';
import AuthProvider from './Auth/Auth';
import PrivateRoute from './utils/PrivateRoute/PrivateRoute';
import LayoutWithNavbar from './components/Layout/withNavbar/LayoutWithNavbar';

// Page Components
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import RegisterUser from './components/RegisterUser/RegisterUser';
import { Complejos } from './components/Complejos/Complejos';
import DetalleComplejo from './components/Complejos/ComplejoDetail/DetalleComplejo';
import VerFotos from './components/Complejos/ComplejoDetail/VerFotos/VerFotos';
import DetalleEspacio from './components/Espacios/DetalleEspacio';
import ConfirmReserva from './components/Reservas/ConfirmReserva';
import ReservasList from './components/Reservas/ReservasList';
import CreateOpinion from './components/Reservas/CreateOpinion';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path={AppRoutes.LANDING} element={<Landing />} />
          <Route path={AppRoutes.LOGIN} element={<Login />} />
          <Route
            path={AppRoutes.REGISTER_USER}
            element={
              <LayoutWithNavbar>
                <RegisterUser />
              </LayoutWithNavbar>
            }
          />

          {/* Protected Routes with Navbar Layout */}
          <Route
            path={AppRoutes.COMPLEJOS}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <Complejos />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.DETALLE_COMPLEJO}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <DetalleComplejo />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.DETALLE_COMPLEJO_VER_FOTOS}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <VerFotos />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.DETALLE_ESPACIO}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <DetalleEspacio />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.CONFIRMACION_RESERVA}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <ConfirmReserva />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.CONSULTAR_RESERVAS}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <ReservasList />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoutes.CREATE_OPINION}
            element={
              <PrivateRoute>
                <LayoutWithNavbar>
                  <CreateOpinion />
                </LayoutWithNavbar>
              </PrivateRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
