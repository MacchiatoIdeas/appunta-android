import { HOME_FETCH, HOME_RECV, HOME_FAILURE } from "../actions";

const initialState = {
  fetching: false,
  subjects: [],
  error: ''
}

export default (state=initialState, action) => {
  switch (action.type) {
    case HOME_FETCH:
      return {
        ...state,
        fetching: true
      }
    case HOME_RECV:
      return {
        ...initialState,
        subjects: action.subjects
      }
    case HOME_FAILURE:
      return {
        ...initialState,
        error: action.error
      }
    default:
      return state
  }
}