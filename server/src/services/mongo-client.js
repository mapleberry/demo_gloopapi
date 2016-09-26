'use strict'

const createLogger = require('./../helpers/logger')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const logger = createLogger(module)
const Promise = require('bluebird')

module.exports = (connectionString, backoffTime = 1000) => {
  return {

    connect () {
      logger.debug('Connecting to MongoDb:', connectionString)

      const reconnect = startConnecting

      function startConnecting () {
        return mongoClient.connect(connectionString, {promiseLibrary: Promise})
                    .tap(db => {
                      process.once('SIGINT', () => {
                        logger.info('Closing the MongoDb connection')
                        db.close()
                      })
                    })
                    .tap(db => {
                      db.on('error', error => {
                        logger.error('MongoDb error:', error)
                      })
                    })
                    .tap(db => {
                      logger.debug('Connected to MongoDb')
                      const user = db.collection('user')
                      user.createIndex({uuid: 1}, {unique: 1})
                    }).catch(err => {
                      backoffTime = backoffTime > 60000 ? 60000 : backoffTime * 2
                      logger.error('Error connecting to MongoDb.', err)
                      logger.info(`Retry connecting to MongoDb in ${backoffTime} ms.`)
                      return Promise.delay(backoffTime).then(() => reconnect())
                    })
      }

      return startConnecting()
    }
  }
}
