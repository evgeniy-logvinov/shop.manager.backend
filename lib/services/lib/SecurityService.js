const keystone = require('keystone')
const { promisify } = require('util')
const { WebError } = requireRoot('lib/errors')

const SecurityUser = keystone.list('SecurityUser').model
const SecurityToken = keystone.list('SecurityToken').model
const SecurityPermission = keystone.list('SecurityPermission').model

class SecurityService {

  async login({ email, password }) {
    const user = await SecurityUser.findOne({ email }).exec()
    if (!user) {
      throw new WebError('Wrong credentials', 401)
    }
    if (!await promisify(user._.password.compare)(password)) {
      throw new WebError('Wrong credentials', 401)
    }
    const token = await SecurityToken.create({
      user: user
    })
    return SecurityToken.findOne({
      _id: token._id
    }).populate('user')
      .exec()
  }

  async token({ token }) {
    if (!token || token.indexOf('Bearer ') !== 0) {
      throw new WebError('Wrong credentials', 401)
    }

    return SecurityToken
      .findOne({
        token: token.substring('Bearer '.length)
      })
      .populate({
        path: 'user'
      })
      .exec()
  }

  async logout({ token }) {
    if (token.indexOf('Bearer ') !== 0) {
      throw new WebError('Wrong credentials', 401)
    }
    const result = await SecurityToken.findOne({
      token: token.substring('Bearer '.length)
    }).populate('user')
      .exec()
    if (!result) {
      throw new WebError('Wrong credentials', 401)
    }
    result.remove()
    return result
  }

  async permissions({ roleId }) {
    if (!roleId) {
      throw new WebError('Wrong credentials', 401)
    }

    return SecurityPermission
      .find({ role: roleId })
      .select('listName permType -_id')
      .exec()
  }

  async hasAuthority({ token, scopes }) {
    if (_.isEmpty(scopes)) {
      throw new WebError('Wrong credentials', 401)
    }

    return this.token({ token: token })
      .then(token => {
        if (token) {
          return this.permissions({ roleId: token.user.role }).then(rolePerms => {
            return this.hasPermission({ scopes: scopes, rolePerms: rolePerms })
          })
        } else {
          throw new WebError('Wrong credentials', 401)
        }
      })
  }

  async hasPermission({ scopes, rolePerms }) {
    if (!rolePerms || rolePerms.length == 0 || !scopes) {
      throw new WebError('Wrong credentials', 401)
    }

    const containsPerms = []
    for (let key in scopes) {
      rolePerms.forEach(rolePerm => {
        if (rolePerm.listName == key &&
          rolePerm.permType == scopes[key]) {
          containsPerms.push(rolePerm)
        }
      })
    }

    if (containsPerms && containsPerms.length == Object.keys(scopes).length) {
      return true
    } else {
      throw new WebError('Wrong credentials', 401)
    }
  }
}

module.exports = SecurityService
