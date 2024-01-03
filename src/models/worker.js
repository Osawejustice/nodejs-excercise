const { boolean, string } = require('joi');
const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	lvl1: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Worker',
		default: null,
	},
	supervisor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Worker',
		default: null,
	},
	lvl2: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Worker',
	},
	lvl3: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Worker',
	},
	superCommissionPermitted: {
		type: Boolean,
		default: false,
	},
	street: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	IBAN: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Worker', workerSchema);
