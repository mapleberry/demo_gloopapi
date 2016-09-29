const init = require('./init')
const chai = require('chai')
const expect = chai.expect
const Promise = require('bluebird')
const rp = require('request-promise')

let baseUrl

describe('/', () => {
  before(() => {
    return init().tap(url => {
      baseUrl = url
    })
  })
  it('/ returns a 200 OK, with hello world in the text', () => {
    return rp.get(`${baseUrl}`).then(res => {
      expect(res).to.contain('Hello World')
    })
  })
})
