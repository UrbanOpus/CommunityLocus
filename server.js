var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 2403,
  db: {
    host: 'oceanic.mongohq.com',
    port: 10088,
    name: 'CommunityLocus_Database',
    credentials: {
      username: 'ben',
      password: 'mongoPassword'
    }
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
