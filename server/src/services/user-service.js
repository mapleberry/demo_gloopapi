'use strict'

const mongoClient = require('./mongo-client')
const uuid = require('uuid')

module.exports = userService

function userService (connectionString) {
  return mongoClient(connectionString).connect().then(db => {
    const collection = db.collection('user')
    console.log('user service created')
    return {
      get (id) {
        return collection.find({_id: id}).toArray().then(result => {
          if (result.length > 0) {
            return result[0]
          }
          throw new Error(`User[${id}] not found`)
        })
      },
      insert (user) {
        user.uuid = uuid.v1()
        return collection.insertOne(user).then(result => result.insertedId)
      },
      delete (id) {
        return collection.removeOne({_id: id})
      }
    }
  })
}
