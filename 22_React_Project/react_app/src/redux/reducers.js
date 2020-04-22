import {combineReducers} from "redux" //合并
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
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
      return {...initUser,msg: action.data}
    default:
      return state
  }
}

//产生userlist状态的reducer
const initUserList = []
function userList(state=initUserList,action){
  switch(action.type){
    case RECEIVE_USER_LIST: //data为userlist
      return action.data
    default:
      return state
  }
}


const initChat = {
  users: {}, //所有用户信息的对象，属性名：userid ,属性值{username,header}
  chatMsgs: [], //当前用户所有相关message的数组
  unReadCount: 0 //总的未读数量
}
function chat(state=initChat,action){
  switch(action.type){
    case RECEIVE_MSG_LIST:
      const {users,chatMsgs,userid} = action.data;
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal,msg)=> preTotal+(!msg.read&&msg.to===userid?1:0),0)
      }
    case RECEIVE_MSG: //data: chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs,chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
        
      }
    default:
      return state
  }
}








export default combineReducers({
  user,
  userList,
  chat
})

//向外暴露的状态的结构： {user:{},userlist:[],chat:{}}

