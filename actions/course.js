import {
  COURSE_FAILURE,
  COURSE_FETCH,
  COURSE_RECV
} from './index'

import {
  makeAuthHeader
} from '../api'

import { APPUNTA_API_URI } from '../constants'

export const fetchCourse = (id) => (dispatch, getState) => {
  dispatch({
    type: COURSE_FETCH
  })

  return fetch(`${APPUNTA_API_URI}/courses/courses/${id}`,
    makeAuthHeader(getState()))

    .then(
      response => response.json(),
      error => dispatch({
        type: COURSE_FAILURE,
        error
      })
    )
    .then(data => {
        if (data.constructor === {}.constructor) {
          if (data.hasOwnProperty('detail')) {
            dispatch({
              type: COURSE_FAILURE,
              error: data.detail
            })
            return
          }
        }

        dispatch({
          type: COURSE_RECV,
          data
        })
      }
    )
}