'use strict'

const request = require('supertest')
const sinon = require('sinon')
const express = require('express')
const app = express()
const createUserRoute = require('../../../src/app/routes/user')
const userService = {
  get (id) {
    return Promise.resolve()
  }
}
const userRouter = createUserRoute({userService})

app.use('/user', userRouter)

describe('user routes', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('GET /', () => {
    it('returns user by id', done => {
      sandbox.stub(userService, 'get').returns(Promise.resolve({_id: 1, email: 'test@test.com'}))

      request(app)
                .get('/user/1')
                .expect(200, {
                  _id: 1,
                  email: 'test@test.com'
                }, done)
    })
  })

  it('returns 404 when user not found', done => {
    sandbox.stub(userService, 'get').returns(Promise.reject())
    request(app)
            .get('/user/1')
            .expect(404, done)
  })

  describe('POST /', () => {

  })

  describe('PUT /', () => {

  })

  describe('PATCH /', () => {

  })

  describe('DELETE /', () => {

  })
})
