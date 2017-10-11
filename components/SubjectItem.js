import React from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions

} from 'react-native'

export default class SubjectItem extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    const { subject } = this.props

    let thumbnail = {
      uri: subject.thumbnail
    }

    return (

      <TouchableNativeFeedback
        onPress={() => navigate('Subject', { subject }) }>

        <View>
          {
            // TODO: react-native-fit-image
          }
          <Image
            resizeMode='cover'
            style={styles.thumbnail}
            source={thumbnail}/>

          <Text>{subject.name}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: Dimensions.get('window').width,
    height: 200
  }
})