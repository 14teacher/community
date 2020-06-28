var mongoose = require('mongoose')
var Schema = mongoose.Schema

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog');

var topicSchema = new Schema({
  nickname: {//标题
		type: String,
		required: true
	},
	content: {//内容
		type: String,
		required: true
	},
	reated_time: {//创建时间
	  type: Date,
	  default: Date.now
	},
	
})

module.exports = mongoose.model('Topic2', topicSchema)