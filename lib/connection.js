var read = require('async-buffered-reader')
var parser = require('./frames/parser')
var baker = require('./frames/baker')

exports = module.exports = Connection

function Connection (socket, isServer, newStreamCallback) {
  var self = this
  var streamId = isServer ? 2 : 1

  self.createStream = function (httpHeader, parent, fin, callback) {
    var frame = baker.synStream(3, 0, streamId, 0, 5, {})
    streamId += 2
    console.log('ready to write')
    socket.write(frame)
  }

  nextFrame()

  function nextFrame () {
    read(socket, 8, handleFrame)
  }

  function handleFrame (bufferHeader) {
    var header = parser.header(bufferHeader)
    console.log(header)
    switch (header.type) {
      case 'SYN_STREAM':
        read(socket, header.length, function (buffer) {
          var body = parser.synStream(buffer)
          handleSynStream(header, body)
        })
        break
      case 'SYN_REPLY':
        read(socket, header.length, function (buffer) {
          var body = parser.synReply(buffer)
          handleSynReply(header, body)
        })
        break
      case 'RST_STREAM':
        break
      case 'SETTINGS':
        break
      case 'PING':
        break
      case 'GOAWAY':
        break
      case 'HEADERS':
        break
      case 'WINDOW_UPDATE':
        break
    }
  }

  function handleSynStream (header, body) {
    // reply with a SYN_REPLY
    console.log('header: ', header)
    console.log('body: ', body)
  }

  function handleSynReply (header, body) {

  }
}

