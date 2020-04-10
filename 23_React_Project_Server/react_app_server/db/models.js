/*
    包含n个操作数据库集合数据的Model模块
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gzhipin');

const conn = mongoose.connection;

conn.on('connected',()=>{
    console.log("success")
});


const userSchema = mongoose.Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},
    type: {type: String,required: true},
    header: {type:String}, //头像名称
    post: {type: String}, //职位
    info: {type: String}, //个人或者职位简介
    company: {type:String}, //公司名字
    salary: {type: String} //月薪
});

const UserModel = mongoose.model("user",userSchema);

exports.UserModel = UserModel;
//COMMONJS
// 一次
//module.exports = xxx
//    多次
// exports.xxx = value

