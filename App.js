import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import * as screens from './screens'

const Appunta = StackNavigator({
  Login: { screen: screens.LoginScreen },
  Home: { screen: screens.HomeScreen },
  Chat: { screen: screens.ChatScreen }
}, {
  navigationOptions: {
    headerStyle: {
      marginTop: Constants.statusBarHeight
    }
  },
  initialRouteName: 'Login'
})

export default class App extends React.Component {
  render() {
    return <Appunta/>
  }
}
