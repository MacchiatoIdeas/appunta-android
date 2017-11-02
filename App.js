import React from 'react';
import { StackNavigator } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import * as screens from './screens'
import { APPUNTA_COLOR } from './constants'
import { Dimensions } from 'react-native'
import { makeHeaderStyle } from './api'
import { StatusBar } from 'react-native'

const store = createStore(rootReducer, {
  auth: undefined,
  home: undefined,
  subject: undefined,
  unit: undefined,

}, applyMiddleware(thunk))

const Appunta = StackNavigator({
  Login: { screen: screens.LoginScreen },
  Home: { screen: screens.HomeScreen },
  Subject: { screen: screens.SubjectScreen },
  Unit: { screen: screens.UnitScreen },
  Exercise: { screen: screens.ExerciseScreen },
  Courses: { screen: screens.CoursesScreen },
  Course: { screen: screens.CourseScreen },
  Guide: { screen: screens.GuideScreen },
  FGuide: { screen: screens.FunctionalGuideScreen }
}, {
  navigationOptions: {
    headerStyle: makeHeaderStyle(APPUNTA_COLOR),
    headerTintColor: 'white',
    headerTitleStyle: {
      width: Dimensions.get('window').width
    }
  },
  initialRouteName: 'Login'
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Appunta/>
      </Provider>
    )
  }
}
