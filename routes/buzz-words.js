'use strict';

const saveBuzzWords = require('../save-buzz-words');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const urlEncoded = bodyParser.urlencoded({ extended: false});

// get the buzzwords from POST requests, store them as their own objects.
// have an array of objects (buzzwords) that you can send when the client requests with GET.

// the file directory in this file is relative to /buzzwords
// the path '/buzzwords' is set to '/' here because of app.use('/buzzwords', buzzwords);

router.get('/', (req, res) => {
  res.send(saveBuzzWords);
});

router.post('/', urlEncoded, (req, res) => {
  let alreadyExists = false;
  let success = false;

  saveBuzzWords.forEach(buzz => {
    if (buzz['buzzWord'] === req.body['buzzWord']) {
      alreadyExists = true;
    }
  });

  if (!alreadyExists) {
    alreadyExists = true; 
    success = true;

    saveBuzzWords.push(req.body);
  }

  res.send({ "success": success });
  return success;
});

module.exports = router;
