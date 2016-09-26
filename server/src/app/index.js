const express = require('express')
const morgan = require('morgan')
const setErrorHandlers = require('./set-error-handlers')
const createInternalRouter = require('./routes/internal')
const createHelloRouter = require('./routes/hello')
const createUserRouter = require('./routes/user')

module.exports = createAndConfigureApp

function createAndConfigureApp ({config, logger, statsd, helloService, userService}) {
  const app = express()

  setAccessLogs(app)
  app.use('/', createHelloRouter({statsd, helloService}))
  app.use('/internal', createInternalRouter({config, logger}))
  app.use('/user', createUserRouter({userService}))

  setErrorHandlers({app, logger, statsd})

  return {app, startApp}

  function startApp () {
    return new Promise((resolve, reject) => {
      try {
        const server = app.listen(config.get('port'), () => {
          logger.info(`Started on port ${server.address().port}`)
          return resolve()
        })
        server.once('error', err => {
          return reject(err)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

function setAccessLogs (app) {
  const format = ':req[X-Forwarded-For] :method :url HTTP/:http-version :status :res[content-length] - :response-time[1] ms - :user-agent'
  app.use(morgan(format, {
    skip: (req, res) => req.url.toLowerCase().includes('/healthcheck')
  }))
}
