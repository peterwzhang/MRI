import {
  Clear as ClearIcon,
  DoneAll as DoneAllIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Container,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import pluralize from "pluralize";
import { ReactNode, useState } from "react";
import { FormattedDate } from "react-intl";
import FormattedDuration from "react-intl-formatted-duration";
import { Link, useParams } from "react-router-dom";
import useBatch from "../../api/useBatch";
import useBatchCancelMutation from "../../api/useBatchCancelMutation";
import useJobApproveMutation from "../../api/useJobApproveMutation";
import useJobCancelMutation from "../../api/useJobCancelMutation";
import useScript from "../../api/useScript";
import BatchProgressBar from "../../components/BatchProgressBar";
import BatchStatusDisplay from "../../components/BatchStatusDisplay";
import GridToolbar from "../../components/GridToolbar";
import InlineCode from "../../components/InlineCode";
import JobElapsedTime from "../../components/JobElapsedTime";
import JobStateDisplay from "../../components/JobStateDisplay";
import KeyValueSet from "../../components/KeyValueSet";
import ScriptDisplay from "../../components/ScriptDisplay";
import Unknown from "../../components/Unknown";
import BatchStatus from "../../types/BatchStatus";
import JobState from "../../types/JobState";

export default function ViewBatch() {
  const id = useParams().batchId;

  const batch = useBatch(id);
  const batchCanceller = useBatchCancelMutation();
  const canceller = useJobCancelMutation();
  const approver = useJobApproveMutation();

  const [showScript, setShowScript] = useState<boolean>(false);
  const script = useScript(batch?.scriptUsed?.id, showScript);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [notification, setNotification] = useState<ReactNode>(null);

  if (batch === undefined) {
    return (
      <Container fixed>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container fixed>
      <Snackbar
        open={notification !== null}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
      >
        <Alert onClose={() => setNotification(null)} severity="success" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <h1 style={{ marginTop: 0 }}>{batch.name}</h1>
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "50%", lg: "33%" },
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "50%", lg: "33%" },
              width: { xs: "100%", md: undefined },
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <h2 style={{ margin: 0 }}>
              <BatchStatusDisplay status={batch.status} />
            </h2>
            <p style={{ margin: 0 }}>
              <InlineCode>{batch.status}</InlineCode>
            </p>
          </Box>
          <div style={{ width: "100%" }}>
            <BatchProgressBar status={batch.statusSummary} />
          </div>
        </Box>
      </Box>

      <KeyValueSet
        style={{ margin: "1rem 0" }}
        data={[
          {
            key: "Created by",
            value: (
              <a href={`mailto:${batch.user.email}`}>{batch.user.email ?? batch.user.username}</a>
            ),
          },
          {
            key: "Started at",
            value: <FormattedDate value={batch.startedAt} dateStyle="full" timeStyle="long" />,
          },
          { key: "Jobs require approval", value: batch.requiresApprovalStep ? "Yes" : "No" },
        ]}
      />

      <Accordion expanded={showScript} onChange={(_e, isExpanded) => setShowScript(isExpanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span style={{ fontWeight: "bolder" }}>Script used</span>
          <Box width="1rem" />
          <span>
            {
              batch.scriptUsed.name
                .replace("Script used for ", "")
                .replace(batch.name, "")
                .match(/^ on [^(]+\((.+)\)$/)?.[1]
            }
          </span>
        </AccordionSummary>

        <AccordionDetails>
          {script === undefined ? <Skeleton /> : <ScriptDisplay script={script} />}
        </AccordionDetails>
      </Accordion>

      <div style={{ height: "max(70vh, calc(100vh - 15rem))", marginTop: "1rem" }}>
        <DataGrid
          loading={batch === undefined}
          checkboxSelection={
            batch.status !== BatchStatus.CANCELLED &&
            batch.status !== BatchStatus.COMPLETED &&
            batch.status !== BatchStatus.FAILED
          }
          disableSelectionOnClick
          rows={batch.jobs ?? []}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              additionalButtons: (
                <>
                  <Button
                    disabled={selectedRows.length === 0}
                    startIcon={<ClearIcon />}
                    color="error"
                    sx={{
                      marginLeft: "auto",
                      display: batch.status === BatchStatus.AWAITING_APPROVAL ? "none" : undefined,
                    }}
                    onClick={() => {
                      setNotification(
                        `Attempting to cancel ${pluralize(
                          "job",
                          selectedRows.length,
                          true,
                        )}, this may take a moment...`,
                      );
                      canceller({ batchId: batch.id, jobs: selectedRows });
                      setSelectedRows([]);
                    }}
                  >
                    Cancel {pluralize("job", selectedRows.length, true)}
                  </Button>
                  <Button
                    disabled={selectedRows.length === 0}
                    startIcon={<DoneAllIcon />}
                    color="success"
                    sx={{
                      marginLeft: "auto",
                      display: batch.status !== BatchStatus.AWAITING_APPROVAL ? "none" : undefined,
                    }}
                    onClick={() => {
                      setNotification(
                        `Approving ${pluralize(
                          "job",
                          selectedRows.length,
                          true,
                        )}, this may take a moment...`,
                      );
                      approver({ batchId: batch.id, jobs: selectedRows });
                      setSelectedRows([]);
                    }}
                  >
                    Approve {pluralize("job", selectedRows.length, true)}
                  </Button>
                  <Button
                    disabled={
                      batch.status === BatchStatus.FAILED ||
                      batch.status === BatchStatus.CANCELLED ||
                      batch.status === BatchStatus.COMPLETED
                    }
                    startIcon={<ClearIcon />}
                    color="error"
                    onClick={() => {
                      setNotification("Attempting to cancel the batch, this may take a moment...");
                      batchCanceller(batch.id);
                    }}
                  >
                    Cancel batch
                  </Button>
                </>
              ),
            },
          }}
          columns={[
            {
              field: "slurmId",
              headerName: "Slurm ID",
              renderCell: ({ row }) => (
                <Link to={`./job/${row.id}`}>
                  {row.slurmId?.toString() ??
                    (row.specialJobType === "GENERATOR" ? "N/A" : <Unknown />)}
                </Link>
              ),
              valueGetter: ({ row }) =>
                row.slurmId ?? (row.specialJobType === "GENERATOR" ? -1 : 0),
              flex: 2,
              type: "number",
            },
            {
              field: "state",
              headerName: "State",
              renderCell: ({ row }) => (
                <JobStateDisplay state={row.state} batchStatus={batch.status} />
              ),
              flex: 2,
            },
            {
              field: "slurmState",
              headerName: "Slurm state",
              flex: 2,
            },
            {
              field: "identifier",
              headerName: "ID",
              renderCell: ({ row }) => <Link to={`./job/${row.id}`}>{row.identifier}</Link>,
              flex: 4,
            },
            {
              field: "queuedTime",
              headerName: "Queued at",
              renderCell: ({ row }) =>
                (row.queuedTime === null ? (
                  <Unknown />
                ) : (
                  <FormattedDate value={row.queuedTime} dateStyle="short" timeStyle="medium" />
                )),
              flex: 3,
              type: "dateTime",
              valueGetter: ({ row }) => new Date(row.queuedTime),
            },
            {
              field: "startTime",
              headerName: "Started at",
              renderCell: ({ row }) =>
                (row.startTime === null ? (
                  <Unknown />
                ) : (
                  <FormattedDate value={row.startTime} dateStyle="short" timeStyle="medium" />
                )),
              flex: 3,
              type: "dateTime",
              valueGetter: ({ row }) => new Date(row.startTime),
            },
            {
              field: "endTime",
              headerName: "Ended at",
              renderCell: ({ row }) =>
                (row.endTime === null ? (
                  <Unknown />
                ) : (
                  <FormattedDate value={row.endTime} dateStyle="short" timeStyle="medium" />
                )),
              flex: 3,
              type: "dateTime",
              valueGetter: ({ row }) => new Date(row.endTime),
            },
            {
              field: "duration",
              headerName: "Duration",
              renderCell: ({ row }) => <JobElapsedTime job={row} />,
              flex: 2,
              type: "number",
              valueGetter: ({ row }) => {
                if (row.startTime === null) return 0;
                if (row.endTime === null) return (new Date().getTime() - new Date(row.startTime).getTime()) / 1000;
                return (new Date(row.endTime).getTime() - new Date(row.startTime).getTime()) / 1000;
              },
            },
            {
              field: "timeLimit",
              headerName: "Time limit",
              renderCell: ({ row }) =>
                (row.timeLimit === null ? (
                  <Unknown />
                ) : (
                  <FormattedDuration
                    seconds={row.timeLimit}
                    format="{days} {hours} {minutes} {seconds}"
                    unitDisplay="narrow"
                  />
                )),
              flex: 2,
              type: "number",
              valueGetter: ({ row }) => row.timeLimit,
            },
            {
              field: "nodeList",
              headerName: "Node list",
              renderCell: ({ row }) =>
                (row.nodeList === "" || row.nodeList === null ? <Unknown /> : row.nodeList),
              flex: 3,
            },
            {
              field: "exitCode",
              headerName: "Exit code",
              flex: 1,
              type: "number",
            },
          ]}
          initialState={{
            columns: {
              columnVisibilityModel: {
                slurmState: false,
                queuedAt: false,
                timeLimit: false,
                nodeList: false,
              },
            },
            sorting: {
              sortModel: [{ field: "slurmId", sort: "asc" }],
            },
          }}
          onSelectionModelChange={(ids) => setSelectedRows(ids as string[])}
          isRowSelectable={({ row }) =>
            (batch.status === BatchStatus.AWAITING_APPROVAL
              ? row.state === JobState.UNAPPROVED
              : row.state === JobState.PENDING || row.state === JobState.RUNNING)
          }
        />
      </div>
    </Container>
  );
}
