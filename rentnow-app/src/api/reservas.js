import firebase from "firebase";

export async function getReservas(idComplejo) {
    try {
      const result = await firebase
        .firestore()
        .collection("reservas")
        .where("complejo.id", "==", idComplejo)
        .get()
        .then((snap) => snap.docs.map((reservas) => reservas.data()));
  
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

  export async function createReserva(reserva){
    try{
      console.log(reserva)
      const createReserva = firebase.functions().httpsCallable('createReservaApp');
      const result = await createReserva(reserva);
      console.log(result)
      return result.data;
    } catch (err){
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al validar la reserva.",
        error: err,
      };
    }
  }