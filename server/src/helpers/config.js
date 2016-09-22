const convict = require('convict')

const config = getConfig()
config.validate({strict: true})

module.exports = config
module.exports.logCurrentConfig = logCurrentConfig

function getConfig () {
  return convict({
    env: {
      doc: 'The deployment environment',
      format: ['local', 'qa', 'live'],
      env: 'ENV',
      default: 'local'
    },
    componentName: {
      doc: 'Component name to use in metrics and logging',
      format: String,
      env: 'COMPONENT_NAME',
      default: 'es6-template-project'
    },
    port: {
      doc: 'Port for starting the app on.',
      format: 'port',
      env: 'PORT',
      default: 8080
    },
    logLevel: {
      doc: 'Log level to start logging at.',
      format: ['debug', 'info', 'warn', 'error'],
      env: 'LOG_LEVEL',
      default: 'debug'
    },
    statsd: {
      enabled: {
        doc: 'Whether to send metrics to a StatsD server',
        format: Boolean,
        env: 'STATSD_ENABLED',
        default: false
      },
      host: {
        doc: 'StatsD server host',
        format: String,
        env: 'STATSD_HOST',
        default: null
      },
      port: {
        doc: 'StatsD server port',
        format: 'port',
        env: 'STATSD_PORT',
        default: null
      },
      mongodb: {
        uri: {
          doc: 'MongoDb uri',
          format: String,
          env: 'MONGODB_URI',
          default: 'mongodb://mongodb:27017/gloopapi'
        }
      }
    }
  })
}

function logCurrentConfig (log = console) {
  log.info('Current config: %s', config.toString().replace(/\n/g, '').replace(/"/g, "'"))
}
