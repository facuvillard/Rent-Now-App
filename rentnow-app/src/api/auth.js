import firebase from "firebase";

export async function signIn(email, password) {
    var auth = firebase.auth()
    try {
        await auth.signInWithEmailAndPassword(email, password)
        return {status: "OK", message:"Logeo correcto"}

    } catch (err) {
        return {status: "ERROR", message:"Logueo incorrecto. Por favor, compruebe email y contraseña"}
    }
}