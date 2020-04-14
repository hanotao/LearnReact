/*
  包含多个action creator
  异步action
  同步action
*/ 

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'

// 同步action
//授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS,data: user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG,data: msg}) 
//接收用户的同步action
const receiveUser = (user) => ({type:RECEIVE_USER,data: user})
//重置用户的同步action
const resetUser = (msg) => ({type: RESET_USER,data: msg})




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
      //成功
      dispatch(receiveUser(result.data))
    }else{
      //失败
      dispatch(resetUser(result.msg))
    }
  }
}