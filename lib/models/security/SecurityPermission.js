var keystone = require('keystone');
var Types = keystone.Field.Types;

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
}

function getKeys(lists, array) {
    Object.keys(lists).forEach(function (key, index) {
        if (lists[key] instanceof Object) {
            if (!isEmptyObj(lists[key])) {
                array = getKeys(lists[key], array)
            } else {
                array.push(key)
            }
        } else {
            array.push(key)
        }
    });

    return array
}

function listNames() {
    var lists = keystone.import('lib/models')
    var listNames = []

    if (lists) {
        listNames = getKeys(lists, listNames)
    }

    return listNames;
}

var SecurityPermission = new keystone.List('SecurityPermission', {
    label: 'Permissions',
    autokey: { path: 'key', from: 'name', unique: true },
    track: true
});

SecurityPermission.add({
    name: { type: String, required: true, index: true },
    listName: { type: Types.Select, options: listNames(), required: true, initial: true, index: true },
    permType: { type: Types.Select, options: ['create', 'read', 'update', 'delete'], required: true, initial: true, index: true },
    role: { type: Types.Relationship, ref: 'SecurityRole', many: true, initial: true }
});

SecurityPermission.defaultColumns = 'name, listName, permTypem, role';
SecurityPermission.register();

module.exports = SecurityPermission;