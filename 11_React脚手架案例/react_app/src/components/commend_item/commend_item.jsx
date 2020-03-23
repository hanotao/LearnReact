import React, { Component } from 'react'
import PropTypes from "prop-types"

import './commend_item.css'

export default class commend_item extends Component {
  
  // 给组件类添加属性
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  handleClick = () =>{
    const {comment,deleteComment,index} = this.props
    if(window.confirm(`确定删除${comment.username}的评论吗`)){
      deleteComment(index)
  }
}

  render() {
    const {comment} = this.props
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="#" onClick={this.handleClick}>删除</a>
        </div>
    <p className="user"><span >{comment.username}</span><span>说:</span></p>
    <p className="centence">{comment.content}</p>
      </li>
    )
  }

}

// commend_item.PropTypes = {
//   commends: PropTypes.array.isRequired
// }
