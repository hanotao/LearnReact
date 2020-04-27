import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sendMsg,readMsg} from "../../redux/actions"

import QueueAnim from "rc-queue-anim"
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
const Item = List.Item


class Chat extends Component {

  state = {
    content: '',
    isShow: false
  }

  //在第一次render()之前回调
  componentWillMount(){
    const emojis = ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","🤩","😘","😗","😚","😙","😋","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓"]
    this.emojis = emojis.map(emoji=>({
      text:emoji
    }))
  }
  componentDidMount(){
    //滚动到最底部，最新消息
    window.scrollTo(0,document.body.scrollHeight)

  }

  componentDidUpdate(){
    //滚动到最底部，最新消息
    window.scrollTo(0,document.body.scrollHeight
      )
  }

  componentWillUnmount(){
    //发送请求更新消息的未读状态
    const from = this.props.match.params.userid;
    const to = this.props.user._id
    this.props.readMsg(from,to)
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({
      isShow
    })
    if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'),0)
      })
    }
  }

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();

    //发送请求(发消息)
    if(content){
      this.props.sendMsg({from,to,content})
    }
    this.setState({
      content: '',
      isShow: false
  })
  }


  render() {

    const {user} = this.props;
    const {users,chatMsgs} = this.props.chat

    

    //计算当前聊天的chatId
    const meId = user._id
    if(!users[meId]){
      return null  
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId,targetId].sort().join("_")
    //对chatMsgs进行过滤(我发给对方的和对方发给我的)
    const msgs = chatMsgs.filter(msg=>msg.chat_id === chatId)

    //得到目标用户的header头像
    const targetHeader = users[targetId].header

    return (
      <div id='chat-pagtoe'>
        <NavBar 
        icon={<Icon type="left"/>} 
        className='sticky-header'
        onLeftClick={()=> this.props.history.goBack()}
        >{users[targetId].username}
         
        </NavBar>
        <List style={{marginBottom: 50,marginTop: 50}}>
          {/* alpha left right top bottom scale scaleBig scaleX scaleY */}
          <QueueAnim type="bottom" delay={100}>
          {
            msgs.map(msg => {
              if(meId===msg.to){  //对方发给我的
                return (
                <Item key={msg._id} thumb={targetHeader? targetHeader: null} extra=' 对面'>
                  {msg.content}
                </Item>
              )
              }else{ //我发给对方的
                return (
                <Item
                  key={msg._id}
                  className='chat-me' extra=' 我'>
                  {msg.content}
                </Item>
                )
              }
            })
          }
          </QueueAnim>  
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder=" 请输入"
            value = {this.state.content}
            onChange = {val => this.setState({content: val})}
            onFocus = {()=>this.setState({isShow:false})}
            extra={
              <span>
                <span onClick={this.toggleShow}>😊</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
          {this.state.isShow ? (
          <Grid
            data={this.emojis}
            columnNum={8}
            carouselMaxRow={4}
            //是否显示轮播
            isCarousel={true}
            onClick={(item)=>{
              this.setState({content: this.state.content + item.text})
            }}
          >
          </Grid>): null}
          
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user,chat: state.chat}),
  {sendMsg,readMsg}
)(Chat)