import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { BatchCollection } from '../types';
import { useQuery } from '@tanstack/react-query'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
];

const rows = [
  { id: 1, name: 'Snow', status: '60%'},
  { id: 2, name: 'Lannister', status: '0%'},
  { id: 3, name: 'Lannister', status: '0%'},
  { id: 4, name: 'Stark', status: 'done'},
  { id: 5, name: 'Targaryen', status: '0%'},
  { id: 6, name: 'Melisandre', status: null},
  { id: 7, name: 'Clifford', status: '0%'},
  { id: 8, name: 'Frances', status: '0%'},
  { id: 9, name: 'Roxie', status: '0%'},
];

const BatchTable = () => {
  const [batches, setBatches] = useState<BatchCollection>([]);

  async function fetchBatches (){
  }

  const { isLoading, isError, data, error } = useQuery(['batches'], fetchBatches)

  if (isError) {
    return <div>Error: {error}</div>;
  } else if (!isLoading) {
    return <div>Loading...</div>;
  } else {
    const rows = batches.map((batch) => {
      id: batch.id
      name: batch.name

    })

    return (
      <div style={{ height: 370, width: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    )
  }
};

export default BatchTable;


