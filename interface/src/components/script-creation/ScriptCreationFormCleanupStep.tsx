import { Box, MenuItem, Typography } from "@mui/material";
import { Select } from "mui-rff";
import { Field, useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function ScriptCreationFormCleanupStep(props: {
  onStepChange: (newStep: number, values: FormValues) => void;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <>
      <h2>Cleanup</h2>

      <p>Should this script perform any cleanup actions?</p>

      <Typography variant="body2" style={{ marginBottom: "1rem" }}>
        This typically includes deleting any temporary files, particularly those created in the{" "}
        <a href="#" onClick={() => props.onStepChange(1, values)}>
          setup
        </a>{" "}
        script.
      </Typography>

      <Select name="cleanupMode" label="Cleanup mode">
        <MenuItem value="NEVER">No, do not run any cleanup actions</MenuItem>
        <MenuItem value="ALL_SUCCESS">
          Yes, but only if all jobs complete successfully (on-time with exit code zero)
        </MenuItem>
        <MenuItem value="ALL_ENDED">
          Yes, after all jobs have completed regardless of success
        </MenuItem>
      </Select>

      <Box hidden={values.cleanupMode === "NEVER"} mt={2}>
        <Field
          name="cleanupScript"
          textareaId="cleanup"
          component={CodeEditor}
          label="Cleanup script"
        />
        <Typography variant="body2">
          Note: <InlineCode>#!/bin/bash</InlineCode> will be added automatically and does not need
          to be specified here.
        </Typography>
      </Box>
    </>
  );
}

ScriptCreationFormCleanupStep.validate = () => ({});

const toExport = ScriptCreationFormCleanupStep as ScriptCreationStep;
export default toExport;
