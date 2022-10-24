import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container } from "@mui/material";
import { FormattedDate, FormattedTime } from "react-intl";
import FormattedDuration from "react-intl-formatted-duration";
import { Link, useParams } from "react-router-dom";
import { Prism } from "react-syntax-highlighter";
import useBatch from "../../api/useBatch";
import useJob from "../../api/useJob";
import InlineCode from "../../components/InlineCode";
import JobElapsedTime from "../../components/JobElapsedTime";
import JobStateDisplay from "../../components/JobStateDisplay";
import KeyValueSet from "../../components/KeyValueSet";
import Unknown from "../../components/Unknown";

export default function ViewJob() {
  const { batchId, jobId } = useParams();

  const batch = useBatch(batchId);
  const job = useJob(batchId, jobId);

  if (batch === undefined || job === undefined) {
    return (
      <Container fixed>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container fixed>
      <h1>
        <Link to={`/batch/${batch.id}`}>{batch.name}</Link> &mdash; {job.identifier}
      </h1>

      <KeyValueSet
        eachSize={job.specialJobType === "GENERATOR" ? 4 : 3}
        data={[
          {
            key: "State",
            value: (
              <>
                <JobStateDisplay state={job.state} batchStatus={batch.status} />
                {job.slurmState ? ` (${job.slurmState})` : undefined}
              </>
            ),
          },
          {
            key: "Node list",
            value: job.nodeList ?? <Unknown />,
          },
          {
            key: "Exit code",
            value: job.exitCode,
          },
          {
            key: "Slurm ID",
            value: job.slurmId ?? <Unknown />,
            hidden: job.specialJobType === "GENERATOR",
          },
          {
            key: "Queued at",
            value:
              job.queuedTime !== null ? (
                <>
                  <FormattedDate value={job.queuedTime} dateStyle="medium" /> at{" "}
                  <FormattedTime value={job.queuedTime} timeStyle="long" />
                </>
              ) : (
                <Unknown />
              ),
          },
          {
            key: "Started at",
            value:
              job.startTime !== null ? (
                <>
                  <FormattedDate value={job.startTime} dateStyle="medium" /> at{" "}
                  <FormattedTime value={job.startTime} timeStyle="long" />
                </>
              ) : (
                <Unknown />
              ),
          },
          {
            key: "Ended at",
            value:
              job.endTime !== null ? (
                <>
                  <FormattedDate value={job.endTime} dateStyle="medium" /> at{" "}
                  <FormattedTime value={job.endTime} timeStyle="long" />
                </>
              ) : (
                <Unknown />
              ),
          },
          {
            key: "Last sync",
            value:
              job.lastSync !== null ? (
                <>
                  <FormattedDate value={job.lastSync} dateStyle="medium" /> at{" "}
                  <FormattedTime value={job.lastSync} timeStyle="long" />
                </>
              ) : (
                <Unknown />
              ),
            hidden: job.specialJobType === "GENERATOR",
          },
          {
            key: "Elapsed",
            value: <JobElapsedTime job={job} />,
            hidden: job.specialJobType === "GENERATOR",
          },
          {
            key: "Time limit",
            value:
              job.timeLimit === null ? (
                <Unknown />
              ) : (
                <FormattedDuration
                  seconds={job.timeLimit}
                  format="{days} {hours} {minutes} {seconds}"
                  unitDisplay="narrow"
                />
              ),
            hidden: job.specialJobType === "GENERATOR",
          },
        ]}
      />
      <KeyValueSet
        eachSize={12}
        data={[
          {
            key: "Script location",
            value: <InlineCode>{job.scriptPath}</InlineCode>,
          },
          {
            key: "Slurm invocation script location",
            value: <InlineCode>{job.scriptPathSlurmQueuer}</InlineCode>,
            // generators have no slurm invocation
            hidden: job.specialJobType === "GENERATOR",
          },
          {
            key: "Log location",
            value: <InlineCode>{job.logPath}</InlineCode>,
          },
        ]}
      />

      <Accordion TransitionProps={{ unmountOnExit: true }} style={{ marginTop: "1rem" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span style={{ fontWeight: "bolder" }}>Log contents</span>
          <Box width="1rem" />
          <span>(last 50 KB)</span>
        </AccordionSummary>

        <AccordionDetails>
          <Prism language="plain">{job.logTail}</Prism>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
