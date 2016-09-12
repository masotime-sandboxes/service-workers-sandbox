import express from 'express';
import expressBabel from 'express-babel';

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
	const babelOpts = {
		presets: ['stage-0', 'es2015']
	};

	app.use('/js', expressBabel('build/js', babelOpts));
	['css', 'json'].forEach(folder => app.use(`/${folder}`, express.static(`build/${folder}`)));
	app.use('/', reactHelloRoute());

	await listen(app, port);

	console.log('Ready');
}

execute(main);