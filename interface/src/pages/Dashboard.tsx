import { Clear as ClearIcon } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { Link } from "react-router-dom";
import useBatches from "../api/useBatches";
import BatchProgressBar from "../components/BatchProgressBar";
import BatchStatusDisplay from "../components/BatchStatusDisplay";
import GridToolbar from "../components/GridToolbar";

export default function Dashboard() {
  const data = useBatches();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <Container fixed>
      <h1>My batches</h1>

      <div style={{ height: "max(70vh, calc(100vh - 12rem))" }}>
        <DataGrid
          loading={data === undefined}
          checkboxSelection
          disableSelectionOnClick
          rows={data ?? []}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              additionalButtons: (
                <Button
                  disabled={selectedRows.length === 0}
                  startIcon={<ClearIcon />}
                  color="error"
                  sx={{ marginLeft: "auto" }}
                >
                  Cancel
                </Button>
              ),
            },
          }}
          columns={[
            {
              field: "startedAt",
              headerName: "Started at",
              renderCell: ({ value }) => (
                <FormattedDate value={value} dateStyle="medium" timeStyle="short" />
              ),
              flex: 3,
              type: "dateTime",
              valueGetter: ({ value }) => new Date(value),
            },
            {
              field: "name",
              headerName: "Name",
              renderCell: ({ row }) => (
                <Link to={`/batch/${row.id}`} style={{ textDecoration: "underline" }}>
                  {row.name}
                </Link>
              ),
              flex: 6,
            },
            {
              field: "scriptName",
              headerName: "Script Name",
              valueGetter: ({ row }) => row.scriptUsed.name,
              flex: 6,
            },
            {
              field: "jobs",
              headerName: "Jobs",
              flex: 1,
              valueGetter: ({ row }) =>
                Object.values(row.statusSummary).reduce((agg, n) => agg + n, 0),
            },
            {
              field: "status",
              headerName: "Status",
              renderCell: ({ row }) => <BatchStatusDisplay status={row.status} />,
              flex: 2,
            },
            {
              field: "statusSummary",
              headerName: "Progress",
              renderCell: ({ row }) => <BatchProgressBar status={row.statusSummary} />,
              flex: 4,
            },
          ]}
          initialState={{
            columns: {
              columnVisibilityModel: {
                scriptName: false,
              },
            },
            sorting: {
              sortModel: [{ field: "startedAt", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
        />
      </div>
    </Container>
  );
}
