// Import modules
var express = require('express'); // I've worked with Express to create several APIs. It's easy to instantiate with verbose documentation
    cors = require('cors'); // This provides a simple way to enable CORS on an Express server
    bodyParser = require('body-parser') // Allows middleware parsing
    dotEnv = require('dotenv') // Loads environment variables into process.env
    request = require('request') // Simple HTTP requests
    app = express();

// Config json parsing, .env, CORS
dotEnv.config()
app.use(bodyParser.json({limit: "50mb"})); // Size limits for this example are arbitrary though could be configured to limit large requests
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors())


// Start express server on env-specified port
var server = app.listen(process.env.PORT || 9001, function () {
    var port = server.address().port;
    console.log('App now running on port', port);
  });

// Instantiate global data to be filled by response from request below
let globalCache = []

// On API start, globally cache json response to use for endpoint
request.get({url:'https://data.providenceri.gov/resource/r6n7-qjr6.json?$$app_token=' + process.env.APP_TOKEN}, (err, response, body) => {
  if (!err && response.statusCode == 200) {
    let jsonBody = JSON.parse(body)
    globalCache = jsonBody
  }
})


// Get row from global data using index parameter
app.get('/record/:index', (req,res) => {
  const index = req.params.index
  const arrLen = globalCache.length - 1
  if (index <= arrLen) {
    res.status(200).send(globalCache[index])
  } else {
    res.status(400).send('Index out of bounds')
  }
})
