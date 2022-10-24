import { Box, Typography } from "@mui/material";
import { Switches, TextField } from "mui-rff";
import { Field } from "react-final-form";
import { UserWithKey } from "../../types";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function ScriptCreationFormInfoStep(props: { user?: UserWithKey }) {
  return (
    <>
      <h2>Script info</h2>

      <p>First, let&apos;s give your script a name:</p>
      <TextField label="Name" name="name" required />

      <p>Next, please provide the script&apos;s header:</p>
      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        This header will be prepended to <i>all</i> scripts and is recommended for any variables or
        parameters that need to be used throughout the script. We recommend putting all variables
        that may need changing, such as directory names, in this portion. In addition to variables,
        functions can be declared here, however, please keep any computation out of this section.
      </Typography>
      <Typography variant="body2">
        We do recommend the addition of <InlineCode>set -euo pipefail</InlineCode> at the start of
        the header. This will cause the script to terminate immediately with a non-zero exit code if
        any sub-command fails, rather than proceeding onwards &mdash; however, this is very strict,
        so only add this after ensuring it will not break your script.
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        Note: <InlineCode>#!/bin/bash</InlineCode> will be added automatically and does not need to
        be specified here.
      </Typography>

      <Field name="header" textareaId="header" component={CodeEditor} label="Header" />

      <Box hidden={!props.user?.admin}>
        <p>Finally, would you like this script to be available to all users as a template?</p>

        <Typography variant="body2" style={{ margin: "0.5rem 0" }}>
          This option only appears to administrators. If you enable this, other users can view this
          script and create batches using it, however, they will not be able to edit it. This can be
          useful if you want to provide common examples to all users.
        </Typography>

        <Switches
          name="globalTemplate"
          data={{ label: "Make this script a global template", value: false }}
        />
      </Box>
    </>
  );
}

ScriptCreationFormInfoStep.validate = (values: FormValues) => {
  if (!values.name?.trim().length) {
    return { name: "Please enter a name" };
  }
  return {};
};

const toExport = ScriptCreationFormInfoStep as ScriptCreationStep;
export default toExport;
