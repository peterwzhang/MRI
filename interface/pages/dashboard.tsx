import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { FormattedDate } from "react-intl";
import { url } from "../api/constants";
import BatchProgressBar from "../components/BatchProgressBar";
import BatchStatusDisplay from "../components/BatchStatusDisplay";
import { BatchCollection } from "../types";

export default function Dashboard() {
  const { data } = useQuery<BatchCollection>(["batches"], async () => {
    const response = await ky.get(`${url}/api/batches`);
    return response.json<BatchCollection>();
  });

  if (data === undefined) return <p>Loading...</p>;

  return (
    <Container fixed>
      <h1>My batches</h1>

      <div style={{ height: "max(70vh, calc(100vh - 12rem))" }}>
        <DataGrid
          rows={data}
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
        />
      </div>
    </Container>
  );
}
