import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	console.log(`rest: ${JSON.stringify(rest)}`);
	return (
		<Route
			{...rest}
			render={props =>
				rest.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/spotify" />
				)
			}
		/>
	);
};

export default PrivateRoute;
