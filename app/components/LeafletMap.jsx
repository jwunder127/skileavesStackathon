import React from 'react'
import { Map, TileLayer, Circle, Popup, ScaleControl} from 'react-leaflet'


const darkMatter = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'

const LeafletMap = (props) => {


  return (
      <Map center={props.center} zoom={props.zoom}>
        <TileLayer
          layer="CartoDB_DarkMatter"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a> | <a href="https://darksky.net/poweredby/"><img src="/poweredby.png" height=28 width=66> </a>'
          url={darkMatter}
        />
        <ScaleControl />
        {props.mountains && props.mountains.map(mountain => {
          return (
        <div key={mountain.id} >

          <Circle center={[mountain.latitude, mountain.longitude]} color={props.getColor(props.calcSnowScore(mountain.forecast))} radius={5}>
            <Popup>
              <div>
                <h4 className="mountain-heading">{mountain.name}</h4>
                <p> Current Conditions: {mountain.forecast.currently.summary}</p>
                <p> Ski-leaves Powder Prediction Index: {props.calcSnowScore(mountain.forecast)} </p>
                <a href={mountain.official_website}>{mountain.official_website}</a>
              </div>
            </Popup>
          </Circle>
        </div>
          )
        })}
      </Map>
  )
}

export default LeafletMap
