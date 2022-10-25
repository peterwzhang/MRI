import { FormValues, ValidationErrors } from "./BatchCreationFormTypes";
import { ScriptMetadataWithId } from "./ScriptMetadataWithId";

interface BatchCreationStep {
  (props: {
    onStepChange: (newStep: number, values: FormValues) => void;
    scripts: ScriptMetadataWithId[];
  }): JSX.Element;
  validate(values: FormValues): ValidationErrors;
}

export default BatchCreationStep;
