require('./src/config/config').authenticate().then(() => {
	console.log('Connected to database.');

	require('./src/models/user').sync();
	require('./src/models/transaction').sync();
	require('./src/models/balance').sync();
	// Require('./src/models/price').sync();

	const server = require('./src/server.js');
	const app = server();
	const PORT = 8080;
	app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
}).catch(err => {
	console.error('Cannot connect to database', err);
});
