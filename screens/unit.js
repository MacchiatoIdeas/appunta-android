import React from 'react'

import { connect } from 'react-redux'
import { fetchUnit } from '../actions/unit'

import {
  ActivityIndicator,
  View,
  Text

} from 'react-native'

import { makeHeaderStyle } from '../api'

import { Rating, List, ListItem } from 'react-native-elements'

@connect(
  state => ({
    unit: state.unit.data,
    fetching: state.unit.fetching,
    fetched: state.unit.fetched
  }), {
    fetchUnit
  }
)
export default class UnitScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Ejercicios: ${navigation.state.params.unit.name}`,
    headerStyle: makeHeaderStyle(navigation.state.params.color)
  })

  componentWillMount() {
    const { fetchUnit } = this.props
    fetchUnit(this.props.navigation
      .state.params.unit.id)
  }

  render() {
    const {
      unit,
      fetching,
      fetched

    } = this.props

    const { navigate } = this.props.navigation

    if (fetching || !fetched) {
      return <ActivityIndicator size="large"/>
    }

    const color = this.props.navigation
      .state.params.color

    return (
      <View>
        <List>
          {
            unit.exercises.map((exercise, i) => {
              return <ListItem title={exercise.briefing}
                               subtitlenumberoflines={2}
                               subtitle={
                                 <View style={{paddingHorizontal: 10}}>
                                   <Text>
                                     {`Autor: ${exercise.author.first_name} ${exercise.author.last_name}`}
                                   </Text>
                                   <Rating startingValue={exercise.difficulty}
                                           type="star"
                                           imageSize={12}
                                           style={{
                                             paddingVertical: 4
                                           }}/>
                                 </View>
                               }
                               onPress={() =>
                                 navigate('Exercise', { exercise, color })
                               }
                               key={i}
                               />
            })
          }
        </List>
      </View>
    )
  }
}