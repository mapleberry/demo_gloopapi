'use strict'
const winston = require('winston')

function createLogger (logLevel, component, env, module) {
  if (logLevel == null) {
    throw Error('logLevel required')
  }
  if (component == null) {
    throw Error('component required')
  }
  if (env == null) {
    throw Error('env required')
  }
  return new winston.Logger({
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        colorize: false,
        prettyPrint: false,
        level: logLevel,
        humanReadableUnhandledException: true,
        formatter (options) {
          const logMsg = {
            level: options.level,
            component,
            env,
            module,
            message: options.message,
            timestamp: new Date(),
            stack: options.meta.stack
          }
          return JSON.stringify(logMsg)
        }
      })
    ]
  })
}

module.exports = createLogger
