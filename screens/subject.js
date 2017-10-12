import React from 'react'

import { connect } from 'react-redux'
import {
  View,
  ActivityIndicator
} from 'react-native'
import { makeHeaderStyle } from '../api'
import { fetchSubject } from '../actions/subject'
import { List, ListItem } from 'react-native-elements'

@connect(
  state => ({
    subject: state.subject.data,
    fetching: state.subject.fetching,
    fetched: state.subject.fetched
  }), {
    fetchSubject
  }
)
export default class SubjectScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Unidades: ${navigation.state.params.subject.name}`,
    headerStyle: makeHeaderStyle(navigation.state.params.subject.color)
  })

  componentWillMount() {
    const { fetchSubject } = this.props
    fetchSubject(this.props.navigation.state.params.subject.id)
  }

  render() {
    const {
      subject,
      fetching,
      fetched

    } = this.props

    const { navigate } = this.props.navigation

    if (fetching || !fetched) {
      return <ActivityIndicator size="large"/>
    }

    return (
      <View>
        <List>
          {
            subject.units.map((unit, i) => {
              return (
                <ListItem key={i}
                          title={unit.name}
                          onPress={() => navigate('Unit', {
                            unit,
                            color: subject.color
                          })}/>
              )
            })
          }
        </List>
      </View>
    )
  }
}