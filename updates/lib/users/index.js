const { createUsers } = require('./lib/users')
const { createAdminPermissions } = require('./lib/adminPermissions')
const { createUserPermissions } = require('./lib/userPermissions')

module.exports = {
    createUsers,
    createAdminPermissions,
    createUserPermissions,
}
