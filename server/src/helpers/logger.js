'use strict'
const createConsoleLogger = require('./console-logger')
const config = require('./config')

const getCallingModuleName = callingModule => {
  const parts = callingModule.filename.split('/')
  return parts[parts.length - 2] + '/' + parts.pop()
}

const createLogger = (module) => {
  let moduleName = module
  if (module != null && typeof module !== 'string') {
    moduleName = getCallingModuleName(module)
  }
  if (config.get('env') === 'local') {
    console.info('ENV is local, using good default console for logging.')
    console.debug = console.log.bind(console)
    return console
  }
  return createConsoleLogger(config.get('logLevel'), config.get('componentName'), config.get('env'), moduleName)
}

module.exports = createLogger
