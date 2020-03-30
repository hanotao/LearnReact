import React from "react"
import ReactDOM from "react-dom"

import store from './redux/store'
import App from "./components/app"



const  render= () => {
  ReactDOM.render(<App store={store}/>,document.getElementById('root'))
}

render()

store.subscribe(render)