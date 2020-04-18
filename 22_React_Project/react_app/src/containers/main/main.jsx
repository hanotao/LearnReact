import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie' //可以get() set() remove() 
import {NavBar} from 'antd-mobile'

import NavFooter from "../../components/nav-footer/nav-footer"
import {getUser} from '../../redux/actions'
import {getRedirectTo} from '../../utils'
import BossInfo from '../boss-info/boss-info'
import StaffInfo from '../staff-info/staff-info'
import Boss from '../boss/boss'
import Staff from '../staff/staff'
import Message from '../message/message'
import Chat from '../chat/chat'
import Personal from '../personal/personal'
import NotFound from '../../components/notfound/notfound'
import './main.css'
class Main extends Component {


  navList = [
            { path: '/boss', component: Boss, title: '大神列表', icon: 'dashen', text: '大神'},
            { path: '/staff', component: Staff, title: '老板列表', icon: 'laoban', text: '老板'},
            { path: '/message', component: Message, title: '消息列表', icon: 'message', text: '消息'}, 
            { path: '/personal', component: Personal, title: '用户中心', icon: 'personal', text: '个人'} 
          ]


  componentDidMount(){
    // 登陆过(cookie中有userid),但还没有登录(redux管理的user中没有_id),发请求获取对应的user
    const userid = Cookies.get('userid');
    const {_id} = this.props;
    if(userid && !_id){
      //发送异步请求，获取user
      this.props.getUser()
    }
  }

  render() {
    const userid = Cookies.get('userid');
    //如果没有，自动重定向到登录界面
    if(!userid){
      return <Redirect to="/login"></Redirect>
    }
    //如果有，读取redux中的user状态
    const {user} = this.props;
    //如果user没有_id,返回null(不做任何显示)
    
    if(!user._id){
      return null
    }else{
      let path = this.props.location.pathname;
      if(path==='/'){
        //得到重定向路径
        path = getRedirectTo(user.type,user.header)
        return <Redirect to={path}></Redirect>
      }
    }

    const {navList} = this;
    const path = this.props.location.pathname;
    const currentNav = navList.find(nav => nav.path===path)

    if(currentNav){
      if(user.type==='laoban'){
        //隐藏staff数组
        navList[1].hide = true
      }else{
        navList[0].hide = true
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar>: null}
        <Switch>
          {
            navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path}/>)
          }
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path="/staffinfo" component={StaffInfo}></Route>
          <Route path="/chat/:userid" component={Chat}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        {currentNav? <NavFooter navList = {navList}/>: null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)


/*
  1.实现自动登录：
    1).登陆过(cookie中有userid),但还没有登录(redux管理的user中没有_id),发请求获取对应的user

    2).如果cookie没有usserid,自动进入login界面
      有则判断redux管理的user中是否有_id,如果没有，暂时不做任何显示
  
    3).都有说明当前已登陆，显示对应的界面

  2.如果已经登录，如果请求根路径：
    根据user的type和header来计算出一个重定向的路由路径，并自动重定向
*/
