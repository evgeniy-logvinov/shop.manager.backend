const keystone = require('keystone')
const SecurityPermission = keystone.list('SecurityPermission').model
const SecurityRole = keystone.list('SecurityRole').model
const SecurityUser = keystone.list('SecurityUser').model

module.exports = done => {
    new SecurityRole({
        name: 'Administrator',
    }).save().then(doc => {
        Promise.all([new SecurityPermission({
            name: 'Delete Permission',
            permType: 'delete',
            listName: 'SecurityPermission',
            role: [keystone.mongoose.Types.ObjectId(doc._id)],
        }).save(), new SecurityPermission({
            name: 'Delete User',
            permType: 'delete',
            listName: 'SecurityUser',
            role: [keystone.mongoose.Types.ObjectId(doc._id)],
        }).save(), new SecurityPermission({
            name: 'Delete Role',
            permType: 'delete',
            listName: 'SecurityRole',
            role: [keystone.mongoose.Types.ObjectId(doc._id)],
        }).save(), new SecurityUser({
            'name.first': 'admin',
            'name.last': 'user',
            email: 'testadmin@test.com',
            password: 'test',
            isAdmin: true,
            role: [keystone.mongoose.Types.ObjectId(doc._id)],
        }).save(), new SecurityUser({
            'name.first': 'custom',
            'name.last': 'user',
            email: 'testcustom@test.com',
            password: 'test',
            isAdmin: true,
        }).save()]).then(() => done())
    })
}