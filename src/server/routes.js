import { Router } from 'express';
import { renderToString } from 'react-dom/server';

import root from 'universal/react/root';

export default function routes() {
	const router = Router();

	router.get('/', (req, res) => {
		const { name = 'world' } = req.query;
		const component = root({ name });
		res.end(`<!doctype html>${renderToString(component)}`);
	});

	return router;
}