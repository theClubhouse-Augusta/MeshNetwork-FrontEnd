/**
*
* MapComponent
*
*/

import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps';
const MapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    
    
  </GoogleMap>)
));

export default MapComponent;

