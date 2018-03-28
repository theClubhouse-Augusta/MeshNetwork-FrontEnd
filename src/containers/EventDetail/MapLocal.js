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
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    {!!props.workSpace &&
      <GenerateMarkers 
        workSpace={props.workSpace}
        clickMapMarker={props.clickMapMarker}
        isMarkerShown={props.isMarkerShown}
        lat={props.lat}
        lon={props.lon}
      />
    }

    {!!props.event &&
      <GenerateMarkers 
        clickMapMarker={props.clickMapMarker}
        isMarkerShown={props.isMarkerShown}
        lat={props.lat}
        lon={props.lon}
        event={props.event}
      />
    }
    
  </GoogleMap>
)));

MapLocal.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  workSpace: PropTypes.object,
  event: PropTypes.object,
  clickMapMarker: PropTypes.func,
  isMarkerShown: PropTypes.bool.isRequired
};

const GenerateMarkers = (props) => (
  <div >
      {(props.isMarkerShown && props.workSpace) &&
        <Marker
          position={{ 
            lat: props.lat, 
            lng: props.lon 
          }}  
          onClick={() => { 
            props.clickMapMarker(props.workSpace.id)
          }} 
        >
          <InfoWindow>
            <p>{props.workSpace.name}</p>
          </InfoWindow>
        </Marker>
        } 


      {(props.isMarkerShown && props.event) &&
        <Marker
          position={{ 
            lat: props.lat, 
            lng: props.lon 
          }}  
        >
          <InfoWindow>
            <p>{props.event.title}</p>
          </InfoWindow>
        </Marker>
        } 

    </div>
);

GenerateMarkers.propTypes = {
  workSpace: PropTypes.object,
  event: PropTypes.object,
  clickMapMarker: PropTypes.func,
  isMarkerShown: PropTypes.bool.isRequired
  };