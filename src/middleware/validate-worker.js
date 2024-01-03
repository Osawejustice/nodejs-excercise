const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const workerValidationSchema = Joi.object({
	firstName: Joi.string().trim().required().min(3),
	lastName: Joi.string().trim().required().min(3),
	email: Joi.string().trim().email().lowercase().required(),
	lvl1: Joi.objectId(),
	supervisor: Joi.objectId(),
	superCommissionPermitted: Joi.boolean(),
	street: Joi.string().trim().required(),
	city: Joi.string().trim().required(),
	IBAN: Joi.string().trim().required().min(13).max(34),
});

module.exports = workerValidationSchema;
