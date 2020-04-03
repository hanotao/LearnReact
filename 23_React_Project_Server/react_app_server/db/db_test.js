/*
使用 mongoose 操作 mongodb 的测试文件
1. 连接数据库
1.1. 引入 mongoose
1.2. 连接指定数据库 (URL 只有数据库是变化的 )
1.3. 获取连接对象
1.4. 绑定连接完成的监听 ( 用来提示连接成功 )
2. 得到对应特定集合的 Model
2.1. 字义 Schema( 描述文档结构 )
2.2. 定义 Model( 与集合对应 , 可以操作集合 )
3. 通过 Model 或其实例对集合数据进行 CRUD 操作
3.1. 通过 Model 实例的 save() 添加数据
3.2. 通过 Model 的 find()/findOne() 查询多个或一个数据
3.3. 通过 Model 的 findByIdAndUpdate() 更新某个数据
3.4. 通过 Model 的 remove() 删除匹配的数据
*/
const md5 = require('blueimp-md5')

// 1.1. 引入 mongoose
const mongoos = require('mongoose');

// 1.2. 连接指定数据库 (URL 只有数据库是变化的 )
mongoos.connect('mongodb://localhost:27017/gzhipin_test2');

//1.3.获取连接对象
const conn = mongoos.connection;

//1.4 绑定连接完成得监听(用来提示连接成功)
conn.on('connected',function () {
    console.log("数据库连接成功")
});

// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema( 描述文档结构 )
const userSchema = mongoos.Schema({
    username: {type: String,required: true},
    password: {type: String,required: true},
    type: {type: String,required: true}
});

//2.2定义Model(与集合对应，可以操作集合) -->构造函数
const UserModel = mongoos.model('user',userSchema);

//CRUD
// 3.1 通过Model实例的save()添加数据
function testSave() {
//    user数据对象
    const user = {
        username: 'Bob',
        password: md5('234'),
        type: 'laoban',
    };
    const userModel = new UserModel(user);
    userModel.save(function (err,user) {
        console.log('save',err,user)
    })
}

// 3.2. 通过 Model 的 find()/findOne() 查询多个或一个数据
function testFind() {
    //查找多个
    UserModel.find(function (err,users) {
        console.log('find()',err,users)
    });
    //查找一个
    UserModel.findOne({_id: '5e856071e4e2a43cc88c30dd'})
}
// testSave()

testFind();