const keystone = require('@eklogvinov/keystone')
const Types = keystone.Field.Types

const Basket = new keystone.List('Basket', {
	label: 'Basket',	
    track: true
})

Basket.add({
	name: { type: String, required: true, index: true },
	owner: { type: Types.Relationship, ref: 'SecurityUser', initial: true },
	friend: { type: Types.Relationship, ref: 'SecurityUser', initial: true, many: true },
});

Basket.defaultColumns = 'name, owner, friend'
Basket.register()
