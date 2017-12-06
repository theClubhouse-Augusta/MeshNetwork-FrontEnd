import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

export const MapLocal = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    <GenerateMarkers 
      workSpace={props.workSpace}
      clickMapMarker={props.clickMapMarker}
      isMarkerShown={props.isMarkerShown}
    />
    
  </GoogleMap>
)));

MapLocal.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  workSpace: PropTypes.object.isRequired,
  clickMapMarker: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};

const GenerateMarkers = (props) => (
  <div>
      {props.isMarkerShown && 
        <Marker
          position={{ 
            lat: props.workSpace.lat, 
            lng: props.workSpace.lon 
          }}  
          onClick={() => { props.clickMapMarker(props.workSpace.id)}} 
        >
          <InfoWindow>
            <p>{props.workSpace.name}</p>
          </InfoWindow>
        </Marker>
        } 
    </div>
);

GenerateMarkers.propTypes = {
  workSpace: PropTypes.object.isRequired,
  clickMapMarker: PropTypes.func.isRequired,
  isMarkerShown: PropTypes.bool.isRequired
};