import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
	<Box component="span" sx={{ display: 'inline-block', mx: '4px', transform: 'scale(0.8)' }}>
		•
	</Box>
);

const LoginButton = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		!isAuthenticated && (
			<div className="profile">
				<div className="table-nav">
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								Word of the Day
							</Typography>
							<Typography variant="h5" component="div">
								BOA{bull}SCHEDULER
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								noun
							</Typography>
							<Typography variant="body2">
								"computing a computer program designed to aid in scheduling tasks"
								<br />
							</Typography>
						</CardContent>
						<CardActions>
							<Button color="primary" fullWidth variant="contained" onClick={() => loginWithRedirect()}>
								Login
							</Button>
						</CardActions>
					</Card>
				</div>
			</div>
		)
	);
};

export default LoginButton;
