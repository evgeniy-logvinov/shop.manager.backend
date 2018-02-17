const express = require('express')
const keystone = require('keystone')
const utils = requireRoot('lib/utils')
const { authenticate } = require('../lib/middleware')

// User
const SecurityUser = keystone.list('SecurityUser').model

const router = express.Router()

router.get('/user', authenticate({
    keystonejs: {
        'SecurityUser': 'delete',
    },
}),
    async (req, res) => {
        try {
            await SecurityUser
                .find({})
                .exec()
                .then(areas => {
                    res.send(utils.getObjectsWithId(areas))
                })
                .catch(err => {
                    throw new WebError(err)
                })
        } catch (e) {
            if (e instanceof WebError) {
                console.log(e)
                res.status(e.status).send(e.message)
            } else {
                console.log(e)
                res.status(500).send(e.message)
            }
        }
    })

module.exports = router





