import {
  SUBJECT_FETCH,
  SUBJECT_RECV,
  SUBJECT_FAILURE

} from './index'

import { makeAuthHeader } from '../api'

const fetching = {
  type: SUBJECT_FETCH
}

const fetchSuccess = (data) => ({
  type: SUBJECT_RECV,
  data
})

const fetchFailure = (error) => ({
  type: SUBJECT_FAILURE,
  error
})

export const fetchSubject = (id) => (dispatch, getState) => {
  dispatch(fetching)

  return fetch(`http://api.macchiato.cl/material/subjects/${id}`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch(fetchFailure(error))
    )
    .then(response => dispatch(fetchSuccess(response)))
}