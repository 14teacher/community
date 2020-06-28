var express = require('express')
var User = require('./models/user')
var Topic = require('./models/topic')
var Topic2 = require('./models/topic2')
var md5 = require('blueimp-md5')
var template = require('art-template')

var topic2 = require('./js/router_topic2.js')

//路由容器
var router = express.Router()


router.get('/', function(req, res){
	
	Topic.find().then(function(data1){
		if(data1){
			Topic2.find().then(function(data2){
						return res.render('index.html', {
						user: req.session.user,
					  comments: data1,
						topic2_data: data2
					})
			})
		}
	})
	
 // Topic.find(function(err, data){
	//  if(err){
	// 	 console.log(err)
	//  }else{
	// 	 return res.render('index.html', {
	// 	   user: req.session.user,
	// 	 	 comments: data,
	// 		 topic2_data: {}
	// 	 })
	//  }
 // });

})

router.get('/login', function(req, res){

  res.render('login.html')
})

router.post('/login', function(req, res, next){
  //获取表单数据
  //查询数据库，用户名密码是否正确
  //发送响应数据
  var body = req.body
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  },function(err,user){
    if(err){
      return next(err)
    }

  if(!user){
    return res.status(200).json({
      err_code: 1,
      message: 'Email or password is invalid.'
    })
  }
  //判定用户存在，登录成功，通过Session记录登录状态
  req.session.user = user

  res.status(200).json({
    err_code: 0,
    message: 'OK'
  })
})
})

router.get('/register', function(req, res){

  res.render('register.html')
})


router.post('/register', async function(req, res,next){
  var body = req.body

  try{
    //await说明异步操作
    if(await User.findOne({email: body.email})){
     return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }
    if(await User.findOne({nickname: body.nickname})){
      return res.status(200).json({
         err_code: 2,
         message: '昵称已存在'
       })

     }
     body.password = md5(md5(body.password)) 

     var user = await new User(body).save()
     req.session.user = user
     //注册成功，使用Session记录用户的登录状态
     res.status(200).json({
      err_code: 0,
      message: 'OK'
    }) 

  }catch(err){
    // return res.status(500).json({
    //   err_code: 500,
    //   message: '服务端错误'
    // })
    return next(err)
  }
 
})

router.get('/logout', function(req, res){
  //清除登录状态
  req.session.user = null
  //重定向到登录页面
  res.redirect('/login')
})

router.get('/topics/new', function(req, res){

  res.render('topic/new.html')
})

router.get('/publish', function(req, res){

  res.render('publish.html')
})


router.post('/publish', async function(req, res, next){
  var body = req.body
	body.author = req.session.user.nickname
	// body.author = "无敌123"
	body.picture = req.session.user.avatar
	
  try{
    //await说明异步操作
    if(await Topic.findOne({title: body.title})){
     return res.status(200).json({
        err_code: 1,
        message: '话题已存在'
      })
    }

     await new Topic(body).save()
 
     res.status(200).json({
      err_code: 0,
      message: 'OK'
    }) 
  }catch(err){
    return next(err)
  }
 
})



router.get('/content', function(req, res){

  res.render('content.html')
})
// 发表话题
router.get('/topic', function(req, res){
	
  res.render('topic_post.html')
})

router.post('/topic', async function(req, res, next){
  var body = req.body
  try{
     await new Topic2(body).save()
 
     res.status(200).json({
      err_code: 0,
      message: 'OK'
    }) 
  }catch(err){
    return next(err)
  }
 
})


module.exports = router
