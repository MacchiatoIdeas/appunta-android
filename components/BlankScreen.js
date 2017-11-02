import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

export default class BlankScreen extends React.Component {
  render() {
    let {
      img,
      imgStyle,
      text,
      textStyle
    } = this.props

    // default values
    img = img  || require('../img/ereader-1.png')
    imgStyle = imgStyle || {
      width: 200,
      height: 200
    }
    text = text || 'No hay contenidos'
    textStyle = textStyle || {
      paddingTop: 20,
      fontSize: 24
    }

    return (
      <View style={style.blankView}>
        <View style={style.blankView}>
          <Image
            source={img}
            style={imgStyle}
          />
          <Text style={textStyle}>{text}</Text>
        </View>

        {/* dummy half */}
        <View style={{flex:1}}/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  blankView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})