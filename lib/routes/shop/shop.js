const express = require('express')
const keystone = require('@eklogvinov/keystone')
const utils = requireRoot('lib/utils')
const {
	shopService
} = requireRoot('lib/services')

const {
	authenticate
} = require('../lib/middleware')
const {
	WebError
} = requireRoot('lib/errors')

const router = express.Router()

router.get('/baskets', authenticate({
	kjs: {
		'Basket': 'manage',
		'Product': 'view',
	},
}),
	async (req, res) => {
		try {
			console.log(shopService)
			await shopService.baskets({
				token: req.headers.authorization
			})
				.then(basket => {
					res.send(utils.getObjectsWithId(basket))
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

router.get('/products', authenticate({
	kjs: {
		'Product': 'manage',
	},
}),
	async (req, res) => {
		try {
			await shopService.products()
				.then(product => {
					res.send(utils.getObjectsWithId(basket))
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
