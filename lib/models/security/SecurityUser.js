const keystone = require('@eklogvinov/keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const SecurityUser = new keystone.List('SecurityUser', {
    label: 'Users',
})

SecurityUser.add({
	name: { type: String, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
}, 'Role', {
    role: { type: Types.Relationship, ref: 'SecurityRole' }
});

// Provide access to Keystone
SecurityUser.schema.virtual('canAccessKeystone').get(function() {
    return this.isAdmin
})

SecurityUser.relationship({ ref: 'Basket', refPath: 'owner', path: 'userOwner' });
SecurityUser.relationship({ ref: 'Basket', refPath: 'friend', path: 'userFriend'});

SecurityUser.defaultColumns = 'name, email, isAdmin'
SecurityUser.register()