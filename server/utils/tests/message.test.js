const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('../message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Jason'
    let text = 'Some message'
    let message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({ from, text })
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Jen'
    let latitude = 10
    let longitude = 15
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`
    let message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message.from).toEqual(from)
    expect(message.url).toEqual(url)
  })
})