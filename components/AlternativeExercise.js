import React from 'react'
import {
  Text,
  View
} from 'react-native'
import {
  CheckBox,
  Divider,
  Button
} from 'react-native-elements'
import {APPUNTA_COLOR} from '../constants'

const initialState = ({ alts }) => {
  let state = {
    alts: {},
    button: {
      text: 'Revisar',
      color: APPUNTA_COLOR
    }
  }

  alts.map((_, i) => {
    state.alts[i] = {}
    state.alts[i].checked = false
  })

  return state
}

export default class AlternativeExercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState(props)
  }

  render() {
    const { alts, rightAnswer } = this.props

    return (
      <View>
        {
          alts.map((alt, i) =>
            <CheckBox key={i}
                      title={alt}
                      onPress={() => {
                        let newState = { ...initialState(this.props) }
                        newState.alts[i].checked = !newState.alts[i].checked
                        this.setState(newState)
                      }}
                      checked={this.state.alts[i].checked}
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
                  let newState = {...this.state}

                  alts.map((alt, i) => {
                    if (i === rightAnswer.answer && this.state.alts[i].checked) {
                      newState.button.color = 'green'
                      newState.button.text = '¡Correcto!'
                    }
                  })

                  if (newState.button.color !== 'green') {
                    newState.button.color = 'red'
                    newState.button.text = '¡Incorrecto!'
                  }

                  this.setState(newState)
                }}/>
      </View>
    )
  }
}