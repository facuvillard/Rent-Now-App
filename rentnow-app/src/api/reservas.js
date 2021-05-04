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