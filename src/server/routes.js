import { Router } from 'express';
import * as Render from 'server/render';

export function helloRoute() {
	const router = Router();

	router.get('/', (req, res) => {
		const { name = 'world' } = req.query;
		res.end(Render.hello(name));
	});

	return router;
}

export function reactHelloRoute() {
	const router = Router();

	router.get('/', (req, res) => {
		const { name = 'world' } = req.query;
		res.end(Render.reactHello(name));
	})
	return router;
}