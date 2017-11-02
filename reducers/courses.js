import {
  COURSES_FAILURE,
  COURSES_FETCH,
  COURSES_RECV
} from '../actions/index'

import { FETCH_STATE_TEMPLATE } from '../api'

const initialState = {
  ...FETCH_STATE_TEMPLATE
}

export default (state=initialState, action) => {
  switch (action.type) {
    case COURSES_FETCH:
      return {
        ...initialState,
        fetching: true
      }
    case COURSES_RECV:
      return {
        ...initialState,
        data: action.data,
        fetched: true
      }
    case COURSES_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}