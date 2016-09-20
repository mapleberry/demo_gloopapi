const express = require('express')

module.exports = createInternalRouter

function createInternalRouter ({config, logger}) {
  const router = express.Router()
  router.get('/healthcheck', (req, res) => {
    res.send('Healthy')
  })

  router.get('/log-config', (req, res) => {
    config.logCurrentConfig(logger)
    res.send('Current config written to logs')
  })

  router.get('/simulate-error', (req, res) => {
    throw new Error('this is a simulated error, someone hit /internal/simulate-error, nothing bad actually happened')
  })

  return router
}
