import express from 'express';

import routes from 'server/routes';
import * as config from 'server/webpack';
import { listen, webpackMiddleware } from 'util/express';

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

	app.use(webpackMiddleware({
		compiler: config.compiler,
		middleware: config.middleware
	}));

	app.use('/css', express.static('build/css'));
	app.use('/json', express.static('build/json'));
	app.use('/', routes());

	await listen(app, port);

	console.log('Ready');
}

execute(main);