const express = require('express')

module.exports = createUserRouter

function createUserRouter ({userService}) {
  const router = express.Router()
  router.get('/:id', (req, res) => {
    userService.get(req.params.id)
               .then(user => res.send(user))
               .catch(() => res.sendStatus(404))
  })

  return router
}
