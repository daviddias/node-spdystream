var tcp = require('net')
var spdystream = require('./../lib')

var socket = tcp.connect(9090, function () {
  var conn = new spdystream.Connection(socket, true)
  conn.createStream({}, null, 0, function (stream) {
    console.log('got stream')
  })
})
