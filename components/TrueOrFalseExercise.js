import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {
  ListItem,
  Button,
  Divider
} from 'react-native-elements'
import { APPUNTA_COLOR } from '../constants'

class TrueOrFalse extends React.Component {
  render() {
    const { value } = this.props
    let color = this.props.color || 'black'

    if (value) {
      return <Text style={[style.trueOrFalse,{color}]}>V</Text>
    } else {
      return <Text style={[style.trueOrFalse,{color}]}>F</Text>
    }
  }
}

const initialState = (props) => {
  let state = {
    items: {

    },
    button: {
      text: 'Revisar',
      color: APPUNTA_COLOR
    }
  }
  const { sentences } = props
  sentences.map((s, i) => {
    state.items[i] = {}
    state.items[i].value = false
    state.items[i].color = 'black'
  })
  return state
}

export default class TrueOrFalseExercise extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialState(props)
  }

  render() {
    const {
      sentences,
      rightAnswer
    } = this.props

    return (
      <View>
        {
          sentences.map((sentence, i) =>
            <ListItem
              key={i}
              title={sentence}
              hideChevron
              leftIcon={
                <TrueOrFalse value={this.state.items[i].value}
                             color={this.state.items[i].color}/>
              }
              onPress={() => {
                let newState = {...this.state}
                newState.items[i].value = !this.state.items[i].value
                this.setState(newState)
              }}
              style={{
                marginBottom: -1,
                marginTop: 12
              }}
              />
          )
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
                  rightAnswer.choices.map((choice, i) => {
                    let newState = {...this.state}

                    if (this.state.items[i].value === choice) {
                      newState.items[i].color = 'green'
                    } else {
                      newState.items[i].color = 'red'
                    }
                    this.setState(newState)
                  })
                }}/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  trueOrFalse: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20
  }
})