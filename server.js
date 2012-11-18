#!/usr/bin/env node

var Dennis = require("./index"),
    dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function(message) {
  var parser = new Dennis.Parser();

  parser.on("data", function(e) {
    console.log(e);
  });

  parser.write(message);
});

server.on("listening", function() {
  console.log("Listening...");
});

server.bind(53);
