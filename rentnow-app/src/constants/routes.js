//LANDING
export const LANDING = '/';
export const LOGIN = '/login';
export const REGISTER_USER = '/sign-up';

//COMPLEJO
export const COMPLEJOS = "/complejos"
export const DETALLE_COMPLEJO = `${COMPLEJOS}/:idComplejo`
export const DETALLE_COMPLEJO_VER_FOTOS = `${DETALLE_COMPLEJO}/ver-fotos`; 

//ESPACIO
export const DETALLE_ESPACIO = `${DETALLE_COMPLEJO}/espacios/:idEspacio`