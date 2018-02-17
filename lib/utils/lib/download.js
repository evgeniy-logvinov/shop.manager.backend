const request = require('request')
const fs = require('fs-extra')
const path = require('path')
const { URL } = require('url')

const intoDirectory = dir => url => new Promise(
    async (resolve, reject) => {
        try {
            const dest = path.join(dir, new URL(url).pathname)
            await fs.ensureDir(path.dirname(dest))

            const writeStream = fs.createWriteStream(dest)

            writeStream.on('finish', () => {
                resolve(dest)
            })

            writeStream.on('error', err => {
                fs.unlink(dest, () => {
                    reject(err)
                })
            })

            const readStream = request.get(url)

            readStream.on('error', err => {
                fs.unlink(dest, () => {
                    reject(err)
                })
            })

            readStream.pipe(writeStream)
        } catch (e) {
            reject(e)
        }
    }
)

module.exports = {
    intoDirectory,
}
