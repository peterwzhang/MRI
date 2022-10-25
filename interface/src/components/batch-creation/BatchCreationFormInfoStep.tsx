import { MenuItem, Typography } from "@mui/material";
import { Select, Switches, TextField } from "mui-rff";
import { Field } from "react-final-form";
import { Link } from "react-router-dom";
import { ScriptMetadataWithId } from "../../types";
import { FormValues } from "../../types/BatchCreationFormTypes";
import BatchCreationStep from "../../types/BatchCreationStep";
import CodeEditor from "../CodeEditor";
import InlineCode from "../InlineCode";

function BatchCreationFormInfoStep({ scripts }: { scripts: ScriptMetadataWithId[] }) {
  return (
    <>
      <h2>Batch info</h2>

      <p>First, let&apos;s give this batch a name:</p>
      <TextField label="Name" name="name" required />

      <p>Would you like to manually approve jobs before they execute?</p>

      <Typography variant="body2" style={{ margin: "0.5rem 0" }}>
        This will require you to manually approve jobs before they are run (with the exception of
        setup and cleanup jobs, if applicable). Once the batch is ready, it will be marked as
        &quot;Awaiting Approval&quot; and you will be able to select specifically which jobs should
        be executed.
        <br />
        To see exactly what will run, click on a given job; within this page, you will see the path
        to both the job&apos;s code and Slurm configuration, allowing you to inspect the scripts on
        the head node (using <InlineCode>cat</InlineCode> or similar) as necessary.
      </Typography>

      <Switches
        name="requiresApprovalStep"
        data={{ label: "Require approval before generated jobs are run", value: false }}
      />

      <p>Would you like to use a script as a template for this batch?</p>

      <Select name="scriptSource" label="Script source">
        {scripts.length === 0 ? (
          <MenuItem disabled>No scripts found - please add some to the script library</MenuItem>
        ) : (
          scripts.map((script) => <MenuItem value={script.id}>{script.name}</MenuItem>)
        )}
      </Select>

      <p>Next, please provide the script&apos;s header:</p>
      <Typography variant="body2" style={{ margin: "0.5rem 0" }}>
        This is the recommended location for any parameter and inline functions. For more
        information, see the{" "}
        <Link target="_blank" to="/script/new">
          Script Library&apos;s Creation Form
        </Link>
        .
      </Typography>

      <Field
        name="script.header"
        textareaId="header"
        component={CodeEditor}
        label="Script header"
      />
    </>
  );
}

BatchCreationFormInfoStep.validate = (values: FormValues) => {
  if (!values.name?.trim().length) {
    return { name: "Please enter a name" };
  }
  return {};
};

const toExport = BatchCreationFormInfoStep as BatchCreationStep;
export default toExport;
