import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'

import { fetchCourses } from '../actions/courses'
import DarkerStatusBar from '../components/DarkerStatusBar'

import {
  commonStyle
} from '../styles'

import {
  Card,
  ListItem
} from 'react-native-elements'

import {
  getFullName
} from '../api'

@connect(
  state => ({
    courses: state.courses.data,
    fetching: state.courses.fetching,
    error: state.courses.error,
    fetched: state.courses.fetched
  }), {
    fetchCourses
  }
)
export default class CoursesScreen extends React.Component {
  static navigationOptions = {
    title: 'Mis cursos'
  }

  componentWillMount() {
    const { fetchCourses } = this.props
    fetchCourses()
  }

  render() {
    const {
      courses,
      fetching,
      error,
      fetched
    } = this.props

    const { navigate } = this.props.navigation

    if (fetching || !fetched) {
      return <ActivityIndicator
        style={commonStyle.activityIndicator}
        size="large"/>
    }

    if (error !== '') {
      return <Text>{error}</Text>
    }

    return (
      <ScrollView>
        <DarkerStatusBar/>
        {
          courses.map((c, i) =>
            <TouchableNativeFeedback
              onPress={() => {
                navigate('Course', { course: c })
              }}
              key={i}>
              <Card title={c.name}>
                <ListItem
                  containerStyle={{marginBottom:-2}}
                  roundAvatar
                  title={
                    <View style={{paddingLeft:10,marginTop:-3}}>
                      <Text style={{fontWeight:'bold'}}>Profesor</Text>
                      <Text>{getFullName(c.teacher)}</Text>
                    </View>
                  }
                  avatar={require('../img/girl.png')}
                  hideChevron
                />
              </Card>
            </TouchableNativeFeedback>
          )
        }
      </ScrollView>
    )
  }
}