import firebase from "firebase";

export async function getComplejosById(id) {
    try {
      const result = await firebase
        .firestore()
        .collection("complejos")
        .doc(id)
        .get();
  
      const complejo = { id: result.id, ...result.data() };
      return {
        status: "OK",
        message: "Se consultaron los complejos con exito",
        data: complejo,
      };
    } catch (err) {
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar los complejos",
        error: err,
      };
    }
  }