import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";
import { getNotificacionesByUsuarioRealTime } from "api/usuarios";


export const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRoles, setUserRoles] = useState(['default'])
    const [pending, setPending] = useState(true);
    const [notificaciones, setNotificaciones] = useState([])

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                setPending(false);
                return;
            }
            setUserRoles(['default'])
            setPending(false);
            return;
        });
    }, []);

    useEffect(() => {
        if(!currentUser){
          return;
        }
        getNotificacionesByUsuarioRealTime(currentUser.uid, setNotificaciones)
        
      }, [currentUser]);

    if (pending) {
        return <>Cargando...</>;
      }

    return (
        <AuthContext.Provider value={{ currentUser, userRoles, notificaciones }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;