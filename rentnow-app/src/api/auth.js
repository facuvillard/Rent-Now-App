import firebase from 'firebase';

export async function recoverAndResetPassword(email) {
	var auth = firebase.auth();
	try {
		await auth.sendPasswordResetEmail(email)
		return {status: "OK", message:"Email de reseteo de contraseña enviado"}

	} catch (err) {
		return {status: "ERROR", message: "Error al recuperar contraseña"}
	}
}

export async function signIn(email, password) {
	var auth = firebase.auth();
	try {
		await auth.signInWithEmailAndPassword(email, password);
		return { status: 'OK', message: 'Logeo correcto' };
	} catch (err) {
		return { status: 'ERROR', message: 'Logueo incorrecto. Por favor, compruebe email y contraseña' };
	}
}

export async function submitExtraDataOnRegister(extraData) {
	try {
		console.log('Extra data on api', extraData);
		const createUsuario = firebase.functions().httpsCallable('createDocForNewUser');
		const result = await createUsuario(extraData);

		return { status: 'OK', message: 'Se registró con exito la información.' };
	} catch (err) {
		return { status: 'ERROR', message: 'Ocurrio un error al enviar la información extra.' };
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
		if (error.code === 'auth/email-already-in-use') {
			return {
				status: 'ERROR',
				message:
					'El email ingresado ya existe registrado, intente con otro o pruebe recuperando contraseña.',
				error: error,
			};
		} else {
			return { status: 'ERROR', message: 'Error al registrar usuario', error: error };
		}
	}
}

export async function signOut() {
	var auth = firebase.auth();
	try {
		await auth.signOut();
		return { status: 'OK', message: 'Deslogeo correcto' };
	} catch (err) {
		return { status: 'ERROR', message: 'Error al deslogear' };
	}
}

export async function getUserData(userId, runWhenChange) {
	try {
		const result = await firebase
        .firestore()
        .collection("usuariosApp")
        .doc(userId)
        .onSnapshot((userSnapshot)=>{
			runWhenChange(userSnapshot.data())
		})

		return {
			status: "OK",
			message: "Usuario consultado correctamente",
		}
	} catch(error) {
		return {
			status: "ERROR",
			message: "Usuario consultado ERROR",
		}
	}
}

