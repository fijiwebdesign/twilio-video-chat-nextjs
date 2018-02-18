/**
 * Chat service
 */
var Chat = function(host) {
  const wio = require('socket.io-client')
  this.ws = wio(host || 'http://localhost:3000/')
  //this.ws.setWorker('node_modules/socketio-shared-webworker/shared-worker.js')
  this.debug('Creating chat', host, this.ws)
}

Chat.prototype.debug = function() {
  console.log.apply(console, arguments)
  alert(arguments) // test
}

module.exports = Chat
