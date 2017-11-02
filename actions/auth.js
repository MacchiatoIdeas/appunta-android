import { AUTH_TOKEN_FETCH, AUTH_SUCCESS, AUTH_FAILURE, AUTH_IDLE } from './index'
import { APPUNTA_API_URI, APPUNTA_B64_AUTH } from '../constants'

const authenticationFailed = (error) => ({
  type: AUTH_FAILURE,
  error
})

const authenticationSuccess = (data) => ({
  type: AUTH_SUCCESS,
  data
})

const authenticating = {
  type: AUTH_TOKEN_FETCH
}

export const getToken = (username, password) => (dispatch) => {
  dispatch(authenticating)

  return fetch(`${APPUNTA_API_URI}/o/token/`, {
    method: 'POST',
    body: `grant_type=password&username=${username}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${APPUNTA_B64_AUTH}`
    }
  })
    .then(
      response => response.json(),
      error => dispatch(authenticationFailed(error))
    )
    .then(data => {
      if (data.hasOwnProperty('error')) {
        dispatch(authenticationFailed(data.error))
      } else {
        dispatch(authenticationSuccess(data))
      }
    })
}

export const resetState = () => (dispatch) => {
  dispatch({
    type: AUTH_IDLE
  })
}