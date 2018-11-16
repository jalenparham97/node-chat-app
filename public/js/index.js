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
  // const li = $('<li></li>')
  // li.text(`${message.from}: ${message.text}`)

  // $('#messages').append(li)
  const ol = document.getElementById('messages')
  const li = document.createElement('li')

  li.innerHTML = `${message.from}: ${message.text}`

  ol.appendChild(li)
})

socket.on('newLocationMessage', message => {
  // const li = $('<li></li>')
  // const a = $('<a target="_blank">My Current Location</a>')
  
  // li.text(`${message.from}: `)
  // a.attr('href', message.url)
  // li.append(a)
  // $('#messages').append(li)
  const li = document.createElement('li')
  const a = document.createElement('a')
  const ol = document.getElementById('messages')
  li.innerHTML = `${message.from}: `
  a.innerHTML = 'My Current Location'
  a.setAttribute('href', message.url)
  a.setAttribute('target', '_blank')
  li.append(a)
  ol.appendChild(li)
})

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector('[name=message]').value
  }, () => {
    
  })
})

const locationButton = document.getElementById('send-location')

locationButton.addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser')

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, () => {
    alert('Unable to get location')
  })
})
