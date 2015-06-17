exports = module.exports

exports.toStr = function (num) {
  var val
  switch (num) {
    case 1:
      val = 'SYN_STREAM'
      break
    case 2:
      val = 'SYN_REPLY'
      break
    case 3:
      val = 'RST_STREAM'
      break
    case 4:
      val = 'SETTINGS'
      break
    case 5:
      val = ''
      break
    case 6:
      val = 'PING'
      break
    case 7:
      val = 'GOAWAY'
      break
    case 8:
      val = 'HEADERS'
      break
    case 9:
      val = 'WINDOW_UPDATE'
      break
  }
  return val
}

exports.toNum = function (str) {
  var val
  switch (str) {
    case 'SYN_STREAM':
      val = 1
      break
    case 'SYN_REPLY':
      val = 2
      break
    case 'RST_STREAM':
      val = 3
      break
    case 'SETTINGS':
      val = 4
      break
//    case '':
//      val = 5
//      break
    case 'PING':
      val = 6
      break
    case 'GOAWAY':
      val = 7
      break
    case 'HEADERS':
      val = 8
      break
    case 'WINDOW_UPDATE':
      val = 9
      break
  }
  return val
}
