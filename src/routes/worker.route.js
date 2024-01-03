const router = require('express').Router();
const calculateLevels = require('../middleware/calculate-levels');
const {
	getWorkers,
	registerWorker,
	updateWorker,
} = require('../controllers/worker.controller');

router.get('/', getWorkers);
router.post('/', calculateLevels, registerWorker);
router.put('/:id', calculateLevels, updateWorker);

module.exports = router;
