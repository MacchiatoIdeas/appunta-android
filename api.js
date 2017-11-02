import { APPUNTA_DEBUG_TOKEN } from './constants'

export const makeAuthHeader = (state) => {
  const authData = { ...state.auth.data }

  if (!authData.hasOwnProperty('access_token') &&
    APPUNTA_DEBUG_TOKEN !== undefined) {
    authData.access_token = APPUNTA_DEBUG_TOKEN
  }

  if (authData.hasOwnProperty('access_token')) {
    return {
      headers: {
        'Authorization': `Bearer ${authData.access_token}`,
      }
    }
  }
  return undefined
}


export const makeHeaderStyle = backgroundColor => ({
  backgroundColor: backgroundColor
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

export const getFullName = u => `${u.first_name} ${u.last_name}`

export const formatDateToLocale = (date) => {
  return new Date(date).toLocaleDateString('es', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};