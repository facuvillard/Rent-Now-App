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

//RESERVA
export const CONFIRMACION_RESERVA = `${DETALLE_COMPLEJO}/reservas/confirmar`
export const CONSULTAR_RESERVAS = `/reservas/consultar`
export const CREATE_OPINION = `/reservas/opinion`
export const REGISTER_VALORACION = `/reservas/:idReserva/valorar`