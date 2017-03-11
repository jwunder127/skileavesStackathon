import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

// const LOAD_CART = 'LOAD_CART';
const LOAD_OPERATING_MOUNTAINS = 'LOAD_OPERATING_MOUNTAINS'


/* ------------   ACTION CREATORS     ------------------ */


// const loadCart = cartItems =>  ({type: LOAD_CART, cartItems})
const loadOperatingMountains = (mountains) => ({type: 'LOAD_OPERATING_MOUNTAINS', mountains})


/* ------------       REDUCERS     ------------------ */

const initialState = {}

export default (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {

    case LOAD_OPERATING_MOUNTAINS:
      newState.opMountains = action.mountains
      return newState

    default:
      return newState
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const loadActiveMountains = () => (dispatch) => {
  axios.get('/api/mountains/operatingMountains')
    .then(res => res.data)
    .then(mountains => {
      dispatch(loadOperatingMountains(mountains))
    })
    .catch(err => console.error('loading mountains unsuccessful', err))
}
