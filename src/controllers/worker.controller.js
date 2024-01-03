const Worker = require('../models/worker');
const createError = require('http-errors');
const workerValidationSchema = require('../middleware/validate-worker');
const { ObjectId } = require('mongoose').Types;

exports.getWorkers = async (req, res, next) => {
	try {
		const workers = await Worker.find();
		if (!workers) {
			throw createError.NotFound('No workers found');
		}

		return res.status(200).json({
			success: true,
			message: 'Fetched all workers',
			data: workers,
		});
	} catch (error) {
		next(error);
	}
};

exports.registerWorker = async (req, res, next) => {
	try {
		const {
			firstName,
			lastName,
			email,
			lvl1,
			supervisor,
			superCommissionPermitted,
			street,
			city,
			IBAN,
		} = req.body;

		const result = await workerValidationSchema.validateAsync(req.body);
		//check for existing worker
		const workerExists = await Worker.findOne({ email: result.email });
		if (workerExists) {
			throw createError.Conflict(`${result.email} is already registered`);
		}

		const worker = new Worker({
			firstName: result.firstName,
			lastName: result.lastName,
			email: result.email,
			lvl1: result.lvl1,
			supervisor: result.supervisor,
			superCommissionPermitted: result.superComissionPermitted,
			street: result.street,
			city: result.city,
			IBAN: result.IBAN,
		});

		const savedWorker = await worker.save();
		return res.status(201).json({
			success: true,
			message: 'Worker registered successfully',
			data: savedWorker,
		});
	} catch (error) {
		next(error);
	}
};

exports.updateWorker = async (req, res, next) => {
	try {
		const workerId = req.params.id;

		if (!ObjectId.isValid(workerId)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid worker Id',
			});
		}

		const {
			firstName,
			lastName,
			email,
			lvl1,
			supervisor,
			superCommissionPermitted,
			street,
			city,
			IBAN,
		} = req.body;

		const worker = await Worker.findByIdAndUpdate(workerId, req.body, {
			new: true,
		});

		if (!worker) {
			throw createError.NotFound('Worker with this Id does not exist');
		}

		return res.status(200).json({
			success: true,
			message: 'Updated worker successfully',
			data: worker,
		});
	} catch (error) {
		next(error);
	}
};
