import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

export const MapNonLocal = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    <GenerateMarkers 
      spaces={props.spaces}
      clickMarker={props.clickMarker}
      isMarkerShown={props.isMarkerShown}
    />
    
  </GoogleMap>
)));

MapNonLocal.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  spaces: PropTypes.array.isRequired,
  clickMarker: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};

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

GenerateMarkers.propTypes = {
  spaces: PropTypes.array.isRequired,
  clickMarker: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};
