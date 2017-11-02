import React from 'react'
import {
  Image,
  Text,
  StyleSheet,
  ScrollView

} from 'react-native'
import Unsupported from './Unsupported'

export default class AppuntaText extends React.Component {
  render() {
    const {
      sections,
    } = this.props

    const externalStyle = this.props.style || style.emptyStyle

    return (
      <ScrollView style={[style.container,externalStyle]}>
        {
          sections.map((section, i) => {
            if (section.schema === 'title') {
              return (
                <Text key={i} style={style.title}>{section.title}</Text>
              )
            } else if (section.schema === 'text') {
              return (
                <Text key={i}>{section.text}</Text>
              )
            } else if (section.schema === 'geogebra') {
              return (
                <Image
                  key={i}
                  style={style.canvas}
                  source={{uri:section.image}}/>
              )
            } else if (section.schema === 'image') {
              return (
                <Image
                  key={i}
                  resizeMode="contain"
                  style={style.canvas}
                  source={{uri:section.url}}/>
              )
            } else {
              return <Unsupported/>
            }
          })
        }
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  canvas: {
    width: '100%',
    height: 300,
    resizeMode:'cover',
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    flex: 1
  },
  emptyStyle: {}
})