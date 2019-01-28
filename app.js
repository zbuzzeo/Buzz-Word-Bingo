'use strict';

const express = require('express');
const routing = require('./routes/routing');
const buzzwords = require('./routes/buzz-words');
const app = express();


app.use('/', routing);
app.use('/buzzwords', buzzwords);

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Listening at http://${ host === '::' ? `localhost` : host }:${port}`);
});
