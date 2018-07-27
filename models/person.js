const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const url = 'mongodb://jokkeli:perse1@ds121371.mlab.com:21371/fsopuhelinluettelo'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person