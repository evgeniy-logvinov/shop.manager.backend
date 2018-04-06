const { createRoles } = require('./roles')
const { createPermissionTypes } = require('./permissionTypes')
const { createAdminUIPermission, createShopPermission } = require('./permissions')
const { createUsers, createAdminPermissions, createUserPermissions } = require('./users')

module.exports = {
    createUsers,
    createRoles,
    createPermissionTypes,
    createAdminUIPermission,
    createShopPermission,
    createAdminPermissions,
    createUserPermissions,
}
