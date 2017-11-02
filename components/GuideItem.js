import React from 'react'
import Unsupported from './Unsupported'
import Exercise from './Exercise'
import Content from './Content'

export default class GuideItem extends React.Component {
  render() {
    const {item} = this.props

    if (item.type === 'content') {
      return <Content content={item.item}/>
    } else if (item.type === 'exercise') {
      return <Exercise ex={item.item}/>
    } else {
      return <Unsupported/>
    }
  }
}