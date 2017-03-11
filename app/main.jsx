'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'


import MapContainer from './containers/MapContainer'

import { loadActiveMountains } from './reducers/mountain'


function loadMountains () {
  store.dispatch(loadActiveMountains())
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MapContainer} onEnter={loadMountains} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
