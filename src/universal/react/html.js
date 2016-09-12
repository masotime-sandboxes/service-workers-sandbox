import React, { Component } from 'react';

export default class Html extends Component {
	render() {
		const { props } = this;
		return (<html>
			<head>
				{ /* hardcode these for now */ }
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
				<link rel="stylesheet" href="css/styles.css" />
				{ /* <link rel="manifest" href="json/manifest.json" /> */ }
				<title>Push Notifications codelab</title>
			</head>
			<body>
				{ props.children }
			</body>
		</html>);
	}
}