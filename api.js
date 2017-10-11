import { Constants } from 'expo'
import { APPBAR_HEIGHT } from './constants'

export const makeAuthHeader = (state) => {
  const authData = state.auth.data

  if (authData.hasOwnProperty('access_token')) {
    return {
      'Authorization': `Bearer ${authData.access_token}`
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