import { Stepper, Step, StepButton, StepLabel } from "@mui/material";
import { useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import FormStepStatus from "../../types/FormStepStatus";

export default function BatchCreationFormStepper({
  currentStep,
  onStepChange,
  stepStatus,
}: {
  currentStep: number;
  onStepChange: (nextStep: number, values: FormValues) => void;
  stepStatus: Record<number, FormStepStatus | undefined>;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <Stepper nonLinear activeStep={currentStep}>
      <Step completed={stepStatus[0] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepChange(0, values)}>
          <StepLabel error={stepStatus[0] === FormStepStatus.ERROR}>Batch info</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[1] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepChange(1, values)}>
          <StepLabel error={stepStatus[1] === FormStepStatus.ERROR}>Script setup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[2] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepChange(2, values)}>
          <StepLabel error={stepStatus[2] === FormStepStatus.ERROR}>Script jobs</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[3] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepChange(3, values)}>
          <StepLabel error={stepStatus[3] === FormStepStatus.ERROR}>Script cleanup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[4] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepChange(4, values)}>
          <StepLabel error={stepStatus[4] === FormStepStatus.ERROR}>Script Slurm config</StepLabel>
        </StepButton>
      </Step>
    </Stepper>
  );
}
