import React, { Component } from 'react'
import PropTypes from "prop-types"

import CommendItem from "../commend_item/commend_item"
import '../commend_list/commend.css'

export default class commend_list extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     comment:[
  //     {username: 'Tom',content: 'React挺好的'},
  //     {username: "Jack",content: "React太难了"}
  //     ]
  //   }
  // }


  static propTypes = {
    comments: PropTypes.array.isRequired,
    deleteComment: PropTypes.func.isRequired
  }

  

  render() {
    const {comments,deleteComment} = this.props
    // 计算出是否显示
    const display = comments.length ===0 ? 'block' : 'none'
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{display}}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {
            comments.map((comment,index)=> <CommendItem comment={comment} key={index} deleteComment={deleteComment} index={index}/>)
          }
        </ul>
      </div>
    
    )
  }
}
