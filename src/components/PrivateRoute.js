import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				rest.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect to="/spotify" />
				)
			}
		/>
	);
};

export default withRouter(PrivateRoute);
