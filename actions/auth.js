import { AUTH_TOKEN_FETCH, AUTH_SUCCESS, AUTH_FAILURE, AUTH_IDLE } from './index'

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

  return fetch('http://api.macchiato.cl/o/token/', {
    method: 'POST',
    body: `grant_type=password&username=${username}&password=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic TjYxbVZSSnU1UXM0NGJ4VmZ5Tlp1TkZ4TUNXMDI4MDVDVVFzamQ3QjplRzFqSGJIcm56RUxpSjN3R0t0anBFWDcxZkxSTFhTVGxmRXV6OFFXSWxrYW1FY21iTkJnTjNrQ1AxOFlGYzd2OUVnR0s5M3dPMTRiUUVYRDVaZkdTMjVkVlZrMUVvcDV1SGoyblNTQWUza1V4ODRBNjd6N01xOXNTcmdrZGhPMw=='
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