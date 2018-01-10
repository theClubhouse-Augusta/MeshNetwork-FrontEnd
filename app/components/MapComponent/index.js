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
  Marker,
  InfoWindow,
} from 'react-google-maps';
import PropTypes from 'prop-types';
const MapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    
    
  </GoogleMap>)
));

export default MapComponent;

const GenerateMarkers = (props) => (
  <div>
    {props.spaces.map((space,index) => 
      props.isMarkerShown && 
        <Marker
          key={`marker${index}`} 
          position={{ 
            lat: props.spaces[index].lat, 
            lng: props.spaces[index].lon 
          }}  
          onClick={() => { props.clickMarker(props.spaces[index].id)}} 
        >
          <InfoWindow>
            <p>{props.spaces[index].name}</p>
          </InfoWindow>
        </Marker> 
    )}
    </div>
);

MapComponent.contextTypes = {
  router: PropTypes.object
};
