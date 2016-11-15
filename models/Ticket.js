var keystone = require('keystone');
var Types = keystone.Field.Types;

var Ticket = new keystone.List('Ticket', {
	autokey: { from: 'title', path: 'slug', unique: true},
	searchFields: 'description',
	track: { updatedAt: true}
});

Ticket.add({
	title: { type: String, initial: true, default: '', required: true },
	description: { type: Types.Textarea },
	product: { type: Types.Relationship, ref: 'Product', index: true, default: "", many: false},
	priority: { type: Types.Select, options: 'Low, Medium, High', default: 'Low' },
	category: { type: Types.Select, options: 'Bug, Feature, Enhancement', default: 'Bug' },
	status: { type: Types.Select, options: 'New, In Progress, Open, On Hold, Declined, Closed', default: 'New' },
	createdBy: { type: Types.Relationship, ref: 'User', index: true, default: "", many: false , filters: { isAdmin: true }},
	assignedTo: { type: Types.Relationship, ref: 'User', index: true, default: "Not assigned yet.", many: false },
	createdAt: { type: Types.Datetime, default: Date.now },
	updatedAt: { type: Types.Datetime, default: Date.now },
	tags: { type: Types.Relationship, ref: 'Tag', many: true },
	similarTicket: { type: Types.Relationship, ref: 'Ticket', filters: { category: ':category'}}
});

Ticket.defaultSort = '-createdAt';
Ticket.defaultColumns = 'title|20%, status|15%, createdBy, assignedTo, createdAt';

Ticket.schema.virtual('url').get(function(){
	return '/tickets/' + this.slug;
})

Ticket.register();