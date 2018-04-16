const { findRole, pushRole } = requireRoot('lib/utils/security')

function createAdminPermissions() {
    return Promise.all([
        findRole({
            name: 'Administrator',
        }).then(roles =>
            roles.forEach(role =>
                Promise.all([
                    pushRole({ permName: 'manage SecurityPermission', roleId: role._id }),
                    pushRole({ permName: 'manage SecurityRole', roleId: role._id }),
                    pushRole({ permName: 'manage SecurityUser', roleId: role._id }),
                    pushRole({ permName: 'manage SecurityPermissionType', roleId: role._id }),
                    pushRole({ permName: 'manage Basket', roleId: role._id }),
                    pushRole({ permName: 'manage Product', roleId: role._id }),                    
                    pushRole({ permName: 'manage ProductInBasket', roleId: role._id }),                    
                ]))
        ),
    ])
}

module.exports.createAdminPermissions = createAdminPermissions
