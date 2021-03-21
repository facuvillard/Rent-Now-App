import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, useGoogleMap } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '100vh'
};



const ComplejosMap = ({ complejos, center, fetchComplejos }) => {
    const [mapRef, setMapRef] = useState(null);
    const [mapCenter, setMapCenter] = useState({
        lat: -3.745,
        lng: -38.523
    })

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
                {complejos ? complejos.map((complejo) => <Marker key={complejo.ubicacion.latlng.latitude + complejo.ubicacion.latlng.long} position={{ lat: complejo.ubicacion.latlng.latitude, lng: complejo.ubicacion.latlng.longitude }} />) : null}
            </GoogleMap>
        </LoadScript>
    )
}

export default ComplejosMap