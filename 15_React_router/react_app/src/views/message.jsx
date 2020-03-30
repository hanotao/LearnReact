import React, { Component } from 'react'
import {Route,Link} from "react-router-dom"

import MessageDetail from "./message_detail"
export default class Message extends Component {

  state = {
    messages:[]
  }

  componentDidMount(){
    setTimeout(() => {
      const data = [
        {id:1,title:'Message001'},
        {id:3,title:'Message003'},
        {id:6,title:'Message006'},
      ]
      this.setState({
        messages: data
      })
    },1000)
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.messages.map((m,index) => {
              return (
                <li key={index}>
                  <Link to={`/home/message/msgdetail/${m.id}`}>{m.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <Route path="/home/message/msgdetail/:id" component={MessageDetail}></Route>
      </div>
    )
  }
}
