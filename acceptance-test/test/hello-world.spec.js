require('must/register')
const request = require('./init')

describe('/', () => {
  it('/ returns a 200 OK, with hello world in the text', done => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        res.text.must.contain('Hello World')
        done()
      })
  })
})
