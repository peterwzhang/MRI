import { Button, Container } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../api/useCurrentUser";
import useScriptCreateMutation from "../../api/useScriptCreateMutation";
import ScriptCreationFormCleanupStep from "../../components/script-creation/ScriptCreationFormCleanupStep";
import ScriptCreationFormFooter from "../../components/script-creation/ScriptCreationFormFooter";
import ScriptCreationFormInfoStep from "../../components/script-creation/ScriptCreationFormInfoStep";
import ScriptCreationFormJobsStep from "../../components/script-creation/ScriptCreationFormJobsStep";
import ScriptCreationFormSetupStep from "../../components/script-creation/ScriptCreationFormSetupStep";
import ScriptCreationFormSlurmStep from "../../components/script-creation/ScriptCreationFormSlurmStep";
import ScriptCreationFormStepper from "../../components/script-creation/ScriptCreationFormStepper";
import { Script, ScriptForCreation } from "../../types";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import FormStepStatus from "../../types/FormStepStatus";

export const DEFAULT_SLURM = `#SBATCH -n 1 # number of tasks to use (usually 1)
#SBATCH -c 1 # number of threads you are going to use
#SBATCH -p main # main partition
#SBATCH --qos debug # queue to enter
`;

export default function ScriptCreationForm() {
  const user = useCurrentUser();

  const navigate = useNavigate();
  const mutator = useScriptCreateMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // defaults
  const [formState, setFormState] = useState<FormValues>({
    cleanupMode: "NEVER",
    setupSlurm: DEFAULT_SLURM,
    jobSlurm: DEFAULT_SLURM,
    cleanupSlurm: DEFAULT_SLURM,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<Record<number, undefined | FormStepStatus>>({});

  const CurrentStepComponent = useMemo<ScriptCreationStep>(() => {
    switch (currentStep) {
      case 0:
        return ScriptCreationFormInfoStep;
      case 1:
        return ScriptCreationFormSetupStep;
      case 2:
        return ScriptCreationFormJobsStep;
      case 3:
        return ScriptCreationFormCleanupStep;
      case 4:
      default:
        return ScriptCreationFormSlurmStep;
    }
  }, [currentStep]);

  const formValidator = useMemo(() => CurrentStepComponent.validate, [CurrentStepComponent]);

  const markCurrentStep = useCallback(
    (values: FormValues) => {
      setStepStatus({
        ...stepStatus,
        [currentStep]: Object.values(formValidator(values)).length
          ? FormStepStatus.ERROR
          : FormStepStatus.COMPLETED,
      });
    },
    [currentStep, formValidator, stepStatus],
  );

  const submitter = useCallback(
    async (values: FormValues) => {
      setFormState(values);
      markCurrentStep(values);

      if (currentStep !== 4) {
        setCurrentStep(currentStep + 1);
        return;
      }

      const remainingSteps = Object.keys(stepStatus)
        .map((i) => parseInt(i, 10))
        .filter((i) => stepStatus[i] !== FormStepStatus.COMPLETED);
      if (remainingSteps.length) {
        setCurrentStep(remainingSteps[0]);
        return;
      }

      let cleanupMode: Script["cleanupMode"] = "NEVER";
      if (values.cleanupMode === "ALL_ENDED" || values.cleanupMode === "ALL_SUCCESS") {
        cleanupMode = values.cleanupMode;
      }

      setIsSubmitting(true);
      const newScript = await mutator({
        name: values.name ?? "",
        header: values.header ?? "",
        setupScript: values.setupScript ?? "",
        setupScriptSlurmConfig: values.setupSlurm ?? DEFAULT_SLURM,
        loopWrapperTop: values.loopWrapperTop ?? "",
        idVariable: values.identifyingVariable ?? "none",
        jobTemplate: values.job ?? "",
        slurmTemplate: values.jobSlurm ?? DEFAULT_SLURM,
        loopWrapperBottom: values.loopWrapperBottom ?? "",
        cleanupMode,
        cleanupScript: values.cleanupScript ?? "",
        cleanupSlurmConfig: values.cleanupSlurm ?? DEFAULT_SLURM,
        globalTemplate: values.globalTemplate ?? false,
      });
      setIsSubmitting(false);
      navigate(`/script/${newScript.id}`);
    },
    [stepStatus, currentStep, markCurrentStep, mutator, navigate],
  );

  return (
    <Container fixed>
      <h1>
        Create script{" "}
        <Button
          component="label"
          variant="contained"
          style={{ float: "right" }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const file = e.dataTransfer.files[0];

            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const script = JSON.parse(reader.result as string) as ScriptForCreation;

                setFormState({
                  name: script.name,
                  header: script.header,
                  setupScript: script.setupScript,
                  setupSlurm: script.setupScriptSlurmConfig,
                  loopWrapperTop: script.loopWrapperTop,
                  identifyingVariable: script.idVariable,
                  job: script.jobTemplate,
                  jobSlurm: script.slurmTemplate,
                  loopWrapperBottom: script.loopWrapperBottom,
                  cleanupMode: script.cleanupMode,
                  cleanupScript: script.cleanupScript,
                  cleanupSlurm: script.cleanupSlurmConfig,
                  globalTemplate: script.globalTemplate,
                });
              };
              reader.readAsText(file);
            }
          }}
        >
          import
          <input
            style={{ opacity: 0, position: "absolute", width: "7rem", height: "4rem" }}
            accept=".json,application/json"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const script = JSON.parse(reader.result as string) as ScriptForCreation;

                  setFormState({
                    name: script.name,
                    header: script.header,
                    setupScript: script.setupScript,
                    setupSlurm: script.setupScriptSlurmConfig,
                    loopWrapperTop: script.loopWrapperTop,
                    identifyingVariable: script.idVariable,
                    job: script.jobTemplate,
                    jobSlurm: script.slurmTemplate,
                    loopWrapperBottom: script.loopWrapperBottom,
                    cleanupMode: script.cleanupMode,
                    cleanupScript: script.cleanupScript,
                    cleanupSlurm: script.cleanupSlurmConfig,
                    globalTemplate: script.globalTemplate,
                  });
                };
                reader.readAsText(file);
              }
            }}
          />
        </Button>
      </h1>

      <Form<FormValues>
        initialValues={formState}
        validate={formValidator}
        onSubmit={submitter}
        validateOnBlur
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ScriptCreationFormStepper
              currentStep={currentStep}
              stepStatus={stepStatus}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
            />

            <CurrentStepComponent
              user={user}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
            />

            <ScriptCreationFormFooter
              currentStep={currentStep}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </Form>
    </Container>
  );
}
