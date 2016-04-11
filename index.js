const express=require('express');
var app=express();
app.use(express.static(__dirname+'/public'));
// app.get('/',function(req,res){
// 	res.send('hello world');
// });
// app.all('/secret',function(req,res,next){
// 	console.log('Accessing the secret section ...');
// 	//res.send('哈哈哈');
// 	res.send('sd');
// 	next();
// },function(req,res){
// 	console.log('app2');
// 	res.end('o.o');
// });
app.listen('8080');