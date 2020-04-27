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



const chartScheme = mongoose.Schema({
    from: {type: String,required: true},  //发送用户的id
    to: {type: String,required: true},  //接收用户的id
    chat_id : {type: String,required: true},    //from 和 to组成的字符串
    content: {type: String,required: true},     //内容
    read: {type: Boolean,default: false},   //标识是否已读
    create_time: {type: Number} //创建时间
});

const ChatModel = mongoose.model("chat",chartScheme);
exports.UserModel = UserModel;
exports.ChatModel = ChatModel;


//COMMONJS
// 一次
//module.exports = xxx
//    多次
// exports.xxx = value


