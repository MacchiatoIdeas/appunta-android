import React from 'react'
import AppuntaText from './AppuntaText'
import {
  Card
} from 'react-native-elements'

export default class Content extends React.Component {
  render() {
    const { content } = this.props
    return (
      <Card
        title={content.title}>
        <AppuntaText sections={JSON.parse(content.text)}/>
      </Card>
    )
  }
}
