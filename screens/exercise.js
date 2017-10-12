import React from 'react'

import { connect } from 'react-redux'

import {
  Text,
  ActivityIndicator,
  View,
  Picker

} from 'react-native'

import { fetchExercise } from '../actions/exercise'
import { makeHeaderStyle } from '../api'

//import CheckBox from 'react-native-check-box'
import { Card, CheckBox, Button } from 'react-native-elements'
import {APPUNTA_COLOR} from '../constants'

const arrayToObject = (arr) => {
  let object = {}
  for (let i = 0; i < arr.length; i++) {
    object[i] = arr[i]
  }
  return object
}

const objectEquals = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const fillMissing = (obj, length) => {
  for (let i = 0; i < length; i++) {
    if (typeof(obj[i]) === 'undefined') {
      obj[i] = 0
    }
  }
  return obj
}

@connect(
  state => ({
    exercise: state.exercise.data,
    fetching: state.exercise.fetching,
    fetched: state.exercise.fetched
  }), {
    fetchExercise
  }
)
export default class ExerciseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Ejercicio",
    headerStyle: makeHeaderStyle(navigation.state.params.color)
  })

  constructor(props) {
    super(props)

    this.state = {
      button: {
        color: APPUNTA_COLOR,
        text: 'Revisar'
      },

      selected: {

      }
    }
  }

  componentWillMount() {
    const { fetchExercise } = this.props
    fetchExercise(this.props.navigation.state.params.exercise.id)
  }

  static renderAlternatives(alts) {
    return (
      <View>
        {
          alts.map((alt, i) => {
            return (
              <View key={i}>
                <CheckBox title={alt}
                          checked={false}/>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderMatching(content, { matchs }) {
    return (
      <View>
        {
          content.sideA.map((item, i) => {
            return (
              <View key={i}>
                <Text>
                  {item}
                </Text>
                <Picker mode="dialog"
                        onValueChange={(val, k) => {
                          let newState = {...this.state}
                          newState.selected[i] = k
                          this.setState(newState)
                        }}
                        selectedValue={
                          this.state.selected[i]
                        }>

                  {
                    content.sideB.map((itemB, j) => {
                      return <Picker.Item label={itemB}
                                          value={j}
                                          key={j}/>
                    })
                  }
                </Picker>
              </View>
            )
          })
        }
        <Button large
                title={this.state.button.text}
                backgroundColor={this.state.button.color}
                onPress={() => {
                  let newState = {...this.state}

                  if (objectEquals(arrayToObject(matchs),
                      fillMissing(this.state.selected, content.sideA.length))) {
                    newState.button.color = 'green'
                    newState.button.text = '¡Correcto!'
                  } else {
                    newState.button.color = 'red'
                    newState.button.text = '¡Incorrecto!'
                  }

                  this.setState(newState)
                }}/>
      </View>
    )
  }

  render() {
    const {
      exercise,
      fetching,
      fetched

    } = this.props

    if (fetching || !fetched) {
      return <ActivityIndicator size="large"/>
    }

    let content
    if (exercise.content.schema === 'alternatives') {
      content = ExerciseScreen.renderAlternatives(exercise.content.alts)
    } else if (exercise.content.schema === 'matching') {
      content = this.renderMatching(exercise.content, exercise.right_answer)
    }

    return (
      <View>
        {/*<Text>{exercise.briefing}</Text>*/}
        <Card title={exercise.briefing}>
        {
          content
        }
        </Card>
      </View>
    )
  }
}