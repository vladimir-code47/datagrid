import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
	const [ gridApi, setGridApi ] = useState(null);
	const [ gridColumnApi, setGridColumnApi ] = useState(null);
	const [ rowData, setRowData ] = useState(null);

	const onGridReady = (params) => {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);

		const updateData = (data) => {
			setRowData(data);
		};

		fetch('http://localhost:4700/users').then((resp) => resp.json()).then((data) => updateData(data));
	};

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div
				id="myGrid"
				style={{
					height: '100%',
					width: '100%'
				}}
				className="ag-theme-alpine"
			>
				<AgGridReact
					defaultColDef={{
						flex: 1,
						minWidth: 100,
						sortable: true,
						resizable: true
					}}
					autoGroupColumnDef={{ minWidth: 200 }}
					animateRows={true}
					rowGroupPanelShow={'always'}
					onGridReady={onGridReady}
					rowData={rowData}
				>
					<AgGridColumn field="name" rowGroup={true} enableRowGroup={true} hide={true} />
					<AgGridColumn field="week" rowGroup={true} enableRowGroup={true} hide={true} />
					<AgGridColumn field="day" enableRowGroup={true} />
					<AgGridColumn field="region" />
					<AgGridColumn field="storeAddress" />
					<AgGridColumn field="storeName" />
				</AgGridReact>
			</div>
		</div>
	);
};

//render(<GridExample></GridExample>, document.querySelector('#root'));
export default GridExample;
