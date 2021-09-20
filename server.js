// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

const router = express.Router();
router.use((req, res, next) => {
  // This reads the accept-language header
  // and returns the language if found or false if not
  req.lang = req.get('Accept-Language')
  res.locals.ua = req.get('User-Agent');

  next()
})
router.get('/whoami', (req, res) => {
  const ip = req.ip;
  const lang = req.lang;
  const software = res.locals.ua;

  res.json({ ip: ip, lang: lang, software: software });
});
app.use('/api', router);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
