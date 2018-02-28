const SecurityService = require('./lib/SecurityService')
const ShopService = require('./lib/ShopService')

module.exports = {
	securityService: new SecurityService(),
	shopService: new ShopService()
}
