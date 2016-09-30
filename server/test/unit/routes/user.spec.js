'use strict'

const request = require('supertest')
const sinon = require('sinon')
const express = require('express')
const app = express()
const createUserRoute = require('../../../src/app/routes/user')
const errors = require('./../../../src/errors')
const UserNotFound = errors.UserNotFound
const helpers = require('./../helpers')
const userService = {
    get (id) {
        return Promise.resolve()
    },
    update (id, user) {
        return Promise.resolve()
    }
}
const logger = helpers.getFakeLogger()
const userRouter = createUserRoute({userService, logger})

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
        sandbox.stub(userService, 'get').returns(Promise.reject(new UserNotFound()))
        request(app)
            .get('/user/1')
            .expect(404, done)
    })

    it('returns 500 when error occurs', done => {
        sandbox.stub(userService, 'get').returns(Promise.reject())
        request(app)
            .get('/user/1')
            .expect(500, done)
    })

    describe('POST /', () => {
        it('return 200 when updating', done => {
            sandbox.stub(userService, 'update').returns(Promise.resolve())
            request(app)
                .post('/user/1', {email: 'test@test.com'})
                .expect(200, done)
        })

        it('returns 500 when error occurs', done => {
            sandbox.stub(userService, 'update').returns(Promise.reject())
            request(app)
                .post('/user/1')
                .expect(500, done)
        })
    })

    describe('PUT /', () => {
        it('return 201 when updating', done => {
            sandbox.stub(userService, 'update').returns(Promise.resolve())
            request(app)
                .put('/user', {email: 'test@test.com'})
                .expect(201, done)
        })

        it('returns 500 when error occurs', done => {
            sandbox.stub(userService, 'update').returns(Promise.reject())
            request(app)
                .put('/user', {email: 'test@test.com'})
                .expect(500, done)
        })
    })

    describe('PATCH /', () => {
        it('return 200 when updating', done => {
            sandbox.stub(userService, 'update').returns(Promise.resolve())
            request(app)
                .patch('/user/1', {email: 'test@test.com'})
                .expect(200, done)
        })

        it('returns 500 when error occurs', done => {
            sandbox.stub(userService, 'update').returns(Promise.reject())
            request(app)
                .patch('/user/1', {email: 'test@test.com'})
                .expect(500, done)
        })
    })

    describe('DELETE /', () => {

    })
})
