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
    if (buzz['buzzWord'] === checkObj['buzzWord']) { 
      detected = true; 
    }
  });

  return detected;
}

router.post('/', urlEncoded, (req, res) => {
  if (saveBuzzWords.Length > 4) {
    res.send({ "Error": "Too many buzzwords!" });
  }

  let success = false;
  let message = `That resource already exists!`;

  // if an object hasn't been created yet...
  if (!foundMatch(req.body)) {
    success = true;
    message = `New buzzword '${req.body['buzzWord']}' is being tracked.`;
    saveBuzzWords.push(req.body);
  }

  res.send({ "message": message, "success": success });
  return success;
});

router.put('/', urlEncoded, (req, res) => {
  let success = false;
  let message = 'Error: Attempt to update buzzword that isn\'t being tracked.';

  // if an object already exists...
  if (foundMatch(req.body)) {
    success = true;

    saveBuzzWords.map(buzz => {
      if (buzz['buzzWord'] === req.body['buzzWord']) {
        buzz['points']++;
        message = `Points added to buzzWord '${buzz['buzzWord']}.'`;
      }
    });
  }

  res.send({ "message": message, "success": success });
  return success;
});

router.delete('/', urlEncoded, (req, res) => {
  let success = false;
  let message = 'Error: Attempt to delete a buzzword that isn\'t being tracked.';

  // if an object already exists...
  if (foundMatch(req.body)) {
    success = true;

    saveBuzzWords.forEach(buzz => {
      if (buzz['buzzWord'] === req.body['buzzWord']) {
        saveBuzzWords.splice(saveBuzzWords.indexOf(buzz), 1);
        message = `No longer tracking buzzword ${buzz['buzzWord']}.`;
      }
    });
  }

  res.send({ "message": message, "success": success });
  return success;
});

module.exports = router;
