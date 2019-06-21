// Imported Modules
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const http_module = require('http')
const http = http_module.Server(app)

// Imported Configurations
const config = require('./helpers/config-helper')

// Use native ES6 Promises since  mongoose's are deprecated
mongoose.Promise = global.Promise

// Set a few options for the application
// eslint-disable-next-line no-undef
app.set('port', (process.env.PORT || 3000))

// Expose the public directory
// eslint-disable-next-line no-undef
app.use('/', express.static(__dirname + '/public/'))

// Protect from some well-known web vulnerabilities by
// setting HTTP headers appropriately. 
app.use(helmet())

// Setup body-parser to parse POST requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connect to MongoDB
mongoose.connect(config.db.connection, {
    useNewUrlParser: true
}).then(
    () => {
        // eslint-disable-next-line no-console
        console.log('Mongoose connected to ' + config.db.connection)
    }, // On success
    err => {
        // eslint-disable-next-line no-console
        console.log('Mongoose connection ' + err)
    } // On Failure
)

const postRoutes = require('./routes/posts-routes')

app.use('/api', postRoutes)

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

http.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.info('==> Go to http://localhost:%s', app.get('port'))
})