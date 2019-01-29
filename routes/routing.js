'use strict';

let saveBuzzWords = require('../save-buzz-words');
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
  let success = false;
  let message = 'Reset must be set to true!';

  if (req.body.reset === 'true') {
    success = true;
    message = 'All buzzwords are no longer being tracked.';

    saveBuzzWords.splice(0, saveBuzzWords.length);
  }

  res.send({ "message": message, "success": success });
  return success;
});

module.exports = router;