import React from 'react'
import {
  WebView,
  Text,
  View,
  ScrollView
} from 'react-native'
import DarkerStatusBar from '../components/DarkerStatusBar'
import { makeHeaderStyle } from '../api'

import { Card } from 'react-native-elements'

const md = require('markdown-it')()
const mk = require('markdown-it-katex')

md.use(mk)

const renderMarkdown = md => {
  let html = ''
  md.map((section, i) => {
    if (section.schema === 'title') {
      html += `<h1>${section.title}</h1>`

    } else if (section.schema === 'text') {
      html += md.render(section.text)

    } else if (section.schema === 'image') {
      html += `<img src="${section.url}" style="width:100%"/>`

    } else if (section.schema === 'geogebra') {
      html += '<p>Implement GEOGEBRA schema!</p>'

    } else {
      html += `<p>Schema not supported: ${section.schema}</p>`
    }
  })
  return html
}

const renderAlternativesExercise = ex => {
  let html = ''
  ex.alts.map((alt, i) => {
    html += `<label style="{display: inline-block}"><input type="checkbox" value="${i}"`
    html += md.render(alt)
    html += '</label>'
  })
  return html
}

const renderExercise = ({text, content}) => {
  let html = renderMarkdown(JSON.parse(text))
  const ex = JSON.parse(content)

  if (ex.schema === 'alternatives') {
    html += makeAlternativesExercise(ex)

  } else {
    html += `<p>Schema not supported: ${ex.schema}`
  }
  return html
}

const renderItem = ({item, type}) => {
  if (type === 'content') {

  } else if (type === 'exercise') {
    return renderExercise(item)
  } else {
    return `<p>Item type not supported: ${type}</p>`
  }
}

export default class GuideScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.guide.title,
    headerStyle:
      makeHeaderStyle(navigation.state.params.guide.subject.color)
  })

  render() {
    const { guide } = this.props.navigation.state.params

    let html = '<html>'
    html += '<header>'
    html += '<meta charset="utf-8">'
    html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1">'

    html += '<link href="http://static.macchiato.cl/editormd/css/editormd.min.css" rel="stylesheet">'
    //html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">'
    html += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">'
    //html += '<link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>'
    html += '<style>'
    //html += 'p { font-size: 18pt; }'
    //html += '.katex { font-size: 1.2em;  }'

    html += '</style>'
    html += '</header>'
    html += '<body>'

    guide.items.map(({ item, type }) => {
      const data = JSON.parse(item.text)

      if (type === 'content') {
        data.map(section => {
          if (section.schema === 'title') {
            html += `<h1>${section.title}</h1>`

          } else if (section.schema === 'text') {
            html += md.render(section.text)

          } else if (section.schema === 'image') {
            html += `<img src="${section.url}" style="width:100%"/>`

          } else if (section.schema === 'geogebra') {


          } else {
            html += `<p>Schema not supported: ${section.schema}</p>`
          }
        })

      } else if (type === 'exercise') {
        data.map(section => {
          if (section.schema === 'text') {
            html += md.render(section.text)

          } else if (section.schema === 'image') {
            html += `<img src="${section.url}" style="width:100%"/>`

          } else {
            html += `<p>Schema not supported: ${section.schema}</p>`
          }
        })

        const content = JSON.parse(item.content)

        if (content.schema === 'alternatives') {
          content.alts.map((alt, i) => {
            html += `<label style="{display: inline-block}"><input type="checkbox" value="${i}"`
            html += md.render(alt)
            html += '</label>'
          })

        } else {
          html += `<p>Schema not supported: ${content.schema}</p>`
        }

      } else {
        html += `<p>Type not supported: ${type}</p>`
      }
    })
    html += '</body>'
    html += '</html>'

    return (
      <View style={{flex:1}}>
        <DarkerStatusBar color={guide.subject.color}/>
        <WebView style={{flex:1}} source={{html}}/>
      </View>
    )
  }
}