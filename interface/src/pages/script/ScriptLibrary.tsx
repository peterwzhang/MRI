import { Add as AddIcon, Archive as ArchiveIcon, Inventory2 } from "@mui/icons-material";
import { Button, Container, Fab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { Link } from "react-router-dom";
import useCurrentUser from "../../api/useCurrentUser";
import useScripts from "../../api/useScripts";
import GridToolbar from "../../components/GridToolbar";
import canEditScript from "../../utils/canEditScript";

export default function ScriptLibrary() {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const { data, isLoading } = useScripts(showArchived);
  const user = useCurrentUser();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <Container fixed>
      <h1>Scripts</h1>

      <div style={{ height: "max(70vh, calc(100vh - 15rem))" }}>
        <DataGrid
          loading={isLoading || user === undefined}
          checkboxSelection
          disableSelectionOnClick
          rows={data ?? []}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              additionalButtons: (
                <>
                  <Button startIcon={<Inventory2 />} onClick={() => setShowArchived(!showArchived)}>
                    {showArchived ? "Hide archived" : "Show archived"}
                  </Button>
                  <Button
                    disabled={selectedRows.length === 0}
                    startIcon={<ArchiveIcon />}
                    color="error"
                    sx={{ marginLeft: "auto" }}
                  >
                    Archive
                  </Button>
                </>
              ),
            },
          }}
          columns={[
            {
              field: "createdAt",
              headerName: "Created at",
              renderCell: ({ value }) => (
                <FormattedDate value={value} dateStyle="medium" timeStyle="short" />
              ),
              flex: 3,
              type: "dateTime",
              valueGetter: ({ value }) => new Date(value),
            },
            {
              field: "updatedAt",
              headerName: "Updated at",
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
                <Link to={`/script/${row.id}`} style={{ textDecoration: "underline" }}>
                  {row.name}
                </Link>
              ),
              flex: 6,
            },
            {
              field: "creator",
              headerName: "Creator",
              valueGetter: ({ row }) => row.user.email ?? row.user.username,
              flex: 4,
            },
            {
              field: "archived",
              headerName: "Archived",
              type: "boolean",
              flex: 1,
            },
          ]}
          initialState={{
            columns: {
              columnVisibilityModel: {
                archived: false,
              },
            },
            sorting: {
              sortModel: [{ field: "updatedAt", sort: "desc" }],
            },
          }}
          onSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
          isRowSelectable={({ row }) => canEditScript(row, user)}
        />
      </div>
      <Link to="/script/new">
        <Fab color="primary" style={{ position: "absolute", right: 16, bottom: 16 }}>
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
}
