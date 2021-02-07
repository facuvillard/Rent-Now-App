import firebase from 'firebase';

export async function signIn(email, password) {
	var auth = firebase.auth();
	try {
		await auth.signInWithEmailAndPassword(email, password);
		return { status: 'OK', message: 'Logeo correcto' };
	} catch (err) {
		return { status: 'ERROR', message: 'Logueo incorrecto. Por favor, compruebe email y contraseña' };
	}
}

export async function signUpWithEmailApi(user) {
	var auth = firebase.auth();

	try {
		await auth.createUserWithEmailAndPassword(user.email, user.password);
		delete user.password;
		await firebase.firestore().collection('usuariosApp').doc().set(user);

		return { status: 'OK', message: 'Usuario creado correctamente' };
	} catch (error) {
		return { status: 'ERROR', message: 'Error al crear el usuario', error: error };
	}
}
