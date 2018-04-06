const keystone = require('@eklogvinov/keystone')

const Product = new keystone.List('Product', {
	label: 'Product',	
    track: true
})

Product.add({
	name: { type: String, required: true, index: true }	
});

Product.relationship({ ref: 'Basket', refPath: 'product', path: 'basketWithProduct' });

Product.defaultColumns = 'name'
Product.register()