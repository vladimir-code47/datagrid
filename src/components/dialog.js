import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
	const { id, name, week, day, dob, region, storeName, storeAddress, badelProducts, wmProducts, products } = data;

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{id ? 'Update user' : 'Create new user'}</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							id="name"
							value={name}
							onChange={(e) => onChange(e)}
							placeholder="Enter name"
							label="Name"
							margin="dense"
							fullWidth
							variant="standard"
						/>
						<TextField
							id="week"
							value={week}
							onChange={(e) => onChange(e)}
							placeholder="Enter week"
							label="Week"
							margin="dense"
							variant="standard"
						/>
						<TextField
							id="day"
							value={day}
							onChange={(e) => onChange(e)}
							placeholder="Enter day"
							label="Day"
							margin="dense"
							variant="standard"
						/>
						<TextField
							id="region"
							value={region}
							onChange={(e) => onChange(e)}
							placeholder="Enter region"
							label="Region"
							margin="dense"
							variant="standard"
						/>
						<TextField
							id="storeName"
							value={storeName}
							onChange={(e) => onChange(e)}
							placeholder="Enter Store Name"
							label="Store Name"
							margin="dense"
							variant="standard"
						/>
						<TextField
							id="storeAddress"
							value={storeAddress}
							onChange={(e) => onChange(e)}
							placeholder="Enter Store Address"
							label="Store Address"
							margin="dense"
							fullWidth
							variant="standard"
						/>
						<TextField
							id="badelProducts"
							value={badelProducts}
							onChange={(e) => onChange(e)}
							placeholder="Enter Badel Products"
							label="Badel Products"
							margin="dense"
							fullWidth
							variant="standard"
						/>
						<TextField
							id="wmProducts"
							value={wmProducts}
							onChange={(e) => onChange(e)}
							placeholder="Enter WM2 Products"
							label="WM2 Products"
							margin="dense"
							fullWidth
							variant="standard"
						/>
						{/* <TextField
							id="dob"
							value={dob}
							onChange={(e) => onChange(e)}
							placeholder="Enter Date of birth"
							label="Date of Birth"
							margin="dense"
							fullWidth
							variant="standard"
						/> */}
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary" variant="outlined">
						Cancel
					</Button>
					<Button color="primary" onClick={() => handleFormSubmit()} variant="contained">
						{id ? 'Update' : 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
