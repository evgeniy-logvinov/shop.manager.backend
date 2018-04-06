const { createUsers,
    createRoles,
    createPermissionTypes,
    createAdminUIPermission,
    createShopPermission,
    createAdminPermissions,
    createUserPermissions } = requireRoot('updates/lib')

module.exports = done => {
    Promise.all([
        createPermissionTypes(),
        createRoles(),
    ])
        .then(() => Promise.all([
            createAdminUIPermission({
                permName: 'view',
            }),
            createAdminUIPermission({
                permName: 'manage',
            }),
            createShopPermission({
                permName: 'view',
            }),
            createShopPermission({
                permName: 'manage',
            }),
        ])
            .then(() => {
                setTimeout(() => {
                    Promise.all([
                        createAdminPermissions(),
                        createUserPermissions(),
                    ])
                        .then(() => Promise.all([
                            createUsers(),
                        ])
                            .then(() => {
                                done()
                            }))
                }, 1000)
            }))
}
