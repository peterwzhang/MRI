import { Typography } from "@mui/material";
import { TextField } from "mui-rff";
import { Field, useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function ScriptCreationFormJobsStep(props: {
  onStepChange: (newStep: number, values: FormValues) => void;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <>
      <h2>Job generation</h2>

      <p>
        The server will generate all jobs for a batch using the information provided here. This is
        done through the job generation loop which, for each iteration (typically through a list of
        files), generates and queues a job.
      </p>

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        First, we need the top part of this loop. If needed, you can prepend additional setup code,
        however, please refrain from any computationally-expensive work in this part (don&apos;t
        forget, you can also declare any extra variables in the{" "}
        <a href="#" onClick={() => props.onStepChange(0, values)}>
          header
        </a>
        , to make them easier to update later).
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        <em>If you only want to run a single job, you can leave this blank.</em>
      </Typography>

      <Field
        name="loopWrapperTop"
        textareaId="loopWrapperTop"
        component={CodeEditor}
        label="Loop top"
      />

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        Please provide a variable (or string containing variables) that will result in a unique
        string for each job. This will be used to identify each job, name scripts, and create log
        files. Typically, this will be the loop variable <InlineCode>$i</InlineCode> or something
        similar &mdash; for files, use something like <InlineCode>$(basename $i)</InlineCode>.
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        <em>
          If you did not use a loop and only want to run a single job, you can use any string of
          text, such as <InlineCode>job</InlineCode> here.
        </em>
      </Typography>

      <TextField label="Identifying variable" name="identifyingVariable" required />

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        Next, please close any loops you created in the top field (between the two parts, you should
        have a matching <InlineCode>done</InlineCode> for each <InlineCode>for</InlineCode> and{" "}
        <InlineCode>while</InlineCode>, <InlineCode>fi</InlineCode> for each{" "}
        <InlineCode>if</InlineCode>, etc.).
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        <em>If you only want to run a single job, you can leave this blank.</em>
      </Typography>

      <Field
        name="loopWrapperBottom"
        textareaId="loopWrapperBottom"
        component={CodeEditor}
        label="Loop bottom"
      />

      <p>Now, please provide the code that should be run for each job.</p>

      <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
        This should be the code you want to run on compute nodes for each job. Feel free to use any
        variables/interpolation defined in the{" "}
        <a href="#" onClick={() => props.onStepChange(0, values)}>
          header
        </a>{" "}
        or as part of the loops above, however, any interpolation that should be done at job-time
        rather than generation-time must be escaped (<InlineCode>\$</InlineCode>).
      </Typography>
      <Typography variant="body2" style={{ marginBottom: "0.5rem" }}>
        Note: <InlineCode>#!/bin/bash</InlineCode> will be added automatically and does not need to
        be specified here.
      </Typography>

      <Field name="job" textareaId="job" component={CodeEditor} label="Job contents" />
    </>
  );
}

ScriptCreationFormJobsStep.validate = (values: FormValues) => {
  if (!values.identifyingVariable?.trim().length) {
    return { identifyingVariable: "Please enter a value" };
  }
  return {};
};

const toExport = ScriptCreationFormJobsStep as ScriptCreationStep;
export default toExport;
