const express = require('express');
const app = express();
const port = 3000;

// Datos quemados de los contactos
const contacts = [
  { id: 1, Nombre: 'John', apellido: 'Doe', edad: 25, celular: '123-456-7890' },
  { id: 2, Nombre: 'Jane', apellido: 'Doe', edad: 28, celular: '123-456-7891' },
  { id: 3, Nombre: 'Jack', apellido: 'Smith', edad: 25, celular: '123-456-7892' },
  { id: 4, Nombre: 'Jill', apellido: 'Smith', edad: 30, celular: '123-456-7893' },
  { id: 5, Nombre: 'Bill', apellido: 'Gates', edad: 65, celular: '123-456-7894' },
  { id: 6, Nombre: 'Elon', apellido: 'Musk', edad: 50, celular: '123-456-7895' },
  { id: 7, Nombre: 'Mark', apellido: 'Zuckerberg', edad: 37, celular: '123-456-7896' },
  { id: 8, Nombre: 'Larry', apellido: 'Pedad', edad: 48, celular: '123-456-7897' },
  { id: 9, Nombre: 'Sergey', apellido: 'Brin', edad: 47, celular: '123-456-7898' },
  { id: 10, Nombre: 'Tim', apellido: 'Cook', edad: 60, celular: '123-456-7899' }
];

// Listar todos los contactos
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Filtrar por nombre o nombre y apellido
app.get('/contacts/filter', (req, res) => {
  const { Nombre, apellido } = req.query;
  let filteredContacts = contacts;

  if (Nombre) {
    filteredContacts = filteredContacts.filter(contact => contact.Nombre.toLowerCase() === Nombre.toLowerCase());
  }

  if (apellido) {
    filteredContacts = filteredContacts.filter(contact => contact.apellido.toLowerCase() === apellido.toLowerCase());
  }

  res.json(filteredContacts);
});

// Filtrar por edad
app.get('/contacts/edad/:edad', (req, res) => {
  const edad = parseInt(req.params.edad);
  const filteredContacts = contacts.filter(contact => contact.edad === edad);
  res.json(filteredContacts);
});

// Filtrar por cualquier término
app.get('/contacts/search/:term', (req, res) => {
  const term = req.params.term.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.Nombre.toLowerCase().includes(term) ||
    contact.apellido.toLowerCase().includes(term) ||
    contact.celular.includes(term)
  );
  res.json(filteredContacts);
});

// Mostrar versión y nombre del microservicio
app.get('/version', (req, res) => {
  res.json({
    serviceName: 'Contact Book Microservice',
    version: '1.0.0'
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Microservicio funcionando en http://localhost:${port}`);
});
