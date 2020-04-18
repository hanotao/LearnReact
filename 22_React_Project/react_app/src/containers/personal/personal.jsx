/*
用户个人中心路由组件
*/
import React from 'react'
import {connect} from "react-redux"
import Cookies from 'js-cookie'

// 私有，不能导入
import {resetUser} from '../../redux/actions'
import { Result, List, WhiteSpace, Button,Modal } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    Modal.alert('退出','确认退出登录吗?',[
      {text: '取消'},
      {text: '确定', 
      onPress: ()=>{
        //1.删掉cookie中的userid
        Cookies.remove('userid')
        //2.redux管理的use回到原始状态
        this.props.resetUser()
      }}
    ])
  }

  render() {
    const {username,info,header,company,post,salary} = this.props.user

    return (
      <div style={{marginBottom: 50,marginTop: 50}}>
        <Result
          img={<img src={header} style={{ width: 50 }}
            alt="header" />}
          title={username}
          message={company}
        />
        <List renderHeader={() => ' 相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {salary? <Brief>薪资: {salary}</Brief>: null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)