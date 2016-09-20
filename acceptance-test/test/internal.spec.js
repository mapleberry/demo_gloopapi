const request = require('./init')

describe('/internal', () => {
  it('/healthcheck returns a 200 OK', done => {
    request.get('/internal/healthcheck')
      .expect(200, done)
  })

  it('/log-config returns a 200 OK', done => {
    request.get('/internal/log-config')
      .expect(200, done)
  })

  it('/simulate-error returns a 500 status', done => {
    request.get('/internal/simulate-error')
      .expect(500, done)
  })
})
