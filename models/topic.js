var mongoose = require('mongoose')
var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog');

var topicSchema = new Schema({
  title: {//标题
		type: String,
		required: true
	},
	content: {//内容
		type: String,
		required: true
	},
	author: {//作者
		type: String,
		required: true
	},
	reated_time: {//创建时间
	  type: Date,
	  default: Date.now
	},
	picture: {
		type: String,
		default: "/public/images/yuantiao.jpg"
	}
	
})

module.exports = mongoose.model('Topic', topicSchema)