import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: props.lat, lng: props.lon }}
  >
    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[0].lat, 
          lng: props.spaces[0].lon 
        }}  
        onClick={() => { props.clickMarker(props.spaces[0].id)}} 
      >
        <InfoWindow>
          <p>{props.spaces[0].name}</p>
        </InfoWindow>
      </Marker> 
    }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[1].lat, 
          lng: props.spaces[1].lon 
        }} 
        onClick={() => { props.clickMarker(props.spaces[1].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[1].name}</p>
        </InfoWindow>
      </Marker>
    }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[2].lat, 
          lng: props.spaces[2].lon 
        }} 
        onClick={() => { props.clickMarker(props.spaces[2].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[2].name}</p>
        </InfoWindow>
      </Marker>
    }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[3].lat, 
          lng: props.spaces[3].lon 
        }} 
        onClick={() => { props.clickMarker(props.spaces[3].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[3].name}</p>
        </InfoWindow>

      </Marker>
    }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[4].lat, 
          lng: props.spaces[4].lon 
        }} 
        onClick={() => { props.clickMarker(props.spaces[4].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[4].name}</p>
        </InfoWindow>

      </Marker>
      }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[5].lat, 
          lng: props.spaces[5].lon 
        }}  
        onClick={() => { props.clickMarker(props.spaces[5].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[5].name}</p>
        </InfoWindow>

      </Marker>
    }

    {props.isMarkerShown && 
      <Marker 
        position={{ 
          lat: props.spaces[6].lat, 
          lng: props.spaces[6].lon 
        }} 
        onClick={() => { props.clickMarker(props.spaces[6].id)}} 
      >

        <InfoWindow>
          <p>{props.spaces[6].name}</p>
        </InfoWindow>

      </Marker>
    }
  </GoogleMap>)
));
export default MyMapComponent;
