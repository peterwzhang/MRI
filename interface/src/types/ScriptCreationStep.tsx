import { FormValues, ValidationErrors } from "./ScriptCreationFormTypes";
import { UserWithKey } from "./UserWithKey";

interface ScriptCreationStep {
  (props: {
    user?: UserWithKey;
    onStepChange: (newStep: number, values: FormValues) => void;
  }): JSX.Element;
  validate(values: FormValues): ValidationErrors;
}

export default ScriptCreationStep;
