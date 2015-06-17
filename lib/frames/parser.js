var frameType = require('./frameType')

exports = module.exports

exports.header = function (buffer) {
  var header = {
    control: (buffer.readUInt8(0) & 0x80) === 0x80,
    version: null,
    type: null,
    id: null,
    flags: buffer.readUInt8(4),
    length: buffer.readUInt32BE(4) & 0x00ffffff
  }

  if (header.control) {
    header.version = buffer.readUInt16BE(0) & 0x7fff
    header.type = frameType.toStr(buffer.readUInt16BE(2))
  } else {
    header.id = buffer.readUInt32BE(0) & 0x7fffffff
  }

  return header
}

exports.synStream = function (buffer) {
  var body = {
    streamId: buffer.readUInt32BE(0) & 0x7fffffff,
    associateToStreamID: buffer.readUInt32BE(4) & 0x7fffffff,
    priority: buffer.readUInt8(8) & 0xe0,
    // unsued: buffer.readUInt(8) & 0x1f, // not used by spec
    // slot: buffer.readUInt(9)
    kvp: keyvalues(buffer.slice(10))
  }

  return body
}

exports.synReply = function (buffer) {
  var body = {
    streamId: buffer.readUInt32BE(0) & 0x7fffffff,
    kvp: keyvalues(buffer.slice(4))
  }

  return body
}

function keyvalues (buffer) {
  var nValues = buffer.readUInt32BE()
  if (nValues === 0) {
    return {}
  }
  // var offset = 4

  // for (var i = 4 ; i < nValues ; i++) {
  // }
}
