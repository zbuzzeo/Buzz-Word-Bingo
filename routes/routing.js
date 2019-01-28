'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    res.send(data);
  });
});

router.get('/about', (req, res) => {
  res.send('What ABOUT me?');
});

module.exports = router;