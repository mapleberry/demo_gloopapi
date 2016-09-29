'use strict'

const uuid = require('uuid')
const errors = require('./../errors')
const UserNotFound = errors.UserNotFound
const md5 = require('md5')

module.exports = userService

function userService (mongoClient) {
  return mongoClient.connect().then(db => {
    const collection = db.collection('user')
    console.log('user service created')
    return {
      get (id) {
        return collection.find({_id: id}).toArray().then(result => {
          if (result.length > 0) {
            return result[0]
          }
          throw new UserNotFound(`User[${id}] not found`)
        })
      },
      insert (user) {
        user.uuid = uuid.v1()
        user.created = new Date()
        user.password = md5(user.password)
        return collection.insertOne(user).then(result => result.insertedId)
      },
      delete (id) {
        return collection.removeOne({_id: id})
      }
    }
  })
}
