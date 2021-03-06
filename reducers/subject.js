import {
  SUBJECT_FETCH,
  SUBJECT_FAILURE,
  SUBJECT_RECV

} from '../actions/index'

const initialState = {
  data: {},
  fetching: false,
  fetched: false,
  error: ''
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SUBJECT_FETCH:
      return {
        ...initialState,
        fetching: true
      }
    case SUBJECT_RECV:
      return {
        ...initialState,
        data: action.data,
        fetched: true
      }
    case SUBJECT_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}