'use strict'
const socket = io()

socket.on('connect', () => {
  console.log('Connect to Server')

  socket.emit('createMessage', {
    to: 'Jalen',
    text: 'This is Juile'
  })
})

socket.on('newMessage', message => {
  console.log('New Message', message)
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})
