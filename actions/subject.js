import {
  SUBJECT_FETCH,
  SUBJECT_RECV,
  SUBJECT_FAILURE

} from './index'

import { makeAuthHeader } from '../api'
import { APPUNTA_API_URI } from '../constants'

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

  return fetch(`${APPUNTA_API_URI}/material/subjects/${id}`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch(fetchFailure(error))
    )
    .then(response => dispatch(fetchSuccess(response)))
}