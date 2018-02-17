const download = require('./lib/download')
const sheetToJson = require('./lib/excel')
const { getObjectsWithId } = require('./lib/object')

const {
    strContains,
    strEquals,
} = require('./lib/string')

module.exports = {
    download,
    sheetToJson,
    strContains,
    strEquals,
    getObjectsWithId
}
