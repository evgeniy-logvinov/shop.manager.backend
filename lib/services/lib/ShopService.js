var _ = require('lodash')
const keystone = require('@eklogvinov/keystone')
const {
	WebError
} = requireRoot('lib/errors')
const SecurityService = require('./SecurityService')
const Basket = keystone.list('Basket').model
const Product = keystone.list('Product').model

class ShopService {

	async baskets({
		token
	}) {
		const securityService = new SecurityService()
		const tokenWithUser = await securityService.token({
			token: token
		})
		return await Basket
			.find({
				$or: [{
					'owner': tokenWithUser.user._id
				}, {
					'friend': tokenWithUser.user._id
				}]
			})
			.populate('product', 'name')
			.populate('owner', 'name')
			.populate('friend', 'name')
			.exec()
	}

	async products() {
		return await Product
			.find({})
			.exec()
	}
}

module.exports = ShopService
