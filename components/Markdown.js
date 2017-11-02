import React from 'react'

const md = require('markdown-it')(),
      mk = require('markdown-it-katex')

md.use(mk)

export default class Markdown extends React.Component {

}