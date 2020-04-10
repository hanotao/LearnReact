import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,Button} from 'antd-mobile'
import HeaderSelector from '../../components/head-selector/header-selector'

class Staff extends Component {
  render() {
    return (
      <div>
        <NavBar>大神信息完善</NavBar> 
        <HeaderSelector></HeaderSelector> 
        <InputItem placeholder="请输入求职岗位">求职岗位:</InputItem>
        <InputItem placeholder="请个人介绍">个人介绍:</InputItem>
         <Button type='primary'>保&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Staff)