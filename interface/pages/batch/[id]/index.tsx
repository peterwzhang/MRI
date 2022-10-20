import { Clear as ClearIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import FormattedDuration from "react-intl-formatted-duration";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
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
import { useRouter } from "next/router";
import pluralize from "pluralize";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { Prism } from "react-syntax-highlighter";
import { validate as uuidValidate } from "uuid";
import { url } from "../../../api/constants";
import useBatch from "../../../api/useBatch";
import useScript from "../../../api/useScript";
import BatchProgressBar from "../../../components/BatchProgressBar";
import BatchStatusDisplay from "../../../components/BatchStatusDisplay";
import GridToolbar from "../../../components/GridToolbar";
import JobStateDisplay from "../../../components/JobStateDisplay";
import ScriptCleanupModeDisplay from "../../../components/ScriptCleanupModeDisplay";
import { BatchWithJobs, Script } from "../../../types";
import css from "./index.module.scss";

export default function ViewBatch() {
  const id = useRouter().query?.id;

  const batch = useBatch(id);

  const [showScript, setShowScript] = useState<boolean>(false);
  const script = useScript(batch?.scriptUsed?.id, showScript);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  if (batch === undefined) {
    return (
      <Container fixed>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container fixed>
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
            <p style={{ fontFamily: "monospace", margin: 0 }}>{batch.status}</p>
          </Box>
          <div style={{ width: "100%" }}>
            <BatchProgressBar status={batch.statusSummary} />
          </div>
        </Box>
      </Box>

      <Grid container className={css.keyValues}>
        <Grid component="dl" xs={12} md={4} paddingRight={2}>
          <dt>Created by</dt>
          <dd>
            <a href={`mailto:${batch.user.email}`}>{batch.user.email ?? batch.user.username}</a>
          </dd>
        </Grid>
        <Grid component="dl" xs={12} md={4} paddingRight={2}>
          <dt>Started at</dt>
          <dd>
            <FormattedDate value={batch.startedAt} dateStyle="full" timeStyle="long" />
          </dd>
        </Grid>
        <Grid component="dl" xs={12} md={4}>
          <dt>Jobs require approval</dt>
          <dd>{batch.requiresApprovalStep ? "Yes" : "No"}</dd>
        </Grid>
      </Grid>

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
          {script === undefined ? (
            <Skeleton />
          ) : (
            <>
              <h3>{script.name}</h3>
              <p>
                Created at{" "}
                <FormattedDate value={script.createdAt} dateStyle="full" timeStyle="long" /> by{" "}
                {script.user.email ?? script.user}
              </p>
              <p>
                Last edited at{" "}
                <FormattedDate value={script.createdAt} dateStyle="full" timeStyle="long" />
              </p>
              <p>
                ID variable: <span style={{ fontFamily: "monospace" }}>{script.idVariable}</span>
              </p>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Header</span>
                  <Box width="1rem" />
                  <span>{pluralize("line", script.header.trim().split("\n").length, true)}</span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.header}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Setup</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize("line", script.setupScript.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.setupScript}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Loop top</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize("line", script.loopWrapperTop.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.loopWrapperTop}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Job template</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize("line", script.jobTemplate.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.jobTemplate}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Loop bottom</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize("line", script.loopWrapperBottom.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.loopWrapperBottom}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Cleanup</span>
                  <Box width="1rem" />
                  <ScriptCleanupModeDisplay mode={script.cleanupMode} />
                  ,&nbsp;
                  <span>
                    {pluralize("line", script.cleanupScript.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.cleanupScript}</Prism>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Slurm config (setup)</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize(
                      "line",
                      script.setupScriptSlurmConfig.trim().split("\n").length,
                      true,
                    )}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.setupScriptSlurmConfig}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Slurm config (jobs)</span>
                  <Box width="1rem" />
                  <span>
                    {pluralize("line", script.slurmTemplate.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.slurmTemplate}</Prism>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span style={{ fontWeight: "bolder" }}>Slurm config (cleanup)</span>
                  <Box width="1rem" />
                  <ScriptCleanupModeDisplay mode={script.cleanupMode} />
                  ,&nbsp;
                  <span>
                    {pluralize("line", script.cleanupSlurmConfig.trim().split("\n").length, true)}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  <Prism language="bash">{script.cleanupSlurmConfig}</Prism>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </AccordionDetails>
      </Accordion>

      <div style={{ height: "max(70vh, calc(100vh - 12rem))", marginTop: "1rem" }}>
        <DataGrid
          loading={batch === undefined}
          checkboxSelection
          disableSelectionOnClick
          rows={batch.jobs ?? []}
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
              field: "slurmId",
              headerName: "Slurm ID",
              renderCell: ({ row }) => row.slurmId?.toString() ?? "-",
              valueGetter: ({ row }) => row.slurmId ?? 0,
              flex: 2,
              type: "string",
            },
            {
              field: "state",
              headerName: "State",
              renderCell: ({ row }) => <JobStateDisplay state={row.state} />,
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
              flex: 4,
            },
            {
              field: "queuedTime",
              headerName: "Queued at",
              renderCell: ({ row }) =>
                (row.queuedTime === null ? (
                  "-"
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
                  "-"
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
                  "-"
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
              renderCell: ({ row }) => {
                if (row.startTime === null) return "-";
                return (
                  <FormattedDuration
                    seconds={
                      (new Date(row.endTime).getTime() - new Date(row.startTime).getTime()) / 1000
                    }
                    format="{days} {hours} {minutes} {seconds}"
                    unitDisplay="narrow"
                  />
                );
              },
              flex: 2,
              type: "number",
              valueGetter: ({ row }) => {
                if (row.startTime === null) return 0;
                return (new Date(row.endTime).getTime() - new Date(row.startTime).getTime()) / 1000;
              },
            },
            {
              field: "timeLimit",
              headerName: "Time limit",
              renderCell: ({ row }) =>
                (row.timeLimit === null ? (
                  "-"
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
        />
      </div>
    </Container>
  );
}
