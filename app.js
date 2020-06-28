var express = require('express')
var path = require('path')
var router = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')

var app = express()

//加载公共静态资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.use('/views/', express.static(path.join(__dirname, './views/')))
app.use('/css/', express.static(path.join(__dirname, './css/')))
app.use('/js/', express.static(path.join(__dirname, './js/')))
app.use('/fonts/', express.static(path.join(__dirname, './fonts/')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));

//在Express这个框架中，默认不支持Session 和 Cookie
//但是我们可以使用第三方中间件：express-session来解决
//添加Session数据：req.session.foo = 'bar'
//访问Session数据：req.session.foo
app.use(session({
  secret: 'keyboard cat',//加密字符串，在原有字符串的基础上加了这个keyboard cat。为了增加安全性，防止客户端而已伪造
  resave: false,
  saveUninitialized: true//无论你是否使用session，我都默认分配你一把钥匙
}))



//挂载路由容器
app.use(router)


//配置处理404的中间件.前面的没有匹配
app.use(function(req, res){
  res.render('404.html')
})
//发生错误的时候调用next(err),传递错误对象，然后就会被全局错误处理中间件匹配处理
//配置全局错误处理中间件
app.use(function(err, req, res, next){
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.listen(3000,function(){
  console.log('Running...3000')
})
