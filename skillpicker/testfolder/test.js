const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  fetch('http://backend:3001')
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching posts');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
