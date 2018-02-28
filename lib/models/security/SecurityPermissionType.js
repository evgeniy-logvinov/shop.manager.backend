var keystone = require('keystone')
var Types = keystone.Field.Types

var SecurityPermissionType = new keystone.List('SecurityPermissionType', {
	label: 'Permission type',
	autokey: { path: 'key', from: 'name', unique: true },
	track: true
});

SecurityPermissionType.add({
	name: { type: String, required: true, index: true },
	permType: { type: Types.Relationship, ref: 'SecurityPermissionType', many: true }
});

SecurityPermissionType.relationship({ ref: 'SecurityPermissionType', refPath: 'permType', path: 'permType'});

SecurityPermissionType.defaultColumns = 'name, permType';
SecurityPermissionType.register();
