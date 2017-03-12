import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Map from '../components/Map'

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap


// Then, render it:

class AppContainer extends Component {

  constructor(props){
    super(props)
    console.log('in constructor, here are props:', this.props)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMarkerClose = this.handleMarkerClose.bind(this)
  }

  handleMarkerClick(targetMarker){
    this.setState({
      markers: this.props.mountains.map(marker => {
        if (marker === targetMarker){
          return {
            ...marker,
            showInfo: true
          }
        }
        return marker
      })
    })
  }

  handleMarkerClose(targetMarker){
    this.setState({
      markers: this.props.mountains.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
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
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
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

