'use strict'

const Promise = require('bluebird')
const retry = require('bluebird-retry')
const rp = require('request-promise')

const u = require('./util')
let serviceBaseUrl = process.env['SERVICE_BASE_URL']
if (!u.isNonBlankString(serviceBaseUrl)) {
    throw new Error('Please provide env variable SERVICE_BASE_URL')
}
console.log('SERVICE_BASE_URL:', serviceBaseUrl)
serviceBaseUrl = u.stripTrailingSlash(serviceBaseUrl)

function isWebsiteAvailable() {
    return rp.get(serviceBaseUrl + '/internal/healthcheck')
}

module.exports = () => {
    return retry(isWebsiteAvailable, {max_tries: 20, interval: 1000}).then(() => serviceBaseUrl)
}
