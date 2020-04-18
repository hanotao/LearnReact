/*
  包含了N个接口请求的函数的模块
  函数返回值为：promise
*/

import ajax from './ajax'


// export function 
// 注册
export const reqRegister = (user) => ajax('/register',user,'POST')

//登录接口
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')

// 更新用户
export const reqUpdateUser = (user) => ajax('/update',user,'POST')

//获取用户信息
export const reqUser = () => ajax('/user')

//获取指定类型的用户列表
export const reqUserList = (type) => ajax('/userlist',{type})