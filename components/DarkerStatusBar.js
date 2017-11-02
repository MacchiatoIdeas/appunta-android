import React from 'react'
import { APPUNTA_COLOR } from '../constants'
import { StatusBar } from 'react-native'

export default class DarkerStatusBar extends React.Component {
  render() {
    // color: base color, factor: always < 1
    let { color, factor } = this.props

    // Default color set to APPUNTA_COLOR
    if (color === undefined) {
      color = APPUNTA_COLOR
    }

    // Default factor set to 0.8
    if (factor === undefined) {
      factor = 0.8
    }

    // Multiply each RGB component
    const colorHex = parseInt(color.slice(1), 16)
    const r = (colorHex >> 16) * factor
    const g = ((colorHex >> 8) & 0x0000FF) * factor
    const b = (colorHex & 0x0000FF) * factor

    // z(n) behaves like a python's .zfill(2) on hex numbers (factor must be < 1!)
    const z = n => {
      let s = Math.round(n).toString(16)
      return (s.length === 1) ? '0' + s : s
    }
    // Stringify result
    const statusBarColor = '#' + z(r) + z(g) + z(b)

    return (
      <StatusBar
        backgroundColor={statusBarColor}
        animated/>
    )
  }
}