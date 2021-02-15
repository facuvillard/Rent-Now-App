import firebase from "firebase";

export async function signIn(email, password) {
    var auth = firebase.auth()
    try {
        await auth.signInWithEmailAndPassword(email, password)
        return { status: "OK", message: "Logeo correcto" }

    } catch (err) {
        return { status: "ERROR", message: "Logueo incorrecto. Por favor, compruebe email y contraseña" }
    }
}

export async function submitExtraDataOnRegister(extraData) {
    try {
        console.log("Extra data on api", extraData)
        const createUsuario = firebase.functions().httpsCallable('createDocForNewUser')
        const result =  await createUsuario(extraData)

        return { status: "OK", message: "Se registró con exito la información." }
    } catch (err) {
        return { status: "ERROR", message: "Ocurrio un error al enviar la información extra." }
    }
}