var tcp = require('net')
var spdystream = require('./../lib')

tcp.createServer(function (socket) {
  var conn = new spdystream.Connection(socket, true)
}).listen(9090)
