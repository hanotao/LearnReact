import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'

import Boss from '../boss/boss'
import Staff from '../staff/staff'

export default class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/boss' component={Boss}></Route>
          <Route path="/staff" component={Staff}></Route>
        </Switch>
      </div>
    )
  }
}
