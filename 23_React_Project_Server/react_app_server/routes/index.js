var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')

const UserModel = require('../db/models').UserModel;
const filter = {password:0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/register',function (req,res) {
//   // 1.获取请求参数
//   const {username,password} = req.body;
//   // 2.处理
//   if(username==='admin'){
//     //注册失败
//     res.send({code: 1,msg: "此用户已存在"})
//   }else{
//     //注册成功
//     res.send({code: 0,data: {_id:'abc123',username,password}})
//   }
// });

//注册路由
router.post('/register',function (req,res) {
//读取请求参数
  const {username,password,type} = req.body;

//处理
  //判断用户是否存在，存在返回错误信息
  UserModel.findOne({username},function (err,user) {
    //如果user有值(已存在)
    if(user){
      res.send({code: 1,msg: '此用户已存在'})
    }else{
      new UserModel({username,password: md5(password),type}).save(function (error,user) {
        res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
        const data = {username,type,_id:user._id};
        //返回数据
        res.send({code: 0,data,msg:'注册成功'})
      })
    }
  });
});


//登录路由
router.post('/login',function (req,res) {
  const {username,password} = req.body;
  //查询判断
  UserModel.findOne({username,password:md5(password)},filter,function (err,user) {
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
      res.send({code: 0,data: user})
    }else{
      res.send({code: 1,msg: '用户名或者密码不正确'})
    }
  })
});

module.exports = router;
