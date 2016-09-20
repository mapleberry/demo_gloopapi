const express = require('express')
const createMetricsMiddleware = require('../middleware/metrics')

module.exports = createRouter

function createRouter ({statsd, helloService}) {
  const router = express.Router()

  router.get('/', createMetricsMiddleware(statsd), (req, res) => {
    res.send(helloService.sayHelloWorld())
  })

  router.all('/', (req, res) => {
    res.sendStatus(405)
  })

  return router
}
