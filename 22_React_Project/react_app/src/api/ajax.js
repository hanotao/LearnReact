/*
  能发送ajax的函数模块
  函数的返回值是promise对象
*/
import axios from 'axios'

export default function ajax(url,data={},method='GET'){
  if(method==='GET'){
    let paramStr = '';
    Object.keys(data).forEach(key=>{
      paramStr += key + '=' + data[key] + '&'
    })
    if(paramStr){
      paramStr = paramStr.substring(0,paramStr.length-1)
    }
    return axios.get(url+'?'+paramStr)
  }else if(method==='POST'){
    return axios.post(url,data)
  }
}