import React, { Component } from 'react'
import {List,Grid} from 'antd-mobile'

export default class HeaderSelector extends Component {
  
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


  render() {
    const listHeader = '请输入头像'
    return (
      <List renderHeader={()=> listHeader}>
        <Grid data={this.headerList} columnNum={5}>

        </Grid>
      </List>
    )
  }
}
