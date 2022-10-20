import { Clear as ClearIcon } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import Link from "next/link";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { url } from "../api/constants";
import BatchProgressBar from "../components/BatchProgressBar";
import BatchStatusDisplay from "../components/BatchStatusDisplay";
import { BatchCollection } from "../types";

function GridToolbar(props: { selectedRows: string[] }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button
        disabled={props.selectedRows.length === 0}
        startIcon={<ClearIcon />}
        color="error"
        sx={{ marginLeft: "auto" }}
      >
        Cancel
      </Button>
    </GridToolbarContainer>
  );
}

export default function Dashboard() {
  const { data } = useQuery<BatchCollection>(["batches"], async () => {
    const response = await ky.get(`${url}/api/batches`);
    return response.json<BatchCollection>();
  });

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
          componentsProps={{ toolbar: { selectedRows } }}
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
                <Link href={`/batch/${row.id}`} style={{ textDecoration: "underline" }}>
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
          }}
          onSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
        />
      </div>
    </Container>
  );
}
