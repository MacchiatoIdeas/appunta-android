import { Constants } from 'expo'
import { APPBAR_HEIGHT } from './constants'

export const makeAuthHeader = (state) => {
  const authData = state.auth.data

  if (authData.hasOwnProperty('access_token')) {
    return {
      header: {
        'Authorization': `Bearer ${authData.access_token}`
      }
    }
  }
  return undefined
}

export const makeHeaderStyle = backgroundColor => ({
  // TODO: Nasty trick to overcome Expo limitations
  paddingTop: Constants.statusBarHeight,
  backgroundColor: backgroundColor,
  height: APPBAR_HEIGHT + Constants.statusBarHeight
})

// Fetch state template
export const FETCH_STATE_TEMPLATE = {
  data: {},
  fetching: false,
  fetched: false,
  error: ''
}

export const makeFetching = (what) => ({
  type: what
})

export const makeFetchFailure = (what) => (error) => ({
  type: what,
  error
})

export const makeFetchSuccess = (what) => (data) => ({
  type: what,
  data
})