import {
  UNIT_FAILURE,
  UNIT_FETCH,
  UNIT_RECV

} from './index'

import { makeAuthHeader } from '../api'

const fetching = {
  type: UNIT_FETCH
}

const fetchingFailure = (error) => ({
  type: UNIT_FAILURE,
  error
})

const fetchingSuccess = (data) => ({
  type: UNIT_RECV,
  data
})

export const fetchUnit = (id) => (dispatch, getState) => {
  dispatch(fetching)

  return fetch(`http://api.macchiato.cl/material/units/${id}`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch(fetchingFailure(error))
    )
    .then(response => dispatch(fetchingSuccess(response)))
}