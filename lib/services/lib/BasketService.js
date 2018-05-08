const _ = require('lodash')
const keystone = require('@eklogvinov/keystone')
const {
	WebError
} = requireRoot('lib/errors')

const AbstractService = require('./AbstractService')
const SecurityService = require('./SecurityService')
const Basket = keystone.list('Basket').model

class BasketService extends AbstractService {

	/**
	 * Get baskets with pagination. page is number of current page, size is number of elements on page
	 * @param {object} object { page, size, token }
	 */
	async getBaskets({ page, size, token }) {
		const number = _.toNumber(page) || 0
		const perPage = _.toNumber(size) || 4
		page = ((_.toNumber(page) || 0) + 1)
		const tokenWithUser = await new SecurityService().token({ token })
		const results = await Basket
			.find(await this.getBasketFilters({ userId: tokenWithUser.user._id }))
			.sort({ updatedAt: -1, createdAt: -1 })
			.skip(perPage * page - perPage)
			.limit(perPage)
			.populate('product', 'name')
			.populate('owner', 'name')
			.populate('friend', 'name')

		return await this.getPaginateResult({ results, perPage, page, number, model: Basket })
	}

	/**
	 * Get filters for baskets
	 * @param {identifier, name, updatedAt, friendIds} object 
	 */
	async getBasketFilters({ identifier, userId }) {
		let filters = {
			$or: [{
				'owner': userId
			}, {
				'friend': userId
			}]
		}
		// {
		// name,
		// updatedAt: this.getDateFilter(updatedAt, 'YYYY-MM-DD'),
		// friend: !_.isEmpty(friendIds) ? { '$in': friendIds } : undefined,
		// }

		// if (identifier) {
		// 	filters.$or = [
		// { name: new RegExp('.*' + identifier + '.*', 'i') },
		// { updatedAt: this.getDateFilter(identifier, 'DD.MM.YYYY') },
		// 	]
		// }

		return _.omitBy(filters, _.isNil)
	}

}

module.exports = BasketService
