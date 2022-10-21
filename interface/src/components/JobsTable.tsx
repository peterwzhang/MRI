import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { JobCollection } from "../types";

// TODO: test once test batches are submitted

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "slurmId", headerName: "Name", width: 130 },
  { field: "state", headerName: "State", width: 130 },
  { field: "slurmState", headerName: "Slurm State", width: 130 },
  { field: "identifier", headerName: "Identifier", width: 130 },
  { field: "specialJobType", headerName: "Special Job Type", width: 130 },
  { field: "queuedTime", headerName: "Queued Time", width: 130 },
  { field: "startTime", headerName: "Start Time", width: 130 },
  { field: "endTime", headerName: "End Time", width: 130 },
  { field: "timeLimit", headerName: "Time Limit", width: 130 },
  { field: "nodeList", headerName: "Node List", width: 130 },
  { field: "exitCode", headerName: "Exit Code", width: 130 },
  { field: "lastSync", headerName: "Last Sync", width: 130 },
];


type params = {
  jobs: JobCollection
}
export function JobsTable(props: params) {
  const rows = props.jobs && props.jobs.map((job) => (
    {
      id: job.id,
      slurmId: job.slurmId,
      state: job.state,
      slurmState: job.slurmState,
      identifier: job.identifier,
      specialJobType: job.specialJobType,
      queuedTime: job.queuedTime,
      startTime: job.startTime,
      endTime: job.endTime,
      timeLimit: job.timeLimit,
      nodeList: job.nodeList,
      exitCode: job.exitCode,
      lastSync: job.lastSync,
    })
  );

  return (
    <div style={{ height: 320 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
    </div>
  );
}

export default JobsTable;


