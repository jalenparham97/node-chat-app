'use strict'
const socket = io()

socket.on('connect', () => {
  console.log('Connect to Server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', message => {
  console.log('New Message', message)
  const li = $('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  $('#messages').append(li)
})

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('[name=message]').value
  }, () => {
    
  })
})
