// init checks for the env var SERVICE_BASE_URL, and returns a supertest object bound to that URL
'use strict'

const u = require('./util')
let serviceBaseUrl = process.env['SERVICE_BASE_URL']
if (!u.isNonBlankString(serviceBaseUrl)) {
    throw new Error('Please provide env variable SERVICE_BASE_URL')
}
console.log('SERVICE_BASE_URL:', serviceBaseUrl)
serviceBaseUrl = u.stripTrailingSlash(serviceBaseUrl)

module.exports = require('supertest')(serviceBaseUrl)
