const _ = require('lodash')
const keystone = require('@eklogvinov/keystone')
const {
	promisify
} = require('util')
const {
	WebError
} = requireRoot('lib/errors')

class AbstractService {
	getObjectWithId(object) {
		if (object) {
			object.id = object._id
			delete object._id
			return object
		} else {
			new WebError('Empty object')
		}
	}
}

module.exports = AbstractService
