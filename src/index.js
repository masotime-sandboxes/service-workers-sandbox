import express from 'express';
import opn from 'opn';
import { reactHelloRoute } from 'server/routes';
import { listen } from 'util/express';

async function execute(fn) {
	try {
		await fn();
	} catch (e) {
		console.error(e & e.stack || e);
	}
}

async function main() {
	const app = express();
	const port = process.env.PORT || 3000;

	app.use('/', reactHelloRoute());

	await listen(app, port);
	await opn(`http://localhost:${port}`);	
}

execute(main);