'use strict'

const newUserService = require('../../src/services/user-service')
const connectionString = 'mongodb://mongodb:27017/gloopapi_test'
const createMongoClient = require('./../../src/services/mongo-client')
const mongoClient = createMongoClient(connectionString)
const chai = require('chai')
const md5 = require('md5')
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
                expect(user.created instanceof Date).to.be.true
                expect(user.password).be.be.equal(md5('password'))
                const userUiid = uuid.unparse(uuid.parse(user.uuid)).toString()
                expect(userUiid.length).to.equal(36)
                return user._id
            })
            .tap(id => service.delete(id))
            .then(id => expect(service.get(id)).be.rejected)
        )
    })

    it('should update user data', () => {
        const userService = newUserService(mongoClient)
        const user = {
            email: 'test@test.com', password: 'password'
        }
        const scope = {}
        return userService.then(service => service.insert(user)
            .tap(id => {
                scope.id = id
            })
            .tap(() => {
                user.email = 'test-update@test.com'
                return service.update(scope.id, user)
            })
            .then(() => service.get(scope.id)
        )).then(user => {
            expect(user.updated instanceof Date).to.be.true
            expect(user.email).be.be.equal('test-update@test.com')
        })
    })

    it('should partially update user data', () => {
        const userService = newUserService(mongoClient)
        const user = {
            email: 'test@test.com', password: 'password'
        }
        const scope = {}
        return userService.then(service => service.insert(user)
            .tap(id => {
                scope.id = id
            })
            .tap(() => {
                user.email = 'test-update@test.com'
                return service.update(scope.id, {name: 'User name'})
            })
            .then(() => service.get(scope.id)
            )).then(user => {
            expect(user.email).be.be.equal('test@test.com')
            expect(user.name).be.be.equal('User name')
        })
    })

    it('should not update password', () => {
        const userService = newUserService(mongoClient)
        const user = {
            email: 'test@test.com', password: 'password'
        }
        const scope = {}
        return userService.then(service => service.insert(user)
            .tap(id => {
                scope.id = id
            })
            .tap(() => {
                user.email = 'test-update@test.com'
                return service.update(scope.id, {password: 'newpassword'})
            })
            .then(() => service.get(scope.id)
            )).then(user => {
            expect(user.password).be.be.equal(md5('password'))
        })
    })
})
