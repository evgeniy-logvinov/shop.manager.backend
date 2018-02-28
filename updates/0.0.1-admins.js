const keystone = require('keystone')
const SecurityPermissionType = keystone.list('SecurityPermissionType').model
const SecurityPermission = keystone.list('SecurityPermission').model
const SecurityRole = keystone.list('SecurityRole').model
const SecurityUser = keystone.list('SecurityUser').model

function createPermissionTypes() {
	return Promise.all([
		new SecurityPermissionType({
			name: 'manage'
		}).save(),
		new SecurityPermissionType({
			name: 'view'
		}).save(),
	])
}

function createRoles() {
	return Promise.all([
		new SecurityRole({
			name: 'Administrator',
		}).save(),
		new SecurityRole({
			name: 'Customer',
		}).save()
	])
}

function createAdminUIPermission({
	permName
}) {
	return Promise.all([
		findPermType({
			name: permName
		}).then((permTypes) => {
			permTypes.forEach(permType =>
				Promise.all([
					new SecurityPermission({
						name: `${permName} SecurityPermission`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'SecurityPermission'
					}).save(),
					new SecurityPermission({
						name: `${permName} SecurityRole`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'SecurityRole'
					}).save(),
					new SecurityPermission({
						name: `${permName} SecurityUser`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'SecurityUser'
					}).save(),
					new SecurityPermission({
						name: `${permName} SecurityPermissionType`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'SecurityPermissionType'
					}).save()
				]))
		})
	])
}

function createShopPermission({
	permName
}) {
	return Promise.all([
		findPermType({
			name: permName
		}).then((permTypes) => {
			permTypes.forEach(permType =>
				Promise.all([
					new SecurityPermission({
						name: `${permName} Basket`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'Basket'
					}).save(),
					new SecurityPermission({
						name: `${permName} Product`,
						permType: keystone.mongoose.Types.ObjectId(permType._id),
						listName: 'Product'
					}).save()
				]))
		})
	])
}

function createAdminPermissions() {
	return Promise.all([
		findRole({
			name: 'Administrator'
		}).then((roles) =>
			roles.forEach(role =>
				Promise.all([
					SecurityPermission.findOne({
						name: 'manage SecurityPermission'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
					SecurityPermission.findOne({
						name: 'manage SecurityRole'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
					SecurityPermission.findOne({
						name: 'manage SecurityUser'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
					SecurityPermission.findOne({
						name: 'manage SecurityPermissionType'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
					SecurityPermission.findOne({
						name: 'manage Basket'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
					SecurityPermission.findOne({
						name: 'manage Product'
					}).exec(function (err, doc) {
						doc.role.push(role._id)
						doc.save()
					}),
				]))
		)
	])
}

function createCustomerPermissions() {
	return Promise.all([findRole({
		name: 'Customer'
	}).then((roles) =>
		roles.forEach(role =>
			Promise.all([
				SecurityPermission.findOne({
					name: 'manage Basket'
				}).exec(function (err, doc) {
					doc.role.push(role._id)
					doc.save()
				}),
				SecurityPermission.findOne({
					name: 'view Product'
				}).exec(function (err, doc) {
					doc.role.push(role._id)
					doc.save()
				}),
				SecurityPermission.findOne({
					name: 'view SecurityUser'
				}).exec(function (err, doc) {
					doc.role.push(role._id)
					doc.save()
				}),
			]))
	)])
}

function createUsers() {
	return Promise.all([
		findRole({
			name: 'Customer'
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

async function findPermType({
	name
}) {
	return await SecurityPermissionType.find({
		name: name
	}).exec()
}

async function findPerm({
	name
}) {
	return await SecurityPermission.find({
		name: name
	}).exec()
}

async function findRole({
	name
}) {
	return await SecurityRole.find({
		name: name
	}).exec()
}


module.exports = done => {
	Promise.all([
			createPermissionTypes(),
			createRoles(),
		])
		.then(() => Promise.all([
				createAdminUIPermission({
					permName: 'view'
				}),
				createAdminUIPermission({
					permName: 'manage'
				}),
				createShopPermission({
					permName: 'view'
				}),
				createShopPermission({
					permName: 'manage'
				}),
			])
			.then(() => Promise.all([
					createAdminPermissions(),
					createCustomerPermissions()
				])
				.then(() => Promise.all([
						createUsers()
					])
					.then(() => {
						console.log('all done')
						done()
					}))))
}
