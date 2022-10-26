import { Box, Typography } from "@mui/material";
import { Field, useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function ScriptCreationFormSlurmStep(props: {
  onStepChange: (newStep: number, values: FormValues) => void;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <>
      <h2>Slurm configuration</h2>

      <p>Please provide the Slurm configuration needed for each job:</p>

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        Typically, this should not need significant changes. We recommend testing on the{" "}
        <InlineCode>debug</InlineCode> QoS and only moving to <InlineCode>main</InlineCode> once you
        have tested your script. For more information about the available partitions and QoSs,
        please see{" "}
        <a href="https://hpc.ua.edu/research-computing-support/hpc-technical-specifications/">
          this page
        </a>
        .
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        Note: <InlineCode>#!/bin/bash</InlineCode> directive and the <InlineCode>srun</InlineCode>{" "}
        command will be added automatically to these and does not need to be specified here. The
        only lines that should be added here are the <InlineCode>#SBATCH</InlineCode> directives.
      </Typography>

      <Field
        name="setupSlurm"
        textareaId="setupSlurm"
        component={CodeEditor}
        label="Setup script slurm config"
      />
      <Typography variant="body2" style={{ marginBottom: "1rem" }}>
        <em>
          Used for the{" "}
          <a href="#" onClick={() => props.onStepChange(1, values)}>
            setup script
          </a>
          , if one was provided. If the{" "}
          <a href="#" onClick={() => props.onStepChange(1, values)}>
            setup script
          </a>{" "}
          was left blank, this configuration will be ignored.
        </em>
      </Typography>

      <Field
        name="jobSlurm"
        textareaId="jobSlurm"
        component={CodeEditor}
        label="Job slurm config"
      />
      <Typography variant="body2" style={{ marginBottom: "1rem" }}>
        <em>
          Used for each{" "}
          <a href="#" onClick={() => props.onStepChange(2, values)}>
            generated job
          </a>
          .
        </em>
      </Typography>

      <Box hidden={values.cleanupMode === "NEVER"} mt={2}>
        <Field
          name="cleanupSlurm"
          textareaId="cleanupSlurm"
          component={CodeEditor}
          label="Cleanup slurm config"
        />
        <Typography variant="body2" style={{ marginBottom: "1rem" }}>
          <em>
            Used for the{" "}
            <a href="#" onClick={() => props.onStepChange(3, values)}>
              cleanup script
            </a>
            .
          </em>
        </Typography>
      </Box>
    </>
  );
}

ScriptCreationFormSlurmStep.validate = () => ({});

const toExport = ScriptCreationFormSlurmStep as ScriptCreationStep;
export default toExport;
