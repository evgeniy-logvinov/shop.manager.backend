const XLSX = require('xlsx')

function sheetToJson(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath)
    let result = {}
    workbook.SheetNames.forEach(name => {
        if (name === sheetName) {
            result = XLSX.utils.sheet_to_json(workbook.Sheets[name])
        }
    })
    return result
}

module.exports = (filePath, sheetName) => sheetToJson(filePath, sheetName)
