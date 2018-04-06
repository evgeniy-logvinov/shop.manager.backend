const keystone = require('@eklogvinov/keystone')
const SecurityRole = keystone.list('SecurityRole').model

function createRoles() {
    return Promise.all([
        new SecurityRole({
            name: 'Administrator',
        }).save(),
        new SecurityRole({
            name: 'User',
        }).save(),
    ])
}

module.exports.createRoles = createRoles
