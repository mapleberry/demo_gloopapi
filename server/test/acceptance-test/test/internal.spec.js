const init = require('./init')
const Promise = require('bluebird')
const rp = require('request-promise')
const chai = require('chai')
const expect = chai.expect

let baseUrl

describe('/internal', function () {
    before(() => {
        return init().tap(url => {
            baseUrl = url
        })
    })

    it('/healthcheck returns a 200 OK', () => {
        return rp.get(`${baseUrl}/internal/healthcheck`)
    })

    it('/log-config returns a 200 OK', () => {
        return rp.get(`${baseUrl}/internal/log-config`)
    })

    it('/simulate-error returns a 500 status', () => {
        const options = {
            uri: `${baseUrl}/internal/simulate-error`,
            simple: false,
            resolveWithFullResponse: true
        }
        return rp.get(options).then(res => {
            expect(res.statusCode).to.equal(500)
        })
    })
})
