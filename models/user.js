var mongoose = require('mongoose')
var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog');

var userSchema = new Schema({
  email :{
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {//创建时间
    type: Date,
    //注意这里不要写Date.now(),因为会直接调用
    //这里给了一个方法：Date.now
    //当你去 new Model时候，如果你没有传递 create_time，则mongoose就会调用default指定的Date.now的返回值做默认值
    default: Date.now
  },
  last_modified_time: {//修改时间
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-max-img.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1,0,1],//枚举
    default: -1
  },
  birthday: {
    type: Date
  },
  //状态
  status: {
    type: Number,
    //0-没有权限限制、1-不可以可以评论、2-可以登录使用、
    default: 0,
    enum: [0, 1, 2]
  }
})

module.exports = mongoose.model('User', userSchema)