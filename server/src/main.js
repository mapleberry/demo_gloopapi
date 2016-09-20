const config = require('./helpers/config')
const createLogger = require('./helpers/logger')
const statsd = require('./helpers/statsd')
const createAndConfigureApp = require('./app')
const createHelloService = require('./services/hello-world')

const logger = createLogger(module)
config.logCurrentConfig(logger)

const helloService = createHelloService({
  logger,
  config,
  statsd
})

const {startApp} = createAndConfigureApp({helloService, logger, config, statsd})

setupProcessHooks()

startApp()
  .then(() => {
    statsd.increment('started')
    logger.info('Service is up')
  })
  .catch(err => {
    logger.error('Startup error', err)
    exitProcessWithError('Startup error')
  })

function setupProcessHooks () {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err)
    exitProcessWithError('Uncaught exception')
  })

  process.on('SIGINT', () => {
    exitProcessWithError('SIGINT received, shutting down app')
  })
}

function exitProcessWithError (errorMsg) {
  statsd.increment('stopped')
  logger.error('Shutting down app: ', errorMsg)
  process.exit(1)
}