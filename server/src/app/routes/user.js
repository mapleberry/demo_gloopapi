const express = require('express')

module.exports = createUserRouter
const errors = require('./../../errors')
const UserNotFound = errors.UserNotFound;


function createUserRouter ({userService}) {
  const router = express.Router()
  router.get('/:id', (req, res) => {
    userService.get(req.params.id)
               .then(user => res.send(user))
               .catch(err => {
                 if(err instanceof UserNotFound) {
                   res.status(404).send(err)
                 }
                 else {
                   res.sendStatus(500)
                 }
               })
  })

  return router
}
