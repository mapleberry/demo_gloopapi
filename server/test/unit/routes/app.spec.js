const request = require('supertest')
const helpers = require('./../helpers')
let app

describe('app defines routes', () => {
  beforeEach(() => {
    configureAppWithFakes()
  })

  describe('GET /internal/healthcheck', () => {
    it('returns status code 200', done => {
      request(app)
        .get('/internal/healthcheck')
        .expect(200, done)
    })
  })

  describe('GET /internal/log-config', () => {
    it('returns a 200 status code and an info message', done => {
      request(app)
        .get('/internal/log-config')
        .expect(200, 'Current config written to logs', done)
    })
  })
})

function configureAppWithFakes () {
  const createAndConfigureApp = require('../../../src/app/index')
  app = createAndConfigureApp({
    log: helpers.getFakeLogger(),
    config: helpers.getFakeConfig(),
    statsd: helpers.getFakeStatsd()
  }).app
}
