import React, { Component } from 'react'
import { connect } from 'react-redux'


import LeafletMap from '../components/LeafletMap'
import Sidebar from '../components/Sidebar'


const calcSnowScore = (forecast) => {
  return forecast.daily.data.reduce((acc, day) => {
    let precip = day.precipType === 'snow' && day.precipAccumulation ? day.precipAccumulation : 0
    let precipChance = day.precipProbability
    return acc + precip * precipChance
  }, 0).toFixed(2)
}

const getScoreArray = (mountains) => {
  const arr = []
  mountains.forEach(mountain => {
    arr.push([mountain.name, calcSnowScore(mountain.forecast), mountain.official_website, mountain.latitude, mountain.longitude])
  })
  return arr
}

const getColor = (score) => {

  if (score > 25) return '#f142f2'
  if (score > 15) return '#9842f4'
  if (score > 10) return '#4265f4'
  if (score >  7) return '#42e5f4'
  if (score >  3) return '#42f468'
  if (score >  0) return '#95a88d'
                  return '#918c91'
}

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      center: [40.7049786, -74.0091496],
      zoom: 7
    }
    this.resetCenter = this.resetCenter.bind(this)
  }

  resetCenter = (lat, long) => {
    this.setState({
      center: [lat, long],
      zoom: 10
    })
  }

  render () {
    return (
            <div>
              <div id="map" className="col-xs-9">
                <LeafletMap
                center={this.state.center}
                mountains={this.props.mountains}
                zoom={this.state.zoom}
                calcSnowScore={calcSnowScore}
                getColor={getColor}
                />
              </div>
              <div id="sidebar" className="col-xs-3">
                <Sidebar
                  mountains={this.props.mountains}
                  calcSnowScore={calcSnowScore}
                  getScoreArray={getScoreArray}
                  getColor={getColor}
                  resetCenter={this.resetCenter}
                />
              </div>
            </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    mountains: state.mountain.opMountains
  }
}


export default connect(mapStateToProps)(AppContainer)
