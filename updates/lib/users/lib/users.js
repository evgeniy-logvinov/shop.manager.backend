const keystone = require('@eklogvinov/keystone')
const SecurityUser = keystone.list('SecurityUser').model
const { findRole } = requireRoot('lib/utils/security')

function createUsers() {
    return Promise.all([
		findRole({
			name: 'User'
		}).then((roles) =>
			roles.forEach(role =>
				new SecurityUser({
					name: 'CustomerUser',
					email: 'customer@test.com',
					password: 'myCustomer',
					isAdmin: false,
					role: role._id
				})
					.save())),
		findRole({
			name: 'Administrator'
		}).then((roles) =>
			roles.forEach(role =>
				new SecurityUser({
					name: 'AdminUser',
					email: 'admin@test.com',
					password: 'myAdmin',
					isAdmin: true,
					role: role._id
				})
					.save())),
    ])
}

module.exports.createUsers = createUsers
