import React, { Component } from 'react';

export default class App extends Component {
	render() {
		const { props } = this;
		return <p>Hello {props.name}!</p>;
	}
}
