const { findPermType, addPermission } = requireRoot('lib/utils/security')

function createAdminUIPermission({
    permName,
}) {
    return Promise.all([
        findPermType({
            name: permName,
        }).then(permTypes => {
            permTypes.forEach(permType =>
                Promise.all([
                    addPermission({ permName, listName: 'SecurityPermission', permTypeId: permType._id }),
                    addPermission({ permName, listName: 'SecurityRole', permTypeId: permType._id }),
                    addPermission({ permName, listName: 'SecurityUser', permTypeId: permType._id }),
                    addPermission({ permName, listName: 'SecurityPermissionType', permTypeId: permType._id }),
                ]))
        }),
    ])
}

module.exports.createAdminUIPermission = createAdminUIPermission
