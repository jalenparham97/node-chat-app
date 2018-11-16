'use strict'
const socket = io()

socket.on('connect', () => {
  console.log('Connect to Server')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
})

socket.on('newMessage', message => {
  const time = moment(message.createdAt).format('h:mm A')
  const template = $('#message-template').html()
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: time
  })

  $('#messages').append(html)
})

socket.on('newLocationMessage', message => {
  const time = moment(message.createdAt).format('h:mm A')
  const template = $('#location-template').html()
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: time
  })

  $('#messages').append(html)
})

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()

  const messageTextbox = document.querySelector('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.value
  }, () => {
    messageTextbox.value = ''
  })
})

const locationButton = document.getElementById('send-location')

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser')

  locationButton.setAttribute('disabled', 'disabled')
  locationButton.innerHTML = 'Sending Location...'

  navigator.geolocation.getCurrentPosition(position => {
    locationButton.removeAttribute('disabled')
    locationButton.innerHTML = 'Send Location'
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, () => {
    locationButton.removeAttribute('disabled')
    alert('Unable to get location')
  })
})
