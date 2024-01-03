const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const workerRoute = require('./routes/worker.route');
const createError = require('http-errors');
const errorHandler = require('./middleware/error-handler');
require('./config/db.config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/workers', workerRoute);

app.get('/health', (req, res) => {
	return res.json({
		success: true,
		message: 'Server is up',
	});
});

// Handle 404 errors
app.use(async (req, res, next) => {
	next(createError.NotFound('Resource not found'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
	console.log(`App started on port ${PORT}`);
});
