import * as React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useAuth0 } from '@auth0/auth0-react';

import '../App.css';

const Navbar = () => {
	const { user, isAuthenticated } = useAuth0();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		isAuthenticated && (
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						{/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton> */}
						<Typography edge="start" variant="h6" component="div" sx={{ flexGrow: 1 }}>
							BOA-SHEDULER
						</Typography>
						<Typography edge="start" variant="h6" component="div" sx={{ flexGrow: 1 }}>
							<Link
								style={{
									textDecoration: 'none',
									color: '#fff !important',
									paddingRight: '1em !important'
								}}
								to="/"
							>
								Home
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: '#fff !important',
									paddingRight: '1em !important'
								}}
								to="/master-table"
							>
								Master Table
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: '#fff !important',
									paddingRight: '1em !important'
								}}
								to="/employee-table"
							>
								Employee Table
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: '#fff !important',
									paddingRight: '1em !important'
								}}
								id="basic-button"
								aria-controls="basic-menu"
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
								to="#"
							>
								Brand Table
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									color: '#fff !important',
									paddingRight: '1em !important'
								}}
								to="/store-table"
							>
								Store Table
							</Link>
							<Menu
								className="dropdown-link"
								id="basic-menu"
								anchorEl={anchorEl}
								disableAutoFocusItem
								PaperProps={{
									style: {
										width: '150px',
										padding: '20px',
										marginTop: '10px',
										border: '3px solid #3f51b5'
									}
								}}
								MenuListProps={{
									style: {
										padding: '10px'
									}
								}}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
							>
								<MenuItem onClick={handleClose}>
									<Link className="dropdown-link" to="/badel-table">
										Badel products
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link className="dropdown-link" to="/megle-table">
										Megle products
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link className="dropdown-link" to="/wm-table">
										WM2 products
									</Link>
								</MenuItem>
							</Menu>
						</Typography>

						<img className="user-sm" src={user.picture} alt={user.name} />
						<p className="email-nav">{user.email}</p>
						<LogoutButton />
					</Toolbar>
				</AppBar>
			</Box>

			/* 	<nav className="navbar navbar-inverse navbar-fixed-top">
				<h5>BOA SCHEDULER</h5>
				<LogoutButton />
				
			</nav> */
		)
	);
};

export default Navbar;
