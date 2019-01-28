'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

// get the buzzwords from POST requests, store them as their own objects.
// have an array of objects (buzzwords) that you can send when the client requests with GET.

// the file directory in this file is relative to /buzzwords
// the path '/buzzwords' is set to '/' here because of app.use('/buzzwords', buzzwords);
router.get('/', (req, res) => {
  res.send('<h3>GET YOUR BUZZ WORDS!</h3>');
});

module.exports = router;
