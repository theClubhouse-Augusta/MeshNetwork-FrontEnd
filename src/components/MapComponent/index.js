import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

const MapComponent = withScriptjs(withGoogleMap(({
  lat,
  lon
}) => (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: lat, lng: lon }}
    >
    </GoogleMap>
  )));
export default MapComponent;

