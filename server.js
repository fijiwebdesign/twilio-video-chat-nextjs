const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const debug = require('debug')('chat:server:chat')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

const PORT = process.env.PORT || 4000

const chatApp = require('./server.chat')
chatApp(app)

// fake DB
const messages = []

// socket.io server
io.on('connection', socket => {
  debug('new chat connection', socket.id)
  socket.on('message', (data) => {
    debug('new chat msg', socket.id, data)
    messages.push(data)
    socket.broadcast.emit('message', data)
  })
})

nextApp.prepare().then(() => {
  app.get('/messages', (req, res) => {
    res.json(messages)
  })

  app.use(express.static('./'))

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    const addr = server.address()
    console.log('> Ready on ' + addr.address + ':' + addr.port)
  })
})
