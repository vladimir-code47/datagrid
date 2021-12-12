import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';

const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	return (
		isAuthenticated && (
			<div>
				<div className="profile">
					{/* <JSONPretty data={user} /> */}
					<h4>Hello {user.name}</h4>

					{/* JSON.stringify(user, null, 2 */}
				</div>
				<div className="table-nav">
					<Button color="secondary" variant="contained" fullWidth marginBottom={3}>
						<Link to="/master-table">Master Table (editable, exportable)</Link>
					</Button>
					<Button color="primary" variant="contained" fullWidth>
						<Link to="/employee-table">Employee Table (exportable)</Link>
					</Button>
					<Button color="primary" variant="contained" fullWidth>
						<Link to="/brand-table">Single Brand Products Table (exportable)</Link>
					</Button>

					<Button color="primary" variant="contained" fullWidth>
						<Link to="/store-table">Store Table (exportable)</Link>
					</Button>
				</div>
			</div>
		)
	);
};

export default Profile;
