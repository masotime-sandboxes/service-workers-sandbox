import React, { Component } from 'react';

export default class Html extends Component {
	render() {
		const { props } = this;
		return (<html>
			<head>
				{ /* hardcode these for now */ }
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body>
				{ props.children }
			</body>
		</html>);
	}
}