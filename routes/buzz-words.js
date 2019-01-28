'use strict';

const saveBuzzWords = require('../save-buzz-words');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({ extended: false});

// get the buzzwords from POST requests, store them as their own objects.
// have an array of objects (buzzwords) that you can send when the client requests with GET.

// the file directory in this file is relative to /buzzwords
// the path '/buzzwords' is set to '/' here because of app.use('/buzzwords', buzzwords);

router.get('/', (req, res) => {
  res.send(saveBuzzWords);
});

// POST request helper:
// validates that an object with the same buzzword does not already exist in the array.
const foundMatch = (checkObj) => {
  if (typeof checkObj !== 'object') {
    throw new Error('checkObj expected an object');
  }

  let detected = false;

  saveBuzzWords.forEach(buzz => {
    if (buzz['buzzWord'] === checkObj['buzzWord']) { detected = true; }
  });

  return detected;
}

router.post('/', urlEncoded, (req, res) => {
  let success = false;

  // if an object hasn't been created yet...
  if (!foundMatch(req.body)) {
    success = true;
    saveBuzzWords.push(req.body);
  }

  res.send({ "success": success });
  return success;
});

router.put('/', urlEncoded, (req, res) => {
  let alreadyExists = false;
  let success = false;

  

  res.send({ "success": success });
  return success;
});

module.exports = router;
