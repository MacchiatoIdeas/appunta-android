import {
  COURSE_FAILURE,
  COURSE_FETCH,
  COURSE_RECV
} from '../actions/index'

import { FETCH_STATE_TEMPLATE } from '../api'

const initialState = {
  ...FETCH_STATE_TEMPLATE
}

export default (state=initialState, action) => {
  switch (action.type) {
    case COURSE_FETCH:
      return {
        ...initialState,
        fetching: true
      }
    case COURSE_RECV:
      return {
        ...initialState,
        data: action.data,
        fetched: true
      }
    case COURSE_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}