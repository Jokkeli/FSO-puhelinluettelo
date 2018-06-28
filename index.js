const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

let persons = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
          },
          {
            "name": "Martti Tienari",
            "number": "040-123456",
            "id": 2
          },
          {
            "name": "Arto Järvinen",
            "number": "040-123456",
            "id": 3
          },
          {
            "name": "Lea Kutvonen",
            "number": "040-123456",
            "id": 4
          }
]

app.get('/', (req, res) => {
    res.send('<h1>Tervetuloa puhelinluettelon takapäähän.</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    Person
      .find({}, {__v: 0})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })
  })

  app.get('/api/info', (req, res) => {
    const tietoja = persons.length;
    const date = new Date();
    res.send('puhelinluettelossa on ' + tietoja + ' henkilön tiedot <br><br>' + date)
  })

  app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'name or number missing'})
  } 

  let isNew = true;
    
    persons.forEach(function(item, index, array) {
        if(item.name === body.name) {
            isNew = false;
        }
    });

    if (!isNew) {
      return response.status(400).json({error: 'name must be unique'})
    }

  const person = request.body
  const id = Math.floor(Math.random() * (100000000 - 0))
  person.id = id

  persons = persons.concat(person)
  response.json(person)
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
