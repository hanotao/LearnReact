import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'

import {comments} from './reducers' 

// redux最核心的管理对象store
const store = createStore(
  comments,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store