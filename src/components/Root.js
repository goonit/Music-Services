import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import App from '../App';

export default class Root extends Component {
	render() {
		const { store } = this.props;

		return (
			
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired
	// history: PropTypes.object.isRequired
};
