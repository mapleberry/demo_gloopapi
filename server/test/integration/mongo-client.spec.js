'use strict'

const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
const mongodb = require('mongodb')
const internalMongoClient = mongodb.MongoClient
const mongoClient = require('../../src/services/mongo-client')

describe('Mongo client', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  const validConnectionString = 'mongodb://mongodb:27017/gloopapi_test'
  it('should connect to mongodb', () => {
    return mongoClient(validConnectionString).connect(validConnectionString).then(() => console.log('Connected to MongoDb.'))
  })

  it('should try re-connect when mongo is not available', function (done) {
    const invalidConnectionString = 'mongodb://mongodb:27018/gloopapi_test'
    sandbox.spy(internalMongoClient, 'connect')

    mongoClient(invalidConnectionString, 1).connect()
    setTimeout(() => {
      expect(internalMongoClient.connect.callCount).to.be.above(2)
      done()
    }, 1000)
  })
})
