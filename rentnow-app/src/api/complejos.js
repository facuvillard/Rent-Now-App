import firebase from "firebase";
import * as geofire from "geofire-common";

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

export async function getComplejosEnabledApi() {
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

export async function getNearbyComplejos(center, radius) {
  try {
    const bounds = geofire.geohashQueryBounds(center, radius);
    const promises = [];

    bounds.forEach((b) => {
      const q = firebase
        .firestore()
        .collection("complejos")
        .orderBy("ubicacion.geohash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    });

    let snapshots = await Promise.all(promises);
    const matchingDocs = [];
    snapshots.forEach((snap) =>
      snap.forEach((doc) => {
        const lat = doc.get("ubicacion").latlng.latitude;
        const lng = doc.get("ubicacion").latlng.longitude;
        const distanceInKm = geofire.distanceBetween([lat, lng], center);
        const distanceInM = distanceInKm * 1000;

        if (distanceInM <= radius) {
          matchingDocs.push(doc);
        }
      })
    );

    let complejos = await matchingDocs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    return {
      status: "OK",
      message: "Se consultaron los complejos con exito",
      data: complejos,
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

export async function getComplejoNameImagesAndUbicacion(id) {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .doc(id)
      .get();

    const complejo = result.data();
    return {
      status: "OK",
      message: "Se consulto las imagenes del complejo con exito",
      data: {
        fotos: complejo.fotos,
        nombre: complejo.nombre,
        ubicacion: complejo.ubicacion,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar las imagenes del complejo",
      error: err,
    };
  }
}

export async function getValoracionesByComplejoId(complejoId) {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .doc(complejoId)
      .collection("valoraciones")
      .get();

    const valoraciones = result.docs.map((valoracionRef) => {
      const valoracionData = valoracionRef.data();
      return {
        id: valoracionRef.id,
        ...valoracionData,
        fecha: valoracionData.fecha.toDate(),
      };
    });

    return {
      status: "OK",
      message: "Se consultaron las valoraciones del complejo con exito",
      data: valoraciones || [],
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar las imagenes del complejo",
      error: err,
    };
  }
}
