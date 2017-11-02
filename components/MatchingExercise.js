import React from 'react'
import {
  Text,
  View,
  Picker
} from 'react-native'
import {
  CheckBox,
  Button,
  Divider
} from 'react-native-elements'

import { APPUNTA_COLOR } from '../constants'

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

export default class MatchingExercise extends React.Component {
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

  render() {
    const {
      sideA,
      sideB,
      rightAnswer

    } = this.props

    return (
      <View>
        {
          sideA.map((item, i) => {
            return (
              <View key={i}>
                <Text>{item}</Text>

                <Picker mode="dialog"
                        onValueChange={(val, k) => {
                          let newState = {...this.state}
                          newState.selected[i] = k
                          this.setState(newState)
                        }}
                        selectedValue={this.state.selected[i] || 0}>
                  {
                    sideB.map((itemB, j) => {
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
        <Divider style={{
          marginTop: 10,
          marginBottom: 10
        }}/>
        <Button large
                containerViewStyle={{
                  width: '100%',
                  alignSelf: 'center'
                }}
                title={this.state.button.text}
                backgroundColor={this.state.button.color}
                onPress={() => {
                  let newState = {...this.state}

                  if (objectEquals(arrayToObject(rightAnswer.matchs),
                      fillMissing(this.state.selected, sideA.length))) {
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
}