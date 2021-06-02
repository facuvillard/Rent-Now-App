import firebase from "firebase";
// import { getComplejoNameImagesAndUbicacion } from 'api/complejos'

export async function getReservas(idCliente) {

  // async function getDatosComplejo(reservas) {
  //   await (reservas.forEach((reserva) => {
  //     getComplejoNameImagesAndUbicacion(reserva.complejo.id).then((response) => {
  //       if (response.status === "OK") {
  //         reserva.complejo = { ...reserva.complejo, fotos: response.data.fotos, nombre: response.data.nombre, ubicacion: response.data.ubicacion }
  //         console.log(reserva)
  //       }
  //       else {
  //         console.log(response.message)
  //       }
  //     })
  //   }))
  //   return reservas
  // }

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
    console.log(reserva)
    const createReserva = firebase.functions().httpsCallable('createReservaApp');
    const result = await createReserva(reserva);
    console.log(result)
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