import React from 'react'
import { ScrollView, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { fetchSubjects } from '../actions/home'
import SubjectItem from '../components/SubjectItem'

@connect(
  state => ({
    test: state.test,
    fetching: state.home.fetching,
    subjects: state.home.subjects,

  }), {
    fetchSubjects
  }
)
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Materias'
  }

  componentWillMount() {
    const { fetchSubjects } = this.props
    fetchSubjects()
  }

  render() {
    const {
      fetching,
      subjects,

    } = this.props

    if (fetching) {
      return <ActivityIndicator
        style={{
          marginTop: 50
        }}
        size="large"/>
    }

    return (
      <ScrollView>
        {
          subjects.map(
            (subject, i) =>
              <SubjectItem
                navigation={this.props.navigation}
                subject={subject}
                key={i}/>
          )
        }
      </ScrollView>
    )
  }
}
