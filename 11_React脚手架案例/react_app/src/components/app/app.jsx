import React, { Component } from 'react'
import CommentAdd from "../commend_add/commend_add"
import CommentList from "../commend_list/commend_list"


export default class app extends Component {

  state = {
    comments: [
      {username: 'Tom',content: 'React挺好的'},
      {username: "Jack",content: "React太难了"}
    ]
  }

  addComment = (comment) => {
    const {comments} = this.state
    comments.unshift(comment)
    this.setState({
      comments
    })
  }

  deleteComment = (index) =>{
    const {comments} = this.state
    comments.splice(index,1)
    this.setState({
      comments
    })
  }

  render() {
    const {comments} = this.state
    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <CommentAdd addComment={this.addComment}></CommentAdd>
          <CommentList comments={comments} deleteComment={this.deleteComment}></CommentList>
        </div>
      </div>
        
    )
  }
}
