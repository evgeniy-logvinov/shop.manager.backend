var _ = require('lodash')
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
			await shopService.baskets({
					token: req.headers.authorization
				})
				.then(baskets => {
					res.send(baskets)
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
					res.send(product)
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

router.get('/products-in-baskets', authenticate({
		kjs: {
			'Product': 'manage',
		},
	}),
	async (req, res) => {
		try {
			const {
				basket,
				product
			} = req.query

			let filters = {
				basket,
				product
			}

			filters = _.omit(filters, _.isNil)
			console.log(filters)
			await shopService.productsInBaskets()
				.then(productsInBaskets => {
					res.send(productsInBaskets)
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

router.get('/products-in-baskets/i/:id', authenticate({
		kjs: {
			'Product': 'manage',
		},
	}),
	async (req, res) => {
		try {
			const {
				id
			} = req.params

			await shopService.findOneProductInBaskets({
					id
				})
				.then(productsInBaskets => {
					res.send(productsInBaskets)
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
