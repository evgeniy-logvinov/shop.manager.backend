const { findRole, pushRole } = requireRoot('lib/utils/security')

function createUserPermissions() {
    return Promise.all([findRole({
        name: 'User',
    }).then(roles =>
        roles.forEach(role =>
            Promise.all([
				pushRole({ permName: 'manage Basket', roleId: role._id }),
				pushRole({ permName: 'view Product', roleId: role._id }),
				pushRole({ permName: 'view SecurityUser', roleId: role._id }),
            ]))
    )])
}

module.exports.createUserPermissions = createUserPermissions
