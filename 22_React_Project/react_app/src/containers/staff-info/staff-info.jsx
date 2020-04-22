import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/head-selector/header-selector'
import {updateUser} from "../../redux/actions"

class StaffInfo extends Component {
  state = {
    header: "", //头像名称
    post: "",
    info: "", //个人或者职位简介
    
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name,value) =>{
    this.setState({
      [name]:value
    })
  }

  save = () =>{
    this.props.updateUser(this.state)
  }

  render() {
    // 通过判断header是否有值来进行跳转或者渲染
    const {header,type} = this.props.user;
    if(header){
      const path = type === 'dashen'? '/staff': '/boss'
      return <Redirect to={path}></Redirect>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar> 
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector> 
        <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange('post',val)}>求职岗位:</InputItem>
        <InputItem placeholder="请个人介绍" onChange={val => this.handleChange('info',val)}>个人介绍:</InputItem>
         <Button type='primary' onClick={this.save}>保&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(StaffInfo)