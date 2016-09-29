const init = require('./init')
const Promise = require('bluebird')
const rp = require('request-promise')

let baseUrl

describe('/internal', function () {
    this.timeout(5000)
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

    // it('/simulate-error returns a 500 status', () => {
    //     return rp.get(`${baseUrl}/internal/simulate-error`)
    //     init.then(r => r.get('/internal/simulate-error')
    //         .expect(500, done))
    // })
})
