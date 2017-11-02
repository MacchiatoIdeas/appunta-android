import React from 'react'
import AppuntaText from './AppuntaText'
import AlternativeExercise from './AlternativeExercise'
import MatchingExercise from './MatchingExercise'
import TrueOrFalseExercise from './TrueOrFalseExercise'
import Unsupported from './Unsupported'
import {
  View
} from 'react-native'
import {
  Card
} from 'react-native-elements'

export default class Exercise extends React.Component {
  render() {
    const { ex } = this.props
    const content = JSON.parse(ex.content)
    const rightAnswer = JSON.parse(ex.right_answer)

    let exercise = <Unsupported/>
    if (content.schema === 'alternatives') {
      exercise = <AlternativeExercise alts={content.alts}
                                      rightAnswer={rightAnswer}/>
    } else if (content.schema === 'matching') {
      exercise = <MatchingExercise  sideA={content.sideA}
                                    sideB={content.sideB}
                                    rightAnswer={rightAnswer}/>
    } else if (content.schema === 'trueorfalse') {
      exercise = <TrueOrFalseExercise sentences={content.sentences}
                                      rightAnswer={rightAnswer}/>
    }

    return (
      <Card title={"Ejercicio"}>
        <AppuntaText
          style={{
            marginBottom: 10
          }}
          sections={JSON.parse(ex.text)}/>
        { exercise }
      </Card>
    )
  }
}