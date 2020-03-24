import React, { Component } from 'react'

import Search from '../Search/search'
import Main from "../Main/main"



export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Search></Search>
        <Main></Main>
      </div>
    )
  }
}
