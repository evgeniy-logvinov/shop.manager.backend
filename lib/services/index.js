const SecurityService = require('./lib/SecurityService')
const ShopService = require('./lib/ShopService')
const BasketService = require('./lib/BasketService')

module.exports = {
	securityService: new SecurityService(),
	shopService: new ShopService(),
	basketService: new BasketService()
}
