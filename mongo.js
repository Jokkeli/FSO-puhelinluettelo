const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
 
const url = process.env.MONGODB_URL
console.log("url");

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if (process.argv[2] !== undefined) {
    const person =   new Person ({
        name: process.argv[2],
        number: process.argv[3]
    })

    person
        .save()
        .then(response => {
            console.log('lisätään henkilö '+process.argv[2] + " numero " + process.argv[3]+ " luetteloon")
            mongoose.connection.close()
        })

} else {
    Person
    .find({})
    .then(result => {
        console.log("puhelinluettelo:")
      result.forEach(person => {
        console.log(person.name + " " + person.number)
      })
      mongoose.connection.close()
    })
  
}



/* note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  }) */