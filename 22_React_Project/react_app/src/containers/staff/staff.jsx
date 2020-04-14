import React, { Component } from 'react'
import {connect} from 'react-redux'

class Staff extends Component {
  render() {
    return (
      <div>
        Staff
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Staff)