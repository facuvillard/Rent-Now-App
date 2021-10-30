import { getUserData } from "api/auth";
import { getNotificacionesByUsuarioRealTime } from "api/usuarios";
import React, { useEffect, useState } from "react";
import firebaseApp from "../firebase";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [currentUserData, setCurrentUserData] = useState(null);
	const [userRoles, setUserRoles] = useState(["default"]);
	const [pending, setPending] = useState(true);
	const [notificaciones, setNotificaciones] = useState([]);

	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
				getUserData(user.uid).then((res) => {
					if (res.status === "OK") {
						setCurrentUserData(res.data);
						setPending(false);
						return;
					}
				});
			}
			setUserRoles(["default"]);
			setPending(false);
			return;
		});
	}, []);

	useEffect(() => {
		if (!currentUser) {
			return;
		}
		getNotificacionesByUsuarioRealTime(currentUser.uid, setNotificaciones);
	}, [currentUser]);

	if (pending) {
		return <>Cargando...</>;
	}

	return (
		<AuthContext.Provider
			value={{currentUser, userRoles, currentUserData, notificaciones}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
