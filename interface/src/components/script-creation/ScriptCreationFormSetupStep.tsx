import { Typography } from "@mui/material";
import { Field } from "react-final-form";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function ScriptCreationFormSetupStep() {
  return (
    <>
      <h2>Setup</h2>

      <p>Does this script require any setup?</p>

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        This can include copying files to <InlineCode>/scratch/</InlineCode> directories, extracting
        archives, or anything else necessary to prepare your environment. This will be ran on
        compute nodes and, in the event that this job fails, the entire batch will stop (before
        running any jobs).
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        Note: <InlineCode>#!/bin/bash</InlineCode> will be added automatically and does not need to
        be specified here.
      </Typography>

      <Field name="setupScript" textareaId="setup" component={CodeEditor} label="Setup script" />

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        If you do not need or want a setup script, feel free to leave this blank.
      </Typography>
    </>
  );
}

ScriptCreationFormSetupStep.validate = () => ({});

const toExport = ScriptCreationFormSetupStep as ScriptCreationStep;
export default toExport;
