/*
  包含多个action creator
  异步action
  同步action
*/ 
import io from 'socket.io-client'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'

/**
  单例对象 
    1.创建对象之前： 判断对像是否已经存在，只有不存在才去创建
    2.创建对象之后：保存对象
 */

//socket 准备
function initIO(dispatch,userid){
  if(!io.socket){
    //连接服务器，得到代表连接的socket对象
  io.socket = io('ws://localhost:4000');
  //绑定'receiveMessage'的监听，来接收服务器发送的消息
  io.socket.on('receiveMsg',function(chatMsg){
    
    console.log('浏览器端接收到消息',chatMsg)
    //只有当chatMsg是与当前用户相关的消息，才去分发同步action保存消息
    if(userid===chatMsg.from || userid === chatMsg.to){
      dispatch(receiveMsg(chatMsg,userid))
    }
  });
  }
}


async function getMsgList(dispatch,userid){
  initIO(dispatch,userid);
  const response = await reqChatMsgList()
  const result = response.data;
  if(result.code ===0){
    const {users,chatMsgs} = result.data;
    dispatch(receiveMsgList({users,chatMsgs,userid}))
  }
}


// 同步action
//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS,data: user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG,data: msg}) 
//接收用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER,data: user})
//重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER,data: msg})
//接收用户列表的同步action
const receiveUserList = (userlist) => ({type: RECEIVE_USER_LIST,data: userlist})
//接收消息列表的同步action
const receiveMsgList = ({users,chatMsgs,userid}) => ({type:RECEIVE_MSG_LIST,data: {users,chatMsgs,userid}})
//接收一个消息的同步action
const receiveMsg = (chatMsg,userid) => ({type:RECEIVE_MSG,data: {chatMsg,userid}})





// 异步action
//注册action
export const register = (user) => {
  const {username,password,password2,type} = user

  if(!username){
    return errorMsg('用户名必须指定！')
  } else if(password !== password2){
    return errorMsg("2次密码需要一致")
  }else if (!password){
    return errorMsg('请输入密码！')
  }
    // 异步action需要返回一个函数
  return async dispatch => {
    // 发送注册的异步ajax请求 .then返回的是promise
    // 同步
    // const promise = reqRegister(user)
    // promise.then(response => {
    //   const result = response.data
    // })

    const response = await reqRegister({username,password,type})
    const result = response.data;

    if(result.code===0){
      getMsgList(dispatch,result.data._id)
      // 成功
      //分发成功的action
      dispatch(authSuccess(result.data))
    }else{
      //失败
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录
export const login = (user) => {
  const {username,password} = user
  if(!username){
    return errorMsg('用户名必须指定！')
  } else if(!password){
    return errorMsg("密码必须指定!")
  }
  return async dispatch => {
    const response = await reqLogin(user);
    const result = response.data;
    if(result.code===0){
      getMsgList(dispatch,result.data._id)
      // 成功
      dispatch(authSuccess(result.data))
    }else{
      // 失败
      dispatch(errorMsg(result.msg))
    } 
  }
}

// 更新用户信息
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if(result.code === 0){
     
      // 更新成功
      // 分发同步action
      dispatch(receiveUser(result.data))
    }else{
      //更新失败
      // 分发同步action
      dispatch(resetUser(result.msg))
    }
  }
}

//获取用户异步action
export const getUser = () => {
  return async dispatch => {
    //执行异步ajax请求
    const response = await reqUser()
    const result = response.data;
    if(result.code===0){
      console.log(result)
      getMsgList(dispatch,result.data._id)
      //成功
      dispatch(receiveUser(result.data));
    }else{
      //失败
      dispatch(resetUser(result.msg));
    }
  }
}

// 获取用户列表的异步action
export const getUserList = (type) => {
  return async dispatch => {
    // 执行异步ajax请求
    const response = await reqUserList(type)
    const result = response.data
    // 得到结果后, 分发一个同步action
    if(result.code===0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

//异步发送消息的action
export const sendMsg = ({from,to,content}) => {
  return dispatch => {
    console.log("客户端发送信息",{from,to,content})
    
    io.socket.emit("sendMsg",{from,to,content})
  }
}