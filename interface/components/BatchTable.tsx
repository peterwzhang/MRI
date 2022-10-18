import { DataGrid, GridColDef, GridSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { MouseEventHandler, useEffect, useState } from 'react';
import { BatchCollection } from '../types';
import styled from 'styled-components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'status', headerName: 'Status', width: 160 },
  { field: 'reqApproval', headerName: 'Req Approval?', width: 130 },
  { field: 'script', headerName: 'Script', width: 130 },
  { field: 'start', headerName: 'Start Time', width: 210 },
];

const BatchTable = ({batches, handleSelect, handleCancel} : {batches : BatchCollection, 
  handleSelect: (selection : GridSelectionModel) => void, handleCancel: (selection : GridSelectionModel) => void}) => {
    
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const rows = batches.map((batch) => (
    { 
      id: batch.id, 
      name: batch.name, 
      status: batch.status,
      reqApproval: batch.requiresApprovalStep ? 'Yes' : 'No',
      script: batch.scriptUsed.name,
      start: batch.startedAt,
    })
  )

  return (
    <Wrapper>
      <div style={{ height: (56*(Math.min(batches.length, 5) + 2)), width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </div>
      <Buttons>
          <Button onClick={() => handleSelect(selectionModel)}>View</Button>
          <Button onClick={() => handleCancel(selectionModel)}>Cancel</Button>
      </Buttons>
    </Wrapper>
  )
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    font-size: 1rem;
`
const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    min-width: 7rem;
`
const Button = styled.button`
    border-width: .05rem;
    border-radius: .5rem;
    padding: 1rem;
    width: 80%;
    font-size: 1rem;
`

export default BatchTable;


