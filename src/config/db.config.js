const mongoose = require('mongoose');

async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.DB_URI);

		console.log('Connected to database');
	} catch (error) {
		console.error(error.message);
	}
}

connectToDatabase();
