var express = require('express');
var app = express();
app.configure(function(){
  app.set('view engine', 'jade');//load the Jade library
  app.use(express.static(__dirname + '/public'));
});
app.get('/', function(req, res){
  res.render("index.jade", {layout:false});
});
app.listen(8080);






/*var http = require('http');

var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');
console.log('hgjhj')*/