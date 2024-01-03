// middlewares/calculateLevels.js
const Worker = require('../models/worker');

const calculateLevels = async (req, res, next) => {
	try {
		const { lvl1, supervisor } = req.body;

		// Set Lvl 1 and supervisorfor the updated worker
		req.body.lvl1 = lvl1;
		req.body.supervisor = supervisor;

		// Calculate and set lvl2 for the updated worker's supervisor
		if (supervisor) {
			const supervisorWorker = await Worker.findById(supervisor);
			if (supervisorWorker) {
				supervisorWorker.lvl2 = req.body.lvl1;
				await supervisorWorker.save();
			}
		}

		// calculate and set level 3 for supervisor's supervisor
		if (req.body.supervisor) {
			const mySupervisorId = req.body.supervisor;
			const mySupervisor = await Worker.findById(mySupervisorId);
			if (mySupervisor) {
				const seniorSupervisorId = mySupervisor.supervisor;

				const seniorSupervisor = await Worker.findById(seniorSupervisorId);

				seniorSupervisor.lvl3 = req.body.supervisor;
				await seniorSupervisor.save();
			}
		}

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = calculateLevels;
