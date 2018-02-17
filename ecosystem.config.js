const mongoName = 'shop-manager-backend'
const mongoUser = 'adminShop74'
const mongoPass = 'aaa47aaa'
const mongoAuthSource = 'shop-manager-backend'

const mongoIp = 'ds237748.mlab.com'
const mongoPort = '37748'

function getMongoUrl(ip, port, name, user, pass, authSource) {
	return 'mongodb://' + (user && pass ? (user + ':' + pass + '@') : '') + ip + ':' + port + '/' + name + '?' + (authSource ? 'authSource=' + authSource : '')
}

module.exports = {
	apps: [{
		name: 'shop-manager-backend',
		script: 'keystone.js',
		watch: true,
		env: {
			'PORT': 8088,
			'COOKIE_SECRET': 'dRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t',
			'NODE_ENV': 'development',
			'AUTO_UPDATE': true,
			'MONGO_URI': getMongoUrl(mongoIp, mongoPort, mongoName, mongoUser, mongoPass, mongoAuthSource)
		},
		env_production: {
			'PORT': 8001,
			'COOKIE_SECRET': 'dRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t',
			'NODE_ENV': 'production',
			'AUTO_UPDATE': true,
			'MONGO_URI': getMongoUrl(mongoIp, mongoPort, mongoName, mongoUser, mongoPass, mongoAuthSource)
		}
	}]
}
