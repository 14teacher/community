// var express = require('express')
var Topic2 = require('../models/topic2')
// var template = require('art-template')

// var router = express.Router()

module.exports = function (data1){
	
	 Topic2.find(function(err, data){
		 if(err){
			 console.log(err)
		 }else{
			 // resolve(data)
			 return data
		 }
	 }).then(data=>{
		 // console.log(data)
		 data1 = data
		 console.log(data1)
	 });
	
	// return 'data1'
}



