import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from 'universal/react/html';
import App from 'universal/react/pages/App';

export function hello(name) {
	return `Hello ${name}!`;
}

export function reactHello(name) {
	const html = (<Html>
		<App name={name} />
	</Html>);

	return `<!doctype html>${renderToString(html)}`;
}