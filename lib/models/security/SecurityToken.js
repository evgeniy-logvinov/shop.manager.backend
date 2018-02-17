const keystone = require('keystone')
const crypto = require('crypto')
const { promisify } = require('util')
const Types = keystone.Field.Types

const SecurityToken = new keystone.List('SecurityToken', {
  nocreate: true,
  noedit: true
})

SecurityToken.add({
  token: { type: String },
  createdDate: { type: Date, default: Date.now, required: true },
  user: { type: Types.Relationship, ref: 'SecurityUser', required: true }
})

SecurityToken.schema.pre('save', function (next) {
  promisify(crypto.randomBytes)(128).then(
    random => {
      this.token = crypto.createHash('sha256').update(random).digest('base64')
      next()
    }
  )
})

SecurityToken.defaultColumns = 'token, user, createdDate'

SecurityToken.register()
