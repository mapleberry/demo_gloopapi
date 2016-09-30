const express = require('express')
const errors = require('./../../errors')
const UserNotFound = errors.UserNotFound

function createUserRouter({userService, logger}) {
    const router = express.Router()
    router.get('/:id', (req, res) => {
        userService.get(req.params.id)
            .then(user => res.send(user))
            .catch(err => {
                if (err instanceof UserNotFound) {
                    res.status(404).send(err)
                } else {
                    res.sendStatus(500)
                }
            })
    })

    router.put('/', (req, res) => {
        userService.update(req.params.id, res.body)
            .then(() => res.sendStatus(201))
            .catch(err => {
                logger.error('PUT failed, error:', err)
                res.sendStatus(500)
            })
    })

    router.post('/:id', (req, res) => {
        userService.update(req.params.id, res.body)
            .then(() => res.sendStatus(200))
            .catch(err => {
                logger.error('POST failed, error:', err)
                res.sendStatus(500)
            })
    })

    router.patch('/:id', (req, res) => {
        userService.update(req.params.id, res.body)
            .then(() => res.sendStatus(200))
            .catch(err => {
                logger.error('PATCH failed, error:', err)
                res.sendStatus(500)
            })
    })

    router.delete('/:id', (req, res) => {

    })

    return router
}

module.exports = createUserRouter
