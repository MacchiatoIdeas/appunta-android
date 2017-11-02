import React from 'react'
import {
  Text,
  StyleSheet
} from 'react-native'

export default class Unsupported extends React.Component {
  render() {
    return (
      <Text style={style.unsupported}>
        {this.props.msg || 'Unsupported!'}
      </Text>
    )
  }
}

const style = StyleSheet.create({
  unsupported: {
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
    color: 'red'
  }
})