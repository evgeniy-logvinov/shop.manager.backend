const { findPermType, addPermission } = requireRoot('lib/utils/security')

function createShopPermission({
	permName
}) {
	return Promise.all([
		findPermType({
			name: permName
		}).then((permTypes) => {
			permTypes.forEach(permType =>
				Promise.all([
					addPermission({ permName, listName: 'Basket', permTypeId: permType._id }),
					addPermission({ permName, listName: 'Product', permTypeId: permType._id }),
					addPermission({ permName, listName: 'ProductInBasket', permTypeId: permType._id }),
				]))
		})
	])
}

module.exports.createShopPermission = createShopPermission
