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
		return { status: 'ERROR', message: 'Error al crear el usuario', error: error };
	}
}

export async function recoverAndResetPassword(email) {
    var auth = firebase.auth();
    try {
        await auth.sendPasswordResetEmail(email)
        return {status: "OK", message:"Email de reseteo de contraseña enviado"}

    } catch (err) {
        return {status: "ERROR", message: "Error al recuperar contraseña"}
    }
}

