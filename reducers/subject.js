import {
  SUBJECT_FETCH,
  SUBJECT_FAILURE,
  SUBJECT_RECV

} from '../actions/index'

const initialState = {
  data: {},
  fetching: false,
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
        fetching: false,
        data: action.data
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