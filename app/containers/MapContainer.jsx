import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import mapStyle from '../../public/mapStyle'

import Map from '../components/Map'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap


// Then, render it:

class AppContainer extends Component {

  constructor(props){
    super(props)
    console.log('in constructor, here are props:', this.props)
  }

  render() {
    console.log('welcome to the render')
    console.log(this.props)

    return (
      <Map
        containerElement={
          <div style={{ height: `95vh`, width: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={this.props.mountains}
        onMarkerClick={this.props.onMarkerClick}
        onMarkerRightClick={_.noop}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    mountains: state.mountain.opMountains
  }
}

export default connect(mapStateToProps)(AppContainer)

