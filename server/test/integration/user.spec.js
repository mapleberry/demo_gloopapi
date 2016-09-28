'use strict'

const newUserService = require('../../src/services/user-service')
const connectionString = 'mongodb://mongodb:27017/gloopapi_test'
const createMongoClient = require('./../../src/services/mongo-client')
const mongoClient = createMongoClient(connectionString)
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const uuid = require('uuid')
chai.use(chaiAsPromised)

describe('user service', () => {
  it('should insert, get and delete a user', () => {
    const userService = newUserService(mongoClient)
    const user = {
      email: 'test@test.com', password: 'password'
    }
    return userService.then(service => service.insert(user)
            .then(id => service.get(id))
            .then(user => {
              expect(user.email).to.be.equal('test@test.com')
              const userUiid = uuid.unparse(uuid.parse(user.uuid)).toString() // TODO unit test that and add password hashing and set created property
              expect(userUiid.length).to.equal(36)
              return user._id
            })
            .tap(id => service.delete(id))
            .then(id => expect(service.get(id)).be.rejected)
        )
  })

  it('should update user data', () => {

  })

  it('should partially update user data', () => {

  })
})
