import firebase from "firebase";

export async function getNotificacionesByUsuarioRealTime(
    idUsuario, runWhenChange
) {
    try {

        const result = await firebase
            .firestore()
            .collection("usuariosApp")
            .doc(idUsuario)
            .collection("notificaciones")
            .onSnapshot((querySnapshot) => {
                let notificaciones = [];

                querySnapshot.forEach((notificacionDoc) => {
                    notificaciones.push({ ...notificacionDoc.data(), id: notificacionDoc.id });
                });
                runWhenChange(notificaciones);
            });

        return result;
    } catch (err) {
        console.log(err);
        return {
            status: "ERROR",
            message: "Se produjo un error al consultar las notificaciones",
            error: err,
        };
    }
}

export async function setNotificationAsReaded(idUsuario, notId) {
    try {
        const result = await firebase
            .firestore()
            .collection("usuariosApp")
            .doc(idUsuario)
            .collection("notificaciones")
            .doc(notId)
            .update({ leida: true })

        return { status: "OK", message: "Notificacion marcada como leida" };
    } catch (err) {
        console.log(err);
        return {
            status: "ERROR",
            message: "Se produjo un error al registrar la reserva",
            error: err,
        };
    }
}