import {combineReducers} from "redux" //合并
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'

import {getRedirectTo} from "../utils"


const initUser = {
  username: '',  //用户名
  type: '',     //用户类型
  msg: '',      //错误提示信息
  redirectTo: '' //需要自动重定向的路由路径
}



// 产生user状态的reducer
function user(state=initUser,action){

  switch (action.type){
    case AUTH_SUCCESS:
      const {type,header} = action.data
      return {...action.data,redirectTo: getRedirectTo(type,header)}
    case ERROR_MSG:
      return {...state,msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      console.log(initUser)
      return {...initUser,msg: action.data}

    default:
      return state
  }
}









export default combineReducers({
  user,
})


