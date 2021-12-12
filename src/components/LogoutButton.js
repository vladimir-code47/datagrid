import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '@material-ui/core/Button';

const LogoutButton = () => {
	const { logout, isAuthenticated } = useAuth0();
	return (
		isAuthenticated && (
			<Button color="secondary" variant="contained" onClick={() => logout()}>
				Logout
			</Button>
		)
	);
};

export default LogoutButton;
