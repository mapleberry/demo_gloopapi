const express = require('express')
const errors = require('./../../errors')
const UserNotFound = errors.UserNotFound

function createUserRouter({userService, logger}) {
    const router = express.Router()
    router.get('/:id', (req, res) => {
        const id = req.params.id
        userService.get(id)
            .then(user => res.send(user))
            .catch(err => {
                if (err instanceof UserNotFound) {
                    res.status(404).send(err)
                } else {
                    logger.error(`GET /${id} failed, error:`, err)
                    res.sendStatus(500)
                }
            })
    })

    router.put('/', (req, res) => {
        const id = req.params.id
        userService.update(id, res.body)
            .then(() => res.sendStatus(201))
            .catch(err => {
                logger.error(`PUT /${id} failed, error:`, err)
                res.sendStatus(500)
            })
    })

    router.post('/:id', (req, res) => {
        const id = req.params.id
        userService.update(id, res.body)
            .then(() => res.sendStatus(200))
            .catch(err => {
                logger.error(`POST /${id} failed, error:`, err)
                res.sendStatus(500)
            })
    })

    router.patch('/:id', (req, res) => {
        const id = req.params.id
        userService.update(id, res.body)
            .then(() => res.sendStatus(200))
            .catch(err => {
                logger.error(`PATCH /${id} failed, error:`, err)
                res.sendStatus(500)
            })
    })

    router.delete('/:id', (req, res) => {
        const id = req.params.id
        userService.delete(id)
            .then(() => res.sendStatus(200))
            .catch(err => {
                logger.error(`DELETE /${id} failed, error:`, err)
                res.sendStatus(500)
            })
    })

    return router
}

module.exports = createUserRouter
