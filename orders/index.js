const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.json({ message: 'Orders Microservice', user: req.user });
});

app.listen(port, () => {
  console.log(`Orders Microservice listening at http://localhost:${port}`);
});
