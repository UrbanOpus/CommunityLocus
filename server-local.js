var deployd = require('deployd');

var server = deployd({
  port: 2403,
  db: {
  port: 27017,
  host: '127.0.0.1',
  name: 'deployd'
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening");
});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});
