//canvas-test server

var Router = require('easy-router');

var port = 8080;

Router()
  .setMap('**/*', '**/*')
  .listen(port);

console.log('http://127.0.0.1:' + port + '/index.html');
