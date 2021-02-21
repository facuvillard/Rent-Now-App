import firebase from "firebase";

export async function getComplejosApi() {
    try {
      const result = await firebase
        .firestore()
        .collection("complejos")
        .where("habilitado", "==", true)
        .orderBy("fechaAlta", "asc")
        .get();
      const complejos = result.docs.map((complejo) => {
        const complejoData = complejo.data();
        return {
          id: complejo.id,
          ...complejoData,
        };
      });
      return {
        status: "OK",
        message: "Se consultaron los complejos con exito",
        data: complejos,
      };
    } catch (err) {
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar los complejos",
        error: err,
      };
    }
  }
