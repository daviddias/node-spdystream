var frameType = require('./frameType')

exports = module.exports

exports.synStream = function (version, flags, streamId, associateToStreamId, priority, keyValuePairs) {

  var bodyBufferTop = new Buffer(10)
  bodyBufferTop.writeUInt32BE(streamId.toString(16) & 0x7fffffff, 0)
  bodyBufferTop.writeUInt32BE(associateToStreamId.toString(16) & 0x7fffffff, 4)
  bodyBufferTop.writeUInt16BE(priority.toString(16) & 0xe000, 8)

  var bodyBufferBottom = keyvalues(keyValuePairs)

  var bodyBuffer = Buffer.concat([
    bodyBufferTop,
    bodyBufferBottom
  ])

  var headerBuffer = controlHeader(version, frameType.toNum('SYN_STREAM'), flags, bodyBuffer.length)

  var frameBuffer = Buffer.concat([
    headerBuffer,
    bodyBuffer
  ])

  return frameBuffer
}

function controlHeader (version, type, flags, length) {
  var buf = new Buffer(8)
  var n = 3

  console.log('version: ', 0x80 | n.toString(16))

  buf.writeUInt8(0x80 | version.toString(16), 0)
  buf.writeUInt8(type.toString(16), 1)
  buf.writeUInt32BE(length.toString(16) & 0x00ffffff, 2)
  buf.writeUInt8(flags.toString(16), 2)
  return buf
}

function keyvalues (kvp) {
  if (Object.keys(kvp).length === 0) {
    var buf = new Buffer(4)
    buf.writeUInt32BE(0, 0)
    return buf
  }

}
/*
function dataHeader () {

}
*/

