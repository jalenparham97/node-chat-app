const moment = require('moment')

// const date = moment()

// date.add(100, 'years').subtract(9, 'months')
// console.log(date.format('llll'))
const someTimestamp = moment().valueOf()
console.log(someTimestamp)

const createdAt = 1234
const date = moment(someTimestamp)
console.log(date.format('h:mm a'))
