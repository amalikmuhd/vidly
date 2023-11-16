const Joi = require('joi');
const express = require('express');
const app = express();

// middleware
app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
  { id: 4, name: 'Fantasy' },
  { id: 5, name: 'Horror' },
  { id: 6, name: 'Mystery' },
  { id: 7, name: 'Romance' },
  { id: 8, name: 'Thriller' },
];

// Read All
app.get('/api/genres', (req, res) => {
  res.send(genres);
  res.end();
});

// Filter
app.get('/api/genres/:id', (req, res) => {
  const findIndex = genres.find((c) => c.id === parseInt(req.params.id));
  if (!findIndex) return res.status(404).send('No result found');
  res.send(JSON.stringify(findIndex));
});

// Create a genre
app.post('/api/genres', (req, res) => {
  // Validate
  const { error } = vidlySchema(req.body);
  // if invalid, return 400 - Bad Request
  if (error) return res.status(400).send(error.details[0].message);
  genres.push({
    id: genres.length + 1,
    name: req.body.name,
  });
  res.send(genres);
});

// Update a genre
app.put('/api/genres/:id', (req, res) => {
  const item = genres.find((c) => c.id === parseInt(req.params.id));

  // if not existing, return 404
  if (!marketplace) res.status(404).send('No result found');
  // Validate
  const { error } = vidlySchema(req.body);
  // if invalid, return 400 - Bad Request
  if (error) return res.status(400).send(error.details[0].message);

  genres[genres.indexOf(item)] = {
    name: req.body.name,
  };
  res.send(genres);
});

// Delete a genre
app.delete('/api/genres/:id', (req, res) => {
  // Lookup for id
  const item = genres.find((c) => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if (!item) return res.status(404).send('No result found');

  // remove the item
  genres.splice(genres.indexOf(item), 1);
  res.send(item);
});

const vidlySchema = (req) => {
  // validate the inputs
  const schema = {
    name: Joi.string().required(),
  };
  // return the either error or value
  return Joi.validate(req, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to PORT:${port}`);
});
