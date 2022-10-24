import { Stepper, Step, StepButton, StepLabel } from "@mui/material";
import { useFormState } from "react-final-form";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStepStatus from "../../types/ScriptCreationStepStatus";

export default function ScriptCreationFormStepper({
  currentStep,
  onStepChange: onStepClick,
  stepStatus,
}: {
  currentStep: number;
  onStepChange: (nextStep: number, values: FormValues) => void;
  stepStatus: Record<number, ScriptCreationStepStatus | undefined>;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <Stepper nonLinear activeStep={currentStep}>
      <Step completed={stepStatus[0] === ScriptCreationStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(0, values)}>
          <StepLabel error={stepStatus[0] === ScriptCreationStepStatus.ERROR}>
            Script info
          </StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[1] === ScriptCreationStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(1, values)}>
          <StepLabel error={stepStatus[1] === ScriptCreationStepStatus.ERROR}>Setup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[2] === ScriptCreationStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(2, values)}>
          <StepLabel error={stepStatus[2] === ScriptCreationStepStatus.ERROR}>Jobs</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[3] === ScriptCreationStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(3, values)}>
          <StepLabel error={stepStatus[3] === ScriptCreationStepStatus.ERROR}>Cleanup</StepLabel>
        </StepButton>
      </Step>
      <Step completed={stepStatus[4] === ScriptCreationStepStatus.COMPLETED}>
        <StepButton color="inherit" onClick={() => onStepClick(4, values)}>
          <StepLabel error={stepStatus[4] === ScriptCreationStepStatus.ERROR}>Slurm</StepLabel>
        </StepButton>
      </Step>
    </Stepper>
  );
}
