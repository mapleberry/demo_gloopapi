'use strict'

const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect
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

      const message = helloService.sayHelloWorld()

      expect(message).to.equal("Hello World, I'm running on local environment !!!")
      expect(logInfoSpy.calledOnce).to.be.true
      expect(statsdIncrSpy.calledOnce).to.be.true
    })
  })
})
