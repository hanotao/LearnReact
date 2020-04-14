import React,{Component} from 'react'
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'

import {NavBar,InputItem,TextareaItem,Button} from "antd-mobile"
import HeaderSelector from '../../components/head-selector/header-selector'
import {updateUser} from '../../redux/actions'

class BossInfo extends Component{

  state = {
    header: "", //头像名称
    post: "", //职位
    info: "", //个人或者职位简介
    company: "", //公司名字
    salary: "" //月薪
  }

  setHeader = (header)=>{
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
  render(){

    const {header,type} = this.props.user
    if(header){
      // 信息已经完善
      const path = type === 'laoban'? '/boss': '/staff';
      return <Redirect to={path}></Redirect>
    }

    return (
      <div>
        <NavBar>老板信息完善</NavBar> 
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector> 
        <InputItem placeholder="请输入职位" onChange ={val => {this.handleChange('post',val)}}> 招聘职位:</InputItem>
        <InputItem placeholder="请公司名称" onChange={val => {this.handleChange('company',val)}}>公司名称:</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => {this.handleChange('salary',val)}}>职位薪资:</InputItem>
        <TextareaItem title="职位要求:" rows={3} onChange={val => {this.handleChange('info',val)}}></TextareaItem>
        <Button type='primary' onClick={this.save} >保&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(BossInfo)