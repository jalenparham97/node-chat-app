const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const public = path.join(__dirname, '../public')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(public))

io.on('connection', (socket) => {
  console.log('New User Connected')

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  })

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', message => {
    console.log('createMessage', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
