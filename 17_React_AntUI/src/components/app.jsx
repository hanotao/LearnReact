import React, { Component } from 'react'
import { Button, Toast} from 'antd-mobile';

export default class App extends Component {

  handleClick = ()=>{
    Toast.info('弹窗弹弹弹');
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>primary</Button>
      </div>
    )
  }
}

