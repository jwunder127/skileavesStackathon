import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  mountain: require('./mountain').default,
})

export default rootReducer
