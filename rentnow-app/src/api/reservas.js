import firebase from "firebase";

export async function getReservas(idCliente) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("cliente.id", "==", idCliente) // Falta agregar que verifique tambien el paramentro de si es hecha por la app
      .orderBy("fechaInicio", "desc")
      .get()
      .then((snap) => snap.docs.map((reservas) => reservas.data()));

    // const reservas = getDatosComplejo(result)
    return {
      status: "OK",
      message: "Se consultaron correctamente las reservas",
      data: result,
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
