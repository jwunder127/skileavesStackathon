import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import React, { Component } from 'react'
import mapStyle from '../../public/mapStyle'
import canUseDOM from "can-use-dom"


const getIconColor = () => {
  return {
    url: '/mountain-emoji.png',
    scaledSize: new google.maps.Size(15, 15),
    strokeColor: '#292',
    strokeWeight: 4
  }
}

const getMountainStats = (mountain) => {
  return (
    <div>
      <h4 className="mountain-heading">{mountain.name} </h4>
      <a href={mountain.official_website}>{mountain.official_website}</a>
    </div>
  )
}

const globalMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: 40.7049786, lng: -74.0091496 }}
    onClick={props.onMapClick}
    defaultOptions={{styles: mapStyle}}
  >{
    props.markers && props.markers.map(mountain => {
      if(mountain.id === 28){
        console.log('Map.jsx props:', props)
        console.log('sample mountain:', mountain)
      }
      mountain.showInfo = true
      return (
        <Marker
          key={mountain.id}
          icon={getIconColor()}
          position={{ lat: mountain.latitude, lng: mountain.longitude }}
          onClick={() => {console.log('show info is:', mountain.showInfo)
                          mountain.showInfo = !mountain.showInfo
                          console.log('show info is:', mountain.showInfo)
                        }}
          >
          {console.log('marker created:', mountain)}
          {mountain.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClose(mountain)}>
              {getMountainStats(mountain)}
            </InfoWindow>
            )}
        </Marker>

        )})
  }
  </GoogleMap>
))

export default globalMap
