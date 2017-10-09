import React from 'react'
import { Text } from 'react-native'

export class Blink extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showText: true
    }

    setInterval(() => {
      this.setState(prevState => {
        return { showText: !prevState.showText }
      })

    }, 1000)
  }

  render() {
    let display = this.state.showText ? this.props.text : ' '
    return (
      <Text>{display}</Text>
    )
  }
}