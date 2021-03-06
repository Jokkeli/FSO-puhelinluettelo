const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

const formatPerson = person => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

app.get("/api/", (req, res) => {
  console.log({ response });
  res.send("<h1>Tervetuloa puhelinluettelon takapäähän.</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log({ response });
  Person.find({})
    .then(persons => {
      response.json(persons.map(formatPerson));
    })
    .catch(error => {
      console.log(error);
      response.status(404).end();
    });
});

app.get("/api/info", (req, res) => {
  console.log({ response });
  const tietoja = persons.length;
  const date = new Date();
  res.send(
    "puhelinluettelossa on " + tietoja + " henkilön tiedot <br><br>" + date
  );
});

app.get("/api/persons/:id", (request, response) => {
  console.log({ response });
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  console.log({ response });
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => {
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (body.name === "" || body.number === "") {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(formatPerson(savedPerson));
  });
});

const error = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
