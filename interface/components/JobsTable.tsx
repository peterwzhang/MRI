import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, name: 'Job1', status: 'done'},
  { id: 2, name: 'Steve Jobs', status: 'done'},
  { id: 3, name: 'Jobba the Hut', status: '60%'},
  { id: 4, name: 'Jobascript', status: '30%'},
];

const JobsTable = () => (
    <div style={{ height: 320, width: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
        checkboxSelection
      />
    </div>
);

export default JobsTable;


