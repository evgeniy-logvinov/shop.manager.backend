var _ = require('lodash')
var keystone = require('@eklogvinov/keystone')
var Types = keystone.Field.Types;

function getKeys(lists, array) {
	_.forIn(lists, function (value, key) {
		if (lists[key] instanceof Object) {
			if (!_.isEmpty(lists[key])) {
				array = getKeys(lists[key], array)
			} else {
				array.push(key)
			}
		} else {
			array.push(key)
		}
	});

	return array
}

function listNames() {
	var lists = keystone.import('lib/models')
	var listNames = []
	listNames = lists && getKeys(lists, listNames)

	return listNames;
}

var SecurityPermission = new keystone.List('SecurityPermission', {
	label: 'Permissions',
	autokey: { path: 'key', from: 'name', unique: true },
	track: true
});

SecurityPermission.add({
	name: { type: String, required: true, index: true },
	listName: { type: Types.Select, options: listNames(), required: true, initial: true, index: true },
	permType: { type: Types.Relationship, ref: 'SecurityPermissionType', required: true, initial: true, index: true },
	role: { type: Types.Relationship, ref: 'SecurityRole', many: true, initial: true }
});

SecurityPermission.defaultColumns = 'name, listName, permTypem, role';
SecurityPermission.register();

module.exports = SecurityPermission;
