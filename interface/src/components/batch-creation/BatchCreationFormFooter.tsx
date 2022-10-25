import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button } from "@mui/material";
import { useFormState } from "react-final-form";
import { FormValues } from "../../types/BatchCreationFormTypes";

export default function BatchCreationFormFooter({
  currentStep,
  onStepChange,
  isSubmitting,
}: {
  currentStep: number;
  onStepChange: (newStep: number, values: FormValues) => void;
  isSubmitting: boolean;
}) {
  const values = useFormState<FormValues>().values;

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        type="button"
        disabled={currentStep === 0}
        onClick={() => onStepChange(currentStep - 1, values)}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      {currentStep === 0 ? (
        <>
          <Button onClick={() => onStepChange(currentStep + 1, values)}>Customize script</Button>
          <LoadingButton
            loading={isSubmitting}
            // chosen source will add this
            // and is required for fully custom scripts
            disabled={!values.script?.identifyingVariable?.trim()?.length}
            type="submit"
            sx={{ mr: 1 }}
          >
            Submit batch
          </LoadingButton>
        </>
      ) : (
        <>
          <Button
            sx={{ mr: 1, display: currentStep === 4 ? "none" : undefined }}
            onClick={() => onStepChange(currentStep + 1, values)}
          >
            Next
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            sx={{ mr: 1, display: currentStep !== 4 ? "none" : undefined }}
          >
            Finish
          </LoadingButton>
        </>
      )}
    </Box>
  );
}
