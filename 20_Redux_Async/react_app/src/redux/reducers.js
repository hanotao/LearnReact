// 包含N个reducer函数(根据老的state和action返回新的state)
import {ADD_COMMENT,DELETE_COMMENT,RECEIVE_COMMENTS} from "./action-types"


const initComments = [
    
]

export function comments(state=initComments,action){
  switch(action.type){
    case ADD_COMMENT:
      // 不能改变其原来的state,采用新的state取代旧的state
      return [action.data,...state]
    case DELETE_COMMENT:
      return state.filter((comments,index) => index!==action.data)
    case RECEIVE_COMMENTS:
      return action.data
    default:
      return state
  }
}