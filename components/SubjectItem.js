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

        <View style={{ flex: 1 }}>
          {
            // TODO: react-native-fit-image
          }
          <Image
            resizeMode='cover'
            style={styles.thumbnail}
            source={thumbnail}>
            <View style={styles.thumbnailView}>
              <Text style={[styles.headline, {backgroundColor: subject.color}]}>{subject.name.toUpperCase()}</Text>
            </View>
          </Image>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: Dimensions.get('window').width,
    height: 200,
    paddingBottom: 0,
    flex: 1,
    justifyContent: 'flex-end'
  },
  thumbnailView: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    fontWeight: 'bold'
  }
})