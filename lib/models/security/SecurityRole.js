var keystone = require('keystone');

var SecurityRole = new keystone.List('SecurityRole', {
    label: 'Role',
    autokey: { path: 'key', from: 'name', unique: true },
    track: true
});

SecurityRole.add({
    name: { type: String, required: true, index: true }
});

// Relationship definitions are optional
SecurityRole.relationship({ ref: 'SecurityUser', refPath: 'role', path: 'usersWithRole' });
SecurityRole.relationship({ ref: 'SecurityPermission', refPath: 'role', path: 'role'});

SecurityRole.defaultColumns = 'name';
SecurityRole.register();