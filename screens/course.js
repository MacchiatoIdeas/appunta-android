import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  View,
  StyleSheet
} from 'react-native'
import { fetchCourse } from '../actions/course'
import {
  commonStyle
} from '../styles'

import {
  Card,
  ListItem
} from 'react-native-elements'

import BlankScreen from '../components/BlankScreen'

import {
  formatDateToLocale,
  getFullName
} from '../api'

@connect(
  state => ({
    course: state.course.data,
    fetching: state.course.fetching,
    error: state.course.error,
    fetched: state.course.fetched
  }), {
    fetchCourse
  }
)
export default class CourseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.course.name,
  })

  componentWillMount() {
    this.props.fetchCourse(this.props.navigation.state.params.course.id)
  }

  render() {
    const {
      course,
      fetching,
      fetched,
      error
    } = this.props

    const { navigate } = this.props.navigation

    if (fetching || !fetched) {
      return <ActivityIndicator
        style={commonStyle.activityIndicator}
        size="large"/>
    }

    if (error !== '') {
      return <Text>{error}</Text>
    }

    if (course.guides.length === 0) {
      return <BlankScreen/>
    }

    return (
      <ScrollView>
        {
          course.guides.map(({ guide, answers }, i) =>
            <TouchableNativeFeedback
              key={i}
              onPress={() => navigate('FGuide', { guide, answers })}>

              <Card title={guide.title} dividerStyle={{marginTop:5}}>
                <View>
                  <Text style={style.date}>
                    {formatDateToLocale(guide.moment)}
                  </Text>

                  <ListItem
                    style={{
                      marginTop: 25
                    }}
                    containerStyle={{marginBottom:-2}}
                    roundAvatar
                    title={
                      <View style={{paddingLeft:10,marginTop:-3}}>
                        <Text style={{fontWeight:'bold'}}>Creador</Text>
                        <Text>{getFullName(guide.author)}</Text>
                      </View>
                    }
                    avatar={require('../img/girl.png')}
                    hideChevron
                  />

                  <Text style={style.brief}>
                    <Text style={{
                      fontWeight: 'bold'
                    }}>
                      Descripción:
                    </Text>
                    <Text>  </Text>
                    {guide.brief}
                  </Text>
                </View>
              </Card>
            </TouchableNativeFeedback>
          )
        }
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  date: {
    alignSelf: 'center',
    fontSize: 10,
    marginTop: -36
  },
  brief: {
    paddingTop: 15
  }
})