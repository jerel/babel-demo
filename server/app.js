#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');

var httpServer = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    fs
});

httpServer.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var fileServer = http.createServer(function(request, response) {
    console.log((new Date()) + ' File server received request for ' + request.url);
    var path = request.url;
    if (request.url === '/') {
      path = '/index.html';
    }

    fs.readFile(__dirname + '/../app' + path, function(err, data) {
      if ( ! err) {
        response.writeHead(200);
        response.end(data);
      }
    });
});

fileServer.listen(8001, function() {
    console.log((new Date()) + ' File server is listening on port 8001');
});


var dispatcher = {
  listeners: {},
  register: function(key, callback) {
    this.listeners[key] = callback;
  },
  emit: function(message) {
    for (var key in this.listeners) {
      this.listeners[key](message);
    }
  },
  unregister: function(key) {
    delete this.listeners[key];
  },
};

var clients = 0;


var server = new WebSocketServer({
  httpServer: httpServer,
});

server.on('request', function(request) {
  var socket = request.accept(null, request.origin);
  clients++;
  socket.uid = clients;
  dispatcher.register(socket.uid, socket.sendUTF.bind(socket));

  socket.on('message', function(message) {
    if (message.type === 'utf8') {
      dispatcher.emit(message.utf8Data);
    }
  });

  socket.on('close', function() {
    dispatcher.unregister(socket.uid);
  });

});
