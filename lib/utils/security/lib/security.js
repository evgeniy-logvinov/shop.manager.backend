const keystone = require('@eklogvinov/keystone')
const SecurityPermissionType = keystone.list('SecurityPermissionType').model
const SecurityPermission = keystone.list('SecurityPermission').model
const SecurityRole = keystone.list('SecurityRole').model

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

async function pushRole({ permName, roleId }) {
	return await SecurityPermission
		.findOne({
			name: permName
		})
		.exec(function (err, doc) {
			doc.role.push(roleId)
			doc.save()
		})
}

async function addPermission({ permName, listName, permTypeId }) {
	return await new SecurityPermission({
		name: `${permName} ${listName}`,
		permType: keystone.mongoose.Types.ObjectId(permTypeId),
		listName: listName
	}).save()
}

module.exports.findPermType = findPermType
module.exports.findPerm = findPerm
module.exports.findRole = findRole
module.exports.pushRole = pushRole
module.exports.addPermission = addPermission
