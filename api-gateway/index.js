// api-gateway/index.js
const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Static Authentication Middleware (Always returns true)
const authenticate = (req, res, next) => {
  req.user = { id: 1, username: 'example_user' };
  next();
};

app.get('/', (req, res) => {
  res.json({ message: 'Microservice API Gateway', user: req.user });
});

// Proxy Middleware for Orders Microservice
const ordersProxyOptions = { 
  target: 'http://localhost:3001', 
  changeOrigin: true, 
  pathRewrite: {
    ['^/orders']: '/',
  } 
};
const ordersProxy = createProxyMiddleware('/orders', ordersProxyOptions);
app.use('/orders', ordersProxy);

// Proxy Middleware for Inventory Microservice
const inventoryProxyOptions = { 
  target: 'http://localhost:3002', 
  changeOrigin: true,
  pathRewrite: {
    ['^/inventory']: '/',
  }
};
const inventoryProxy = createProxyMiddleware('/inventory', inventoryProxyOptions);
app.use('/inventory', authenticate, inventoryProxy);

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
