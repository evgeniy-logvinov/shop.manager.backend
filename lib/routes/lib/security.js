const express = require('express')
const { securityService } = requireRoot('lib/services')
const { WebError } = requireRoot('lib/errors')

const router = express.Router()

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    try {
        const token = await securityService.login({
            email: email,
            password
        })
        res.send({
            token: token.token,
            user: {
                _id: token.user._id,
                email: token.user.email
            }
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

router.post('/logout', async (req, res, next) => {
  const { authorization } = req.headers
  try {
    await securityService.logout({
      token: authorization
    })

    res.send({
      ok: true
    })
  } catch (e) {
    if (e instanceof WebError) {
      res.status(e.status).send(e.message)
    } else {
      console.log(e)
      res.status(500).send(e.message)
    }
  }
})

module.exports = router
