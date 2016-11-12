var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var translation = require('./routes/translation');

var app = express(),
  server = http.createServer(app);

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);




var socketApp = require('express').createServer();
var io = require('socket.io')(socketApp);
socketApp.listen(7575);


io.on('connection', function (socket) {
  console.log("Conection...");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-User');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});





// app.use('/', routes);
// app.use('/users', users);

app.get('/', function (req, res) {
  res.send('root')
});
app.post('/text/translate', translation.translateText);





app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port =  process.env.PORT || 7272; //Was running on port 7275 bc 8888 is used commonly by local rest clients and proxy.
server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});

module.exports = app;
