import firebase from "firebase";

export async function getReservas(idCliente) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("cliente.id", "==", idCliente)
      .where('reservaApp', '==', true)
      .orderBy("fechaInicio", "desc")
      .get()

    const reservas = result.docs.map((reserva) => {
      const reservaData = reserva.data();
      return {
        id: reserva.id,
        ...reservaData,
      };
    });

    return {
      status: "OK",
      message: "Se consultaron correctamente las reservas",
      data: reservas,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: err,
    };
  }
}

export async function createReserva(reserva) {
  try {
    const createReserva = firebase
      .functions()
      .httpsCallable("createReservaApp");
    const result = await createReserva(reserva);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al validar la reserva.",
      error: err,
    };
  }
}

export async function getReservaById(id) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .doc(id)
      .get();

    return {
      status: "OK",
      message: "Se consulto correctamente la reserva",
      data: { ...result.data(), id: result.id },
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: err,
    };
  }
}

export async function registerValoracion(valoracion) {
  try {
    const createValoracion = firebase
      .functions()
      .httpsCallable("registerValoracionToComplejo");
    const result = await createValoracion(valoracion);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al valorar la reserva.",
      error: err,
    };
  }
}

export async function updateReservaState(reserva) {
	try {
		await firebase.firestore().collection("reservas").doc(reserva.id).update(reserva);
		return {
			status: "OK",
			message: "Los datos de la reserva han sido actualizados con exito",
		};
	} catch (err) {
		return {
			status: "ERROR",
			message: "Error al actualizar los datos de la reserva",
		};
	}
}
