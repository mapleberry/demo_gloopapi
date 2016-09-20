'use strict'

const sinon = require('sinon')
require('must/register')

const createHelloService = require('../../../src/services/hello-world')
const helpers = require('./../helpers')

describe('hello service', () => {
  describe('sayHelloWorld', () => {
    it('returns a greeting, logs something, sends a metric', () => {
      // arrange
      const fakeConfig = helpers.getFakeConfig({env: 'local'})
      const fakeLog = helpers.getFakeLogger()
      const fakeStatsd = helpers.getFakeStatsd()
      const logInfoSpy = sinon.spy(fakeLog, 'info')
      const statsdIncrSpy = sinon.spy(fakeStatsd, 'increment')

      const helloService = createHelloService({
        config: fakeConfig,
        logger: fakeLog,
        statsd: fakeStatsd
      })

      // act
      const message = helloService.sayHelloWorld()

      // assert
      message.must.eql("Hello World, I'm running on local environment !!!")
      logInfoSpy.calledOnce.must.be.true()
      statsdIncrSpy.calledOnce.must.be.true()
    })
  })
})
