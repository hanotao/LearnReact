import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import {connect} from "react-redux"

import CommentAdd from "../../components/commend_add/commend_add"
import CommentList from "../../components/commend_list/commend_list"
import {addComment,deleteComment,getComments} from '../../redux/actions'


export class App extends Component {

  static propTypes = {
    comment: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.getComments()
  }


  render() {
    const {comments,addComment,deleteComment} = this.props
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
          <CommentAdd addComment={addComment}></CommentAdd>
          <CommentList comments={comments} deleteComment={deleteComment}></CommentList>
        </div>
      </div>
        
    )
  }
}

export default connect(
  state => ({comments: state}),
  {addComment,deleteComment,getComments}
)(App)
