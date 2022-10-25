import { Container } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form } from "react-final-form";
import { useNavigate, useParams } from "react-router-dom";
import useCurrentUser from "../../api/useCurrentUser";
import useScript from "../../api/useScript";
import useScriptUpdateMutation from "../../api/useScriptUpdateMutation";
import ScriptCreationFormCleanupStep from "../../components/script-creation/ScriptCreationFormCleanupStep";
import ScriptCreationFormFooter from "../../components/script-creation/ScriptCreationFormFooter";
import ScriptCreationFormInfoStep from "../../components/script-creation/ScriptCreationFormInfoStep";
import ScriptCreationFormJobsStep from "../../components/script-creation/ScriptCreationFormJobsStep";
import ScriptCreationFormSetupStep from "../../components/script-creation/ScriptCreationFormSetupStep";
import ScriptCreationFormSlurmStep from "../../components/script-creation/ScriptCreationFormSlurmStep";
import ScriptCreationFormStepper from "../../components/script-creation/ScriptCreationFormStepper";
import { Script } from "../../types";
import { FormValues } from "../../types/ScriptCreationFormTypes";
import ScriptCreationStep from "../../types/ScriptCreationStep";
import FormStepStatus from "../../types/FormStepStatus";
import canEditScript from "../../utils/canEditScript";
import scriptToFormValues from "../../utils/scriptToFormValues";

export default function ScriptEditForm() {
  const id = useParams().scriptId;

  const script = useScript(id);
  const user = useCurrentUser();

  const navigate = useNavigate();
  const mutator = useScriptUpdateMutation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // defaults
  const [formState, setFormState] = useState<FormValues>({});
  useEffect(() => {
    if (script !== undefined) {
      setFormState(scriptToFormValues(script));
    }
  }, [script]);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<Record<number, undefined | FormStepStatus>>({
    0: FormStepStatus.COMPLETED,
    1: FormStepStatus.COMPLETED,
    2: FormStepStatus.COMPLETED,
    3: FormStepStatus.COMPLETED,
    4: FormStepStatus.COMPLETED,
  });

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

      if (script === undefined) {
        return;
      }

      setIsSubmitting(true);
      const newScript = await mutator({
        oldId: script.id,
        newScript: {
          name: values.name ?? script.name,
          header: values.header ?? script.header,
          setupScript: values.setupScript ?? script.setupScript,
          setupScriptSlurmConfig: values.setupSlurm ?? script.setupScriptSlurmConfig,
          loopWrapperTop: values.loopWrapperTop ?? script.loopWrapperTop,
          idVariable: values.identifyingVariable ?? script.idVariable,
          jobTemplate: values.job ?? script.jobTemplate,
          slurmTemplate: values.jobSlurm ?? script.slurmTemplate,
          loopWrapperBottom: values.loopWrapperBottom ?? script.loopWrapperBottom,
          cleanupMode: cleanupMode ?? script.cleanupMode,
          cleanupScript: values.cleanupScript ?? script.cleanupScript,
          cleanupSlurmConfig: values.cleanupSlurm ?? script.cleanupSlurmConfig,
          globalTemplate: values.globalTemplate ?? script.globalTemplate,
        },
      });
      setIsSubmitting(false);
      navigate(`/script/${newScript.id}`);
    },
    [stepStatus, currentStep, markCurrentStep, mutator, navigate, script],
  );

  return (
    <Container fixed>
      <h1>Edit script</h1>

      {script === undefined ? (
        "Loading..."
      ) : canEditScript(script, user) ? (
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
      ) : (
        <p>You are not allowed to edit this script</p>
      )}
    </Container>
  );
}
