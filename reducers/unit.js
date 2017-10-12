import {
  UNIT_RECV,
  UNIT_FETCH,
  UNIT_FAILURE

} from '../actions/index'

const initialState = {
  data: {},
  fetching: false,
  fetched: false,
  error: ''
}

export default (state=initialState, action) => {
  switch (action.type) {
    case UNIT_FETCH:
      return {
        ...initialState,
        fetching: true,
      }
    case UNIT_RECV:
      return {
        ...initialState,
        data: action.data,
        fetched: true
      }
    case UNIT_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}