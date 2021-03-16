import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { GOOGLE_MAP_KEY } from 'constants/apiKeys';
import { Marker } from '@react-google-maps/api';

import ComplejoInfoWindow from '../ComplejoInfoWindow/ComplejoInfoWindow';

const containerStyle = {
	width: '100%',
	height: '100vh',
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

const ComplejosMap = ({ complejos }) => {
	const [selectedComplejo, setSelectedComplejo] = useState(null);

	return (
		<LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={
					complejos[0]
						? {
								lat: complejos[0].ubicacion.latlng.latitude,
								lng: complejos[0].ubicacion.latlng.longitude,
						  }
						: center
				}
				zoom={12}
			>
				{complejos.map((complejo) => (
					<Marker
						key={complejo.id}
						onClick={() => {
							setSelectedComplejo(complejo);
						}}
						position={{
							lat: complejo.ubicacion.latlng.latitude,
							lng: complejo.ubicacion.latlng.longitude,
						}}
					/>
				))}
				{selectedComplejo && (
					<ComplejoInfoWindow complejo={selectedComplejo} setComplejo={setSelectedComplejo} />
				)}
			</GoogleMap>
		</LoadScript>
	);
};

export default ComplejosMap;
