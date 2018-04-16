var _ = require('lodash')
const keystone = require('@eklogvinov/keystone')
const {
	WebError
} = requireRoot('lib/errors')

const AbstractService = require('./AbstractService')
const SecurityService = require('./SecurityService')
const Basket = keystone.list('Basket').model
const Product = keystone.list('Product').model
const ProductInBasket = keystone.list('ProductInBasket').model

class ShopService extends AbstractService {

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

	async productsInBaskets() {
		return await ProductInBasket
			.find({})
			.exec()
	}

	async findOneProductInBaskets({
		id
	}) {
		return await ProductInBasket
			.find({
				id
			})
			.exec()
	}

	async findProductsInBasketsByFilters({
		basket,
		product
	}) {
		return await ProductInBasket
			.find({
				basket,
				product
			})
			.exec()
	}

}

module.exports = ShopService
