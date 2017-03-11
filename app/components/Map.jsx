import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import React, { Component } from 'react'
import mapStyle from '../../public/mapStyle'


const getIconColor = () => {
  return {
    url: '/mountain-emoji.png',
    scaledSize: new google.maps.Size(15, 15),
    strokeColor: '#292',
    strokeWeight: 4
  }
}
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: 40.7049786, lng: -74.0091496 }}
    onClick={props.onMapClick}
    defaultOptions={{styles: mapStyle}}
  >{
    props.markers && props.markers.map(mountain => {
      if(mountain.id === 500){
        console.log('sample mountain:', mountain)
      }
      return (
        <Marker
          key={mountain.id}
          icon={getIconColor()}
          position={{ lat: mountain.latitude, lng: mountain.longitude }}
          />

        )})
  }
  </GoogleMap>
))

export default GettingStartedGoogleMap
