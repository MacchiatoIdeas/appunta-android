import React from 'react'

import { connect } from 'react-redux'
import { View, Text, ActivityIndicator } from 'react-native'
import { makeHeaderStyle } from '../api'
import { fetchSubject } from '../actions/subject'

@connect(
  state => ({
    subject: state.subject.data,
    fetching: state.subject.fetching
  }), {
    fetchSubject
  }
)
export default class SubjectScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.subject.name,
    headerStyle: makeHeaderStyle(navigation.state.params.subject.color)
  })

  componentWillMount() {
    const { fetchSubject } = this.props
    fetchSubject(this.props.navigation.state.params.subject.id)
  }

  render() {
    const {
      subject,
      fetching

    } = this.props

    if (fetching) {
      return <ActivityIndicator size="large"/>
    }

    return (
      <View>
        {
          // Check if subject is loaded
          (subject.units !== undefined) ?
            (subject.units.length === 0) ?
              <Text>No hay materias!</Text> :
              subject.units.map((unit, i) =>
              <Text key={i}>{unit.name}</Text>) : null
        }
      </View>
    )
  }
}