import React from 'react' 
import {InfoWindow} from "@react-google-maps/api"

export default function ComplejoInfoWindow(props) {
    const {complejo} = props;
    const position = { lat: complejo.ubicacion.latlng.latitude, lng: complejo.ubicacion.latlng.longitude }

    const onCloseClickHandler = () => {
        props.setComplejo(null);
    }

    return (
    <InfoWindow onCloseClick={onCloseClickHandler} position={position} >
        <h1>Info del complejo</h1>
    </InfoWindow>)
}
