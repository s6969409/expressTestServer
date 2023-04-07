var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testingAS';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req,) {
  ws.on('message', function(msg) {
    console.log(msg)
    const ss = expressWs.getWss().clients
    ss.forEach((client) => {
      client.send(`Broadcast message: FeedBack`);
    });
    
  });
  console.log('socket', req.testing);
});

app.listen(4000);
