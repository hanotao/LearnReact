import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief


/*
  对chatMsgs按chat_id进行分组，并得到每个组得lastMsg组成得数组

*/
function getLastMsgs(chatMsgs,userid) {
  //1.找出每个聊天的lastMsg,并用一个对象容器来保存{chat_id: lastMsg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {
    if(msg.to===userid && !msg.read){
      msg.unReadCount = 1
    }else{
      msg.unReadCount = 0
    }

    //得到msg的聊天标识id
    const chatId = msg.chat_id
    //获取已保存的当前组件的LastMsg
    let lastMsg = lastMsgObjs[chatId]
    if (!lastMsg) {
      lastMsgObjs[chatId] = msg
    } else {
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }

      //累加unReadCount并保存在最新的lastMsg上
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })
  //2.得到所有lastMsg的数组
  const lastMsgs = Object.values(lastMsgObjs)
  //3.对数组按照时间(create_time)进行排序(降序)
  lastMsgs.sort(function (m1, m2) { //如果结果是负数，将m1放前面，为0，不变，>0 m2放前面
    return m2.create_time - m1.create_time
  })

  return lastMsgs
}

class Message extends Component {
  render() {

    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    //对chatMsg按chat_id进行分组
    const lastMsgs = getLastMsgs(chatMsgs,user._id)

    return (
      <List style={{ marginTop: 48, marginBottom: 50 }}>

        {
          lastMsgs.map(msg => {
            //得到目标用户的id
            const targetUserId = msg.to===user._id?[msg.from]:[msg.to]
            //得到目标用户的信息
            const targetUser = users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount} />}
                thumb={targetUser.header?targetUser.header: null}
                arrow='horizontal'
                onClick={()=> this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
            <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({ user: state.user, chat: state.chat }),
  {}
)(Message)
