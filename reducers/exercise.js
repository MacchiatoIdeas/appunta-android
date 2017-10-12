import {
  EXERCISE_FAILURE,
  EXERCISE_RECV,
  EXERCISE_FETCH

} from '../actions/index'

import { FETCH_STATE_TEMPLATE } from '../api'

const initialState = {
  ...FETCH_STATE_TEMPLATE
}

export default (state=initialState, action) => {
  switch (action.type) {
    case EXERCISE_FETCH:
      return {
        ...initialState,
        fetching: true
      }
    case EXERCISE_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    case EXERCISE_RECV:
      return {
        ...initialState,
        data: action.data,
        fetched: true
      }
    default:
      return state
  }
}