const keystone = require('@eklogvinov/keystone')

const Product = new keystone.List('Product', {
	label: 'Product',	
    track: true
})

Product.add({
	name: { type: String, required: true, index: true }	
});

Product.relationship({ ref: 'ProductInBasket', refPath: 'product', path: 'productInBasket' });

Product.defaultColumns = 'name'
Product.register()