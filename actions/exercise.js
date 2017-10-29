import {
  EXERCISE_FAILURE,
  EXERCISE_FETCH,
  EXERCISE_RECV
} from './index'

import {
  makeFetching,
  makeFetchFailure,
  makeFetchSuccess,
  makeAuthHeader

} from '../api'

import { APPUNTA_API_URI } from '../constants'

const fetching = makeFetching(EXERCISE_FETCH)
const fetchSuccess = makeFetchSuccess(EXERCISE_RECV)
const fetchFailure = makeFetchFailure(EXERCISE_FAILURE)

export const fetchExercise = (id) => (dispatch, getState) => {
  dispatch(fetching)

  return fetch(`${APPUNTA_API_URI}/exercises/exercises/${id}`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch(fetchFailure(error))
    )
    .then(response => {
      if (response.hasOwnProperty('content')) {
        response.content = JSON.parse(response.content)
      }
      if (response.hasOwnProperty('right_answer')) {
        response.right_answer = JSON.parse(response.right_answer)
      }
      dispatch(fetchSuccess(response))
    })
}