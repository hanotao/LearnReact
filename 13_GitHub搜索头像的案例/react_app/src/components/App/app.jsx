import React, { Component } from 'react'

import Search from '../Search/search'
import Main from "../Main/main"



export default class App extends Component {


  state = {
    searchName: ''
  }
  setSearchName = (searchName) =>{
    this.searchName = searchName
    this.setState({searchName})
  }
  render() {
    const {searchName} = this.props
    return (
      <div className="container">
        <Search setSearchName={this.setSearchName}></Search>
        <Main searchName={this.state.searchName}></Main>
      </div>
    )
  }
}
