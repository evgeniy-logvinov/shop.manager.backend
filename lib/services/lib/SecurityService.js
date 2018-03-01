const _ = require('lodash')
const keystone = require('keystone')
const {
	promisify
} = require('util')
const {
	WebError
} = requireRoot('lib/errors')

const SecurityUser = keystone.list('SecurityUser').model
const SecurityToken = keystone.list('SecurityToken').model
const SecurityPermission = keystone.list('SecurityPermission').model
const SecurityPermissionType = keystone.list('SecurityPermissionType').model

class SecurityService {

	async login({
		email,
		password
	}) {
		const user = await SecurityUser.findOne({
			email
		}).exec()
		if (!user) {
			throw new WebError('Wrong credentials', 401)
		}
		if (!await promisify(user._.password.compare)(password)) {
			throw new WebError('Wrong credentials', 401)
		}
		const token = await SecurityToken.create({
			user: user
		})
		return SecurityToken.findOne({
			_id: token._id
		}).populate('user')
			.exec()
	}

	async token({
		token
	}) {
		if (!token || token.indexOf('Bearer ') !== 0) {
			throw new WebError('Wrong credentials', 401)
		}

		return SecurityToken
			.findOne({
				token: token.substring('Bearer '.length)
			})
			.populate({
				path: 'user'
			})
			.exec()
	}

	async logout({
		token
	}) {
		if (token.indexOf('Bearer ') !== 0) {
			throw new WebError('Wrong credentials', 401)
		}
		const result = await SecurityToken.findOne({
			token: token.substring('Bearer '.length)
		}).populate('user')
			.exec()
		if (!result) {
			throw new WebError('Wrong credentials', 401)
		}
		result.remove()
		return result
	}

	async permissions({
		roleId
	}) {
		if (!roleId) {
			throw new WebError('Wrong credentials', 401)
		}

		return SecurityPermission
			.find({
				role: roleId
			})
			.populate('permType')
			.select('listName permType -_id')
			.exec()
	}

	async hasAuthority({
		token,
		scopes
	}) {
		if (_.isEmpty(scopes)) {
			throw new WebError('Wrong credentials', 401)
		}

		return this.token({
			token: token
		})
			.then(token => {
				if (token) {
					return this.permissions({
						roleId: token.user.role
					}).then(rolePerms => {
						return this.hasPermission({
							scopes: scopes,
							rolePerms: rolePerms
						})
					})
				} else {
					throw new WebError('Wrong credentials', 401)
				}
			})
	}

	async hasChildPerms({
		permKey,
		checkName
	}) {
		console.log('hasChildPerms', permKey, checkName)
		const permType = await SecurityPermissionType
			.findOne({
				_id: permKey
			})
			.exec()
		console.log('equals', permType.key, checkName)
		if (permType.key === checkName) {
			return true
		} else if (!_.isEmpty(permType.permType)) {
			return permType.permType.filter((element) => {
				return this.hasChildPerms({
					permKey: element,
					checkName: checkName
				})
			}).length > 0
		} else {
			return false
		}
	}

	async getContainsPerms({
		scopes,
		rolePerms
	}) {
		const containsPerms = []
		for (let key in scopes) {
			for (let rolePerm of rolePerms) {
				if (rolePerm.listName === key && !_.isEmpty(rolePerm.permType.permType)) {
					for (let permType of rolePerm.permType.permType) {
						await this.hasChildPerms({
							permKey: permType,
							checkName: scopes[key]
						})
							.then((isContains) => {
								if (isContains) {
									containsPerms.push(rolePerm)
								}
							})
					}
				}
			}
		}

		return Promise.resolve(containsPerms)
	}

	async hasPermission({
		scopes,
		rolePerms
	}) {
		if (!rolePerms || rolePerms.length == 0 || !scopes) {
			throw new WebError('Wrong credentials', 401)
		}

		await this.getContainsPerms({
			scopes: scopes,
			rolePerms: rolePerms
		}).then((containsPerms) => {
			if (containsPerms && containsPerms.length == Object.keys(scopes).length) {
				return true
			} else {
				throw new WebError('Wrong credentials', 401)
			}
		})

	}
}

module.exports = SecurityService
