const mongoose = require('mongoose')

const url = 'mongodb://jokkeli:perse1@ds121371.mlab.com:21371/fsopuhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: Date
})

module.exports = Person