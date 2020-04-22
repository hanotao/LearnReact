import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from "prop-types"
import {withRouter} from 'react-router-dom'

import './nav-footer.css'

const Item = TabBar.Item
class NavFooter extends Component {
  
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }

  render() {
    let {navList,unReadCount} = this.props;
    //过滤掉hide为true的nav
    navList = navList.filter(nav => !nav.hide)

    const path = this.props.location.pathname; //路由组件才有
    //在非路由组件中使用路由库的api? withRoute()

    return (
      <TabBar>
        {
          navList.map((nav,index)=>(
            <Item key={index}
                  badge={nav.path==='/message'?unReadCount:0}
                  title={nav.text}
                  icon={{uri:require(`../../assets/nav/${nav.icon}.png`)}}
                  selectedIcon={{uri:require(`../../assets/nav/${nav.icon}-selected.png`)}}
                  selected={path === nav.path}
                  onPress={()=>this.props.history.replace(nav.path)}
            />
          ))
        }
      </TabBar>  
    )
  }
}

export default withRouter(NavFooter) //向外暴露witehRoute()包装产生的组件
