import ComplejoInfoWindow from './ComplejoInfoWindow/ComplejoInfoWindow';
import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import Image from 'assets/Landing/marker.png'


const containerStyle = {
    width: '100%',
    height: '100vh',
};

const ComplejosMap = ({ complejos, center, fetchComplejos }) => {
    const [mapRef, setMapRef] = useState(null);
    const [mapCenter, setMapCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })
    const [selectedComplejo, setSelectedComplejo] = useState(null);

    let timer;

    useEffect(() => {
        setMapCenter(center)
    }, [center])

    useEffect(() => {
        fetchComplejos(mapCenter)
    }, [mapCenter])

    const handleCenterChange = () => {
        if (!mapRef) {
            return
        }

        clearTimeout(timer)
        timer = setTimeout(function () {
            setMapCenter(oldMapCenter => {
                if (oldMapCenter.lat === mapRef.getCenter().lat() && oldMapCenter.lng === mapRef.getCenter().lng()) {
                    return oldMapCenter
                }
                return {
                    lat: mapRef.getCenter().lat(),
                    lng: mapRef.getCenter().lng()
                }
            });
        }, 3000);
    }

return (
    <LoadScript
        googleMapsApiKey={GOOGLE_MAP_KEY}
    >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onCenterChanged={handleCenterChange}
            onLoad={map => setMapRef(map)}

        >
            {complejos ? complejos.map((complejo) =>
                <Marker
                    key={complejo.ubicacion.latlng.latitude + complejo.ubicacion.latlng.long}
                    position={{ lat: complejo.ubicacion.latlng.latitude, lng: complejo.ubicacion.latlng.longitude }}
                    onClick={() => { setSelectedComplejo(complejo) }}
                    icon={Image}
                />)
                : null}
            {selectedComplejo && (
                <ComplejoInfoWindow complejo={selectedComplejo} setComplejo={setSelectedComplejo} />
            )}

        </GoogleMap>
    </LoadScript>
)
}
export default ComplejosMap;
