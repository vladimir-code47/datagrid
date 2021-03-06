import React, { useState, useEffect } from 'react';
import './App.css';
import 'ag-grid-enterprise';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core';
import FormDialog from './components/dialog';
const initialValue = { name: '', email: '', phone: '', dob: '' };
function App() {
	const [ gridApi, setGridApi ] = useState(null);
	const [ gridColumnApi, setGridColumnApi ] = useState(null);
	const [ tableData, setTableData ] = useState(null);
	const [ open, setOpen ] = React.useState(false);
	const [ formData, setFormData ] = useState(initialValue);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFormData(initialValue);
	};
	const url = `http://localhost:4700/users`;

	/* const columnDefs = [
		{ headerName: 'ID', field: 'id', hide: true },
		{ headerName: 'Employee', field: 'name', enableRowGroup: true, type: 'rightAligned' },
		{ headerName: 'Week', field: 'week', enableRowGroup: true, type: 'rightAligned', width: 90 },
		{ headerName: 'Day', field: 'day', enableRowGroup: true, type: 'rightAligned', width: 120 },
		{ headerName: 'Date', field: 'dob', hide: true },
		{ headerName: 'Region', field: 'region', enableRowGroup: true, type: 'rightAligned', width: 100 },
		{ headerName: 'Store', field: 'storeName', enableRowGroup: true, type: 'rightAligned', width: 100 },
		{ headerName: 'Address', field: 'storeAddress', enableRowGroup: true, type: 'rightAligned', width: 200 },
		{
			headerName: 'Badel products',
			field: 'badelProducts',
			enableRowGroup: true,
			type: 'rightAligned',
			width: 300
		},
		{ headerName: 'WM2 products', field: 'wmProducts', enableRowGroup: true, type: 'rightAligned', width: 300 },
		{
			headerName: 'All Products',
			field: 'products',
			valueGetter: 'chainValueGetter',
			type: 'rightAligned',
			enableRowGroup: true,
			autoHeight: true,
			width: 200
		},

		{
			headerName: 'EDIT',
			field: 'id',
			pinned: 'left',
			width: 200,
			cellRendererFramework: (params) => (
				<div>
					<Button margin="dense" variant="text" color="primary" onClick={() => handleUpdate(params.data)}>
						Update
					</Button>
					<Button margin="dense" variant="text" color="secondary" onClick={() => handleDelete(params.value)}>
						Delete
					</Button>
				</div>
			)
		}
	]; */
	// calling getUsers function for first time
	useEffect(() => {
		getUsers();
	}, []);

	//fetching user data from server
	const getUsers = () => {
		fetch(url).then((res) => res.json()).then((res) => setTableData(res));
	};
	const onChange = (e) => {
		const { value, id } = e.target;
		// console.log(value,id)
		setFormData({ ...formData, [id]: value });
	};

	const onGridReady = (params) => {
		setGridApi(params);
		setGridColumnApi(params.columnApi);
		//params.api.sizeColumnsToFit();
	};

	// setting update row data to form data and opening pop up window
	const handleUpdate = (oldData) => {
		setFormData(oldData);
		handleClickOpen();
	};
	//deleting a user
	const handleDelete = (id) => {
		const confirm = window.confirm('Are you sure, you want to delete this row', id);
		if (confirm) {
			fetch(url + `/${id}`, { method: 'DELETE' }).then((resp) => resp.json()).then((resp) => getUsers());
		}
	};
	const handleFormSubmit = () => {
		if (formData.id) {
			//updating a user
			const confirm = window.confirm('Are you sure, you want to update this row ?');
			confirm &&
				fetch(url + `/${formData.id}`, {
					method: 'PUT',
					body: JSON.stringify(formData),
					headers: {
						'content-type': 'application/json'
					}
				})
					.then((resp) => resp.json())
					.then((resp) => {
						handleClose();
						getUsers();
					});
		} else {
			// adding new user
			fetch(url, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'content-type': 'application/json'
				}
			})
				.then((resp) => resp.json())
				.then((resp) => {
					handleClose();
					getUsers();
				});
		}
	};

	const defaultColDef = {
		flex: 1,
		//minWidth: 100,

		sortable: true,
		resizable: true,
		filter: true,
		floatingFilter: true
	};

	function onFirstDataRendered(params) {
		const allColumnIds = [];
		if (this.gridColumnApi) {
			this.gridColumnApi.getAllDisplayedColumns().forEach((column) => {
				allColumnIds.push(column.colId);
			});
			this.gridColumnApi.autoSizeColumns(allColumnIds);
		}
		console.log(allColumnIds);
	}
	var chainValueGetter = function(params) {
		if (undefined || !params.data.badelProducts || !params.data.wmProducts) {
			return 'Products are undefined';
		} else {
			return params.data.badelProducts + '+' + params.data.wmProducts;
		}
	};
	const rowGroupPanelShow = 'always';

	return (
		<div className="App">
			<h1 align="center">React-App</h1>
			<h3>CRUD Operation with Json-server in ag-Grid</h3>
			<Grid align="left">
				<Button
					variant="contained"
					color="primary"
					style={{ position: 'absolute', top: '0' }}
					onClick={handleClickOpen}
				>
					New row
				</Button>
			</Grid>
			<div className="ag-theme-alpine" style={{ width: '100%', height: '75vh' }}>
				<AgGridReact
					rowData={tableData}
					//columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					autoGroupColumnDef={{ minWidth: 200 }}
					animateRows={true}
					rowGroupPanelShow={'always'}
					onGridReady={onGridReady}
					onFirstDataRendered={onFirstDataRendered}
					rowDragManaged={true}
					style={{ width: '100%', height: '100%;' }}
				>
					<AgGridColumn
						headerName="Edit"
						field="id"
						rowDrag={true}
						suppressSizeToFit={false}
						cellRendererFramework={(params) => (
							<div>
								<Button
									margin="dense"
									variant="text"
									color="primary"
									onClick={() => handleUpdate(params.data)}
								>
									Update
								</Button>
								<Button
									margin="dense"
									variant="text"
									color="secondary"
									onClick={() => handleDelete(params.value)}
								>
									Delete
								</Button>
							</div>
						)}
					/>
					<AgGridColumn
						headerName="Employee"
						field="name"
						suppressSizeToFit={false}
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
					/>
					<AgGridColumn
						field="week"
						rowGroup={false}
						enableRowGroup={true}
						width={100}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="day"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={120}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="region"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={100}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="storeName"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={140}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="storeAddress"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={200}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="badelProducts"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={600}
						suppressSizeToFit={false}
						color="secondary"
					/>
					<AgGridColumn
						field="wmProducts"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						width={600}
						suppressSizeToFit={false}
					/>
					<AgGridColumn
						field="products"
						rowGroup={false}
						enableRowGroup={true}
						hide={false}
						suppressSizeToFit={false}
						width={600}
						colId="products"
						valueGetter={chainValueGetter}
					/>
				</AgGridReact>
			</div>
			<FormDialog
				open={open}
				handleClose={handleClose}
				data={formData}
				onChange={onChange}
				handleFormSubmit={handleFormSubmit}
			/>
		</div>
	);
}

export default App;
