import React from 'react';
import Html from 'universal/react/html';
import App from 'universal/react/pages/App';

export default function root(props) {
	return (<Html>
		<App {...props} />
	</Html>);
}