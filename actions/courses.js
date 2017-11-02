import {
  COURSES_FAILURE,
  COURSES_FETCH, COURSES_RECV
} from './index'

import {
  makeAuthHeader
} from '../api'

import { APPUNTA_ERROR_NOT_AUTHENTICATED } from '../constants'

import { APPUNTA_API_URI } from '../constants'

export const fetchCourses = () => (dispatch, getState) => {
  dispatch({
    type: COURSES_FETCH
  })

  return fetch(`${APPUNTA_API_URI}/courses/courses`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch({
        type: COURSES_FAILURE,
        error
      })
    )
    .then(data => {
      if (data.constructor === {}.constructor) {
        if (data.hasOwnProperty('detail')) {
          dispatch({
            type: COURSES_FAILURE,
            error: data.detail
          })
          return
        }
      }

      dispatch({
        type: COURSES_RECV,
        data
      })
    }
    )
}