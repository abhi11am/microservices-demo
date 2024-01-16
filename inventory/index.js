const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
  res.json({ message: 'Inventory Microservice', user: req.user });
});

app.listen(port, () => {
  console.log(`Inventory Microservice listening at http://localhost:${port}`);
});