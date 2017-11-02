import React from 'react'
import {
  Text,
  ScrollView,
  View,
  Button
} from 'react-native'
import { makeHeaderStyle } from '../api'
import DarkerStatusBar from '../components/DarkerStatusBar'
import GuideItem from '../components/GuideItem'
import BlankScreen from '../components/BlankScreen'

export default class FunctionalGuideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.guide.title,
    headerStyle:
      makeHeaderStyle(navigation.state.params.guide.subject.color)
  })

  render() {
    const { guide } = this.props.navigation.state.params

    if (guide.items.length === 0) {
      return (
        <View style={{flex:1}}>
          <DarkerStatusBar color={guide.subject.color}/>
          <BlankScreen/>
        </View>
      )
    }

    return (
      <ScrollView>
        <DarkerStatusBar color={guide.subject.color}/>
        {
          guide.items.map((item, i) =>
            <GuideItem key={i} item={item}/>
          )
        }
      </ScrollView>
    )
  }
}