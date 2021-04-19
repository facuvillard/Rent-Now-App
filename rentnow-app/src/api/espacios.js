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
        message: "Se consultó el espacio con exito",
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

  export async function getTiposEspacioByIdComplejo(idComplejo){
    try{

      const getTiposEspacio = firebase.functions().httpsCallable('getTiposEspacioByComplejoId');
      const result = await getTiposEspacio(idComplejo);

      return result.data;
    } catch (err){
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar los tipos de espacios",
        error: err,
      };
    }

  }

  export async function getEspaciosByIdComplejoAndTipo(idComplejo, tipoEspacio){
    try {

      if(!(idComplejo && tipoEspacio)){
        throw new Error("No se completaron los parametros requeridos.")
      }

      const result = await firebase
        .firestore()
        .collection("espacios")
        .where("idComplejo", "==", idComplejo)
        .where("tipoEspacio", "==", tipoEspacio)
        .get();

        const espacios = result.docs.map((espacio) => ({
          id: espacio.id,
          ...espacio.data(),
        }));
      
      return {
        status: "OK",
        message: "Se consultaron los espacios con éxito",
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

  export async function getHorariosAndEspacios(fecha, tipoEspacio, idComplejo, duracion){
    try{
      console.log(fecha, tipoEspacio, idComplejo, duracion)
      const getHorarios = firebase.functions().httpsCallable('getFreeHorariosAndEspacios');
      const result = await getHorarios({fecha, tipoEspacio, idComplejo, duracion});
      console.log(result)
      return result.data;
    } catch (err){
      console.log(err);
      return {
        status: "ERROR",
        message: "Se produjo un error al consultar los tipos de espacios",
        error: err,
      };
    }
  }