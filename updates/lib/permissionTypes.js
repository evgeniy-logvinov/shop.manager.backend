const keystone = require('@eklogvinov/keystone')
const SecurityPermissionType = keystone.list('SecurityPermissionType').model

function createPermissionTypes() {
    return Promise.all([
        new SecurityPermissionType({
            name: 'view',
        })
            .save()
            .then(spt =>
                new SecurityPermissionType({
                    name: 'manage',
                    permType: [spt._id],
                }).save()),
    ])
}

module.exports.createPermissionTypes = createPermissionTypes
