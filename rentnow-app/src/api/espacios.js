import firebase from "firebase";

export async function getEspaciosByIdComplejo(idComplejo) {
    try {
      const result = await firebase
        .firestore()
        .collection("/espacios")
        .where("idComplejo", "==", idComplejo)
        .where("baja", "==", false)
        .get();
      const espacios = result.docs.map((espacio) => ({
        id: espacio.id,
        ...espacio.data(),
      }));
      return {
        status: "OK",
        message: "Se consultaron los espacios con exito",
        data: espacios,
      };
    } catch (err) {
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar los espacios",
        error: err,
      };
    }
  }

  export async function getEspacioById(idEspacio){
    try {
      const result = await firebase
        .firestore()
        .collection("espacios")
        .doc(idEspacio)
        .get();
  
      const espacio = { id: result.id, ...result.data() };
      return {
        status: "OK",
        message: "Se consultaró el espacio con exito",
        data: espacio,
      };
    } catch (err) {
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar el espacio",
        error: err,
      };
    }
    
  }