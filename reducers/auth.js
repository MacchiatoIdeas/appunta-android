import {
  AUTH_TOKEN_FETCH,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_IDLE

} from '../actions';

const initialState = {
  data: {},
  authenticated: false,
  authenticationFailed: false,
  error: '',
  fetchingToken: false
}

export default (state=initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN_FETCH:
      return {
        ...initialState,
        fetchingToken: true
      }
    case AUTH_SUCCESS:
      return {
        ...initialState,
        data: action.data,
        authenticated: true,
      }
    case AUTH_FAILURE:
      return {
        ...initialState,
        authenticationFailed: true,
        error: action.error
      }
    case AUTH_IDLE:
      return {
        ...initialState
      }
    default:
      return state
  }
}