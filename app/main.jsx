'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import store from './store'


import AppContainer from './containers/AppContainer'

import { loadActiveMountains } from './reducers/mountain'


function loadMountains () {
  store.dispatch(loadActiveMountains())
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={loadMountains} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
