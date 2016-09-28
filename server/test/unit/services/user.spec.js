'use strict'

const sinon = require('sinon')
const createUserService = require('../../../src/services/user-service')
const mongoClient = {
  connect () {
    return Promise.resolve()
  }
}
const userService = createUserService(mongoClient)

describe('user service', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should set created property when inserting', () => {

  })

  it('should set uuid property when inserting user', () => {

  })

  it('should hash password property', () => {

  })
})
