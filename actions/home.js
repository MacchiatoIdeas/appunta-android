import {HOME_FAILURE, HOME_FETCH, HOME_RECV} from "./index";
import { makeAuthHeader } from '../api'

const fetching = {
  type: HOME_FETCH
}

const fetchFailure = (error) => ({
  type: HOME_FAILURE,
  error
})

const fetchSuccess = (subjects) => ({
  type: HOME_RECV,
  subjects
})

export const fetchSubjects = () => (dispatch, getState) => {
  dispatch(fetching)

  return fetch('http://api.macchiato.cl/material/subjects/', makeAuthHeader(getState()))
    .then(
      response => response.json(),
      error => dispatch(fetchFailure(error))
    )
    .then(response => {
      dispatch(fetchSuccess(response))
    })
}