const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
port = process.env.PORT || 8080

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const whitelist = ['http://localhost:8081', 'https://todoapprarr.web.app/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

// Connect to db
const connect = require('./app/db/connect')
connect()

const router = require('./app/router/router')
router(app)

app.get('/', (req,res) => {
    res.send('Hello from server!')
})

app.listen(port, () => {
    console.log(`server running in port ${port}`)
})