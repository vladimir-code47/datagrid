import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MasterTable from './components/Mastertable';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import StoreTable from './components/StoreTable';
import EmployeeTable from './components/EmployeeTable';
import BadelTable from './components/BadelTable';

function App() {
	const { isLoading } = useAuth0();
	if (isLoading) return <div>Loading...</div>;

	return (
		<Router>
			<LoginButton />
			<Navbar />
			<Switch>
				<Route exact path="/">
					<Profile />
				</Route>
				<Route path="/master-table">
					<MasterTable />
				</Route>
				<Route path="/employee-table">
					<EmployeeTable />
				</Route>
				<Route path="/badel-table">
					<BadelTable />
				</Route>
				<Route path="/store-table">
					<StoreTable />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
