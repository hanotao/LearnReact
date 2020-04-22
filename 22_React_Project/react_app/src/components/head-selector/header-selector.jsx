import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  
  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon:null
  }

  constructor(props){
    // 准备需要显示的数据
    super(props)
    this.headerList = []
    for(let i=0;i<20;i++){
      this.headerList.push({
        text:'头像'+(i+1),
        icon: require(`../../assets/images/头像${i+1}.png`)
      })
    }
  }
  handleClick = ({text,icon}) =>{
    this.setState({icon})
    this.props.setHeader(icon)
  }


  render() {
    const {icon} = this.state
    const listHeader = !icon?'请输入头像':(<div>
      已选择头像：<img src={icon} alt=""/>
    </div>)
    return (
      <List renderHeader={()=> listHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}>

        </Grid>
      </List>
    )
  }
}
