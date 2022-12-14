import { Stepper, Step, StepButton, StepLabel } from "@mui/material";
import { useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import FormStepStatus from "../../types/FormStepStatus";

export default function ScriptCreationFormStepper({
  currentStep,
  onStepChange: onStepClick,
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
        <StepButton color="inherit" onClick={() => onStepClick(0, values)}>
          <StepLabel error={stepStatus[0] === FormStepStatus.ERROR}>Script info</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[1] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(1, values)}>
          <StepLabel error={stepStatus[1] === FormStepStatus.ERROR}>Setup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[2] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(2, values)}>
          <StepLabel error={stepStatus[2] === FormStepStatus.ERROR}>Jobs</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[3] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(3, values)}>
          <StepLabel error={stepStatus[3] === FormStepStatus.ERROR}>Cleanup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[4] === FormStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(4, values)}>
          <StepLabel error={stepStatus[4] === FormStepStatus.ERROR}>Slurm</StepLabel>
        </StepButton>
      </Step>
    </Stepper>
  );
}
