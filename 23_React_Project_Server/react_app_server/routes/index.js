var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')

const UserModel = require('../db/models').UserModel;
//过滤
const filter = {password:0};
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


router.post('/update',function (req,res) {

  //从请求得到userid
  const userid = req.cookies.userid;
  if (!userid){
    return res.send({code: 1,msg: '请先登录'})
  }

  //得到提交的用户数据
  const user = req.body;
  UserModel.findByIdAndUpdate({_id:userid},user,function (error,oldUser) {
    if(!oldUser){
      //  通知浏览器删除userid
      res.clearCookie("userid");
      //  返回一个提示信息
      res.send({code: 1,msg: '请先登录'})
    }else{
      //准备一个返回的user对象
      const {id,username,type} = oldUser;
      const data = Object.assign(user,{id,username,type});
      res.send({code: 0,data: data})
    }
  })
});


//获取用户信息的路由,根据cookie中的userid
router.get('/user',function (req,res) {

  const userid = req.cookies.userid;
  //如果不存在，直接返回一个提示信息
  if(!userid){
    return res.send({code: 1,msg: '请先登录'})
  }
  //根据userid 查询对应的user
  UserModel.findOne({_id:userid},filter,function(error,user){
    res.send({code: 0,data: user})
    })
});

//获取用户列表，根据类型
// '/userlist:type'  -->param
router.get('/userlist',function (req,res) {
  //获取请求的参数
  const {type} = req.query;
  UserModel.find({type},filter,function (err,users) {
    res.send({code: 0,data: users})
  })
});


//获取当前用户的所有相关聊天信息
router.get('/msglist',function (req,res) {
  //获取 cookid中的userid
  const userid = req.cookies.userid;
  //得到所有的user文档数组
  UserModel.find(function (err,userDocs) {
    //用对象存储所有的user信息，key为user的_id,val为name和header组成的user对象
    // const users = {};
    // userDocs.forEach(doc => {
    //   users[doc._id] = {username: doc.username,header: doc.header}
    // })
    const users = userDocs.reduce((users,user) => {
      users[user._id] = {username: user.username,header: user.header}
      return users
    },{});
    /*
    查询userid相关的所有聊天信息
      参数1:查询条件
      参数2:过滤条件
      参数3: 回调函数
    */
    ChatModel.find({'$or':[{from: userid},{to: userid}]},filter,function (err,chatMsgs) {
      res.send({code: 0,data: {users,chatMsgs}})
    })
  });

  router.post('/readmsg',function (req,res) {
    const from = req.body.from;
    const to = req.cookies.userid
    /*
    更新数据库中的chat数据
    参数1：查询条件
    参数2：更新为指定的数据对象
    参数3：是否1次更新多条，默认只更新一条
    参数 4：更新完成的回调函数
   */
    ChatModel.update({from,to,read: false},{read: true},{multi: true},function (err,doc) {
      res.send({code: 0,data: doc.noModified})
    })
  })


});

module.exports = router;
