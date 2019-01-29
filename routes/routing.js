'use strict';

const saveBuzzWords = require('../save-buzz-words');
const express = require('express');
const router = express.Router();
const buzzRouter = require('./buzz-words');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    res.send(data);
  });
});

router.get('/about', (req, res) => {
  res.send('What ABOUT me?');
});

// stop tracking all buzzwords
router.post('/reset', urlEncoded, (req, res) => {
  
});

module.exports = router;