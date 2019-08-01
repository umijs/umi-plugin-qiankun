const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.get(
  '/*',
  proxy({
    target: 'http://localhost:8000/',
    ws: true,
  }),
);

app.listen('3000', () => {
  console.log('proxy server start,enjoy!');
});
