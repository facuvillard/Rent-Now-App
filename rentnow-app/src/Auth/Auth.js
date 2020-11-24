import React, { useState, useEffect } from "react";
import firebaseApp from "../firebase";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRoles, setUserRoles] = useState(['default'])
    const [pending, setPending] = useState(true);

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


    return (
        <AuthContext.Provider value={{ currentUser, userRoles }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;