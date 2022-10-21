import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import pluralize from "pluralize";
import { FormattedDate } from "react-intl";
import { Prism } from "react-syntax-highlighter";
import { Script } from "../types";
import InlineCode from "./InlineCode";
import ScriptCleanupModeDisplay from "./ScriptCleanupModeDisplay";

export default function ScriptDisplay({ script }: { script: Script }) {
  return (
    <>
      <h3>{script.name}</h3>
      <p>
        Created at <FormattedDate value={script.createdAt} dateStyle="full" timeStyle="long" /> by{" "}
        {script.user.email ?? script.user.username}
      </p>
      <p>
        Last edited at <FormattedDate value={script.createdAt} dateStyle="full" timeStyle="long" />
      </p>
      <p>
        ID variable: <InlineCode>{script.idVariable}</InlineCode>
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
          <span>{pluralize("line", script.setupScript.trim().split("\n").length, true)}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Prism language="bash">{script.setupScript}</Prism>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span style={{ fontWeight: "bolder" }}>Loop top</span>
          <Box width="1rem" />
          <span>{pluralize("line", script.loopWrapperTop.trim().split("\n").length, true)}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Prism language="bash">{script.loopWrapperTop}</Prism>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span style={{ fontWeight: "bolder" }}>Job template</span>
          <Box width="1rem" />
          <span>{pluralize("line", script.jobTemplate.trim().split("\n").length, true)}</span>
        </AccordionSummary>
        <AccordionDetails>
          <Prism language="bash">{script.jobTemplate}</Prism>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span style={{ fontWeight: "bolder" }}>Loop bottom</span>
          <Box width="1rem" />
          <span>{pluralize("line", script.loopWrapperBottom.trim().split("\n").length, true)}</span>
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
          <span>{pluralize("line", script.cleanupScript.trim().split("\n").length, true)}</span>
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
            {pluralize("line", script.setupScriptSlurmConfig.trim().split("\n").length, true)}
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
          <span>{pluralize("line", script.slurmTemplate.trim().split("\n").length, true)}</span>
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
  );
}
