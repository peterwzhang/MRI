import { Container } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, FormSpy } from "react-final-form";
import { useNavigate } from "react-router-dom";
import BatchCreationFormStepper from "../../components/batch-creation/BatchCreationFormStepper";
import BatchCreationFormCleanupStep from "../../components/batch-creation/BatchCreationFormCleanupStep";
import BatchCreationFormFooter from "../../components/batch-creation/BatchCreationFormFooter";
import BatchCreationFormInfoStep from "../../components/batch-creation/BatchCreationFormInfoStep";
import BatchCreationFormJobsStep from "../../components/batch-creation/BatchCreationFormJobsStep";
import BatchCreationFormSetupStep from "../../components/batch-creation/BatchCreationFormSetupStep";
import BatchCreationFormSlurmStep from "../../components/batch-creation/BatchCreationFormSlurmStep";
import { Script } from "../../types";
import { FormValues } from "../../types/BatchCreationFormTypes";
import BatchCreationStep from "../../types/BatchCreationStep";
import FormStepStatus from "../../types/FormStepStatus";
import { DEFAULT_SLURM } from "../script/ScriptCreationForm";
import useScripts from "../../api/useScripts";
import useScript from "../../api/useScript";
import scriptToFormValues from "../../utils/scriptToFormValues";
import useBatchCreateMutation from "../../api/useBatchCreateMutation";

export default function CreateBatch() {
  const mutator = useBatchCreateMutation();
  const navigate = useNavigate();

  const scripts = useScripts(false).data;

  const [sourceScriptId, setSourceScriptId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sourceScript = useScript(sourceScriptId ?? undefined, sourceScriptId !== null);

  // defaults
  const [formState, setFormState] = useState<FormValues>({
    script: {
      cleanupMode: "NEVER",
      setupSlurm: DEFAULT_SLURM,
      jobSlurm: DEFAULT_SLURM,
      cleanupSlurm: DEFAULT_SLURM,
    },
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepStatus, setStepStatus] = useState<Record<number, undefined | FormStepStatus>>({});

  useEffect(() => {
    if (sourceScriptId === sourceScript?.id) {
      setFormState((f) => ({ ...f, script: scriptToFormValues(sourceScript) }));
      setStepStatus((ss) => ({
        ...ss,
        1: FormStepStatus.COMPLETED,
        2: FormStepStatus.COMPLETED,
        3: FormStepStatus.COMPLETED,
        4: FormStepStatus.COMPLETED,
      }));
    }
  }, [sourceScript, sourceScriptId]);

  const CurrentStepComponent = useMemo<BatchCreationStep>(() => {
    switch (currentStep) {
      case 0:
        return BatchCreationFormInfoStep;
      case 1:
        return BatchCreationFormSetupStep;
      case 2:
        return BatchCreationFormJobsStep;
      case 3:
        return BatchCreationFormCleanupStep;
      case 4:
      default:
        return BatchCreationFormSlurmStep;
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

      const remainingSteps = Object.keys(stepStatus)
        .map((i) => parseInt(i, 10))
        .filter((i) => stepStatus[i] !== FormStepStatus.COMPLETED);
      if (remainingSteps.length) {
        setCurrentStep(remainingSteps[0]);
        return;
      }

      let cleanupMode: Script["cleanupMode"] = "NEVER";
      if (
        values.script?.cleanupMode === "ALL_ENDED" ||
        values.script?.cleanupMode === "ALL_SUCCESS"
      ) {
        cleanupMode = values.script?.cleanupMode;
      }

      setIsSubmitting(true);
      const newBatch = await mutator({
        name: values.name ?? "",
        requiresApprovalStep: values.requiresApprovalStep ?? false,
        script: {
          // only send name if we copied from someone else
          name: values.script?.name ?? "",
          header: values.script?.header ?? "",
          setupScript: values.script?.setupScript ?? "",
          setupScriptSlurmConfig: values.script?.setupSlurm ?? DEFAULT_SLURM,
          loopWrapperTop: values.script?.loopWrapperTop ?? "",
          idVariable: values.script?.identifyingVariable ?? "none",
          jobTemplate: values.script?.job ?? "",
          slurmTemplate: values.script?.jobSlurm ?? DEFAULT_SLURM,
          loopWrapperBottom: values.script?.loopWrapperBottom ?? "",
          cleanupMode,
          cleanupScript: values.script?.cleanupScript ?? "",
          cleanupSlurmConfig: values.script?.cleanupSlurm ?? DEFAULT_SLURM,
          globalTemplate: values.script?.globalTemplate ?? false,
        },
      });
      setIsSubmitting(false);
      navigate(`/batch/${newBatch.id}`);
    },
    [stepStatus, markCurrentStep, mutator, navigate],
  );

  return (
    <Container fixed>
      <h1>Create batch</h1>

      <Form<FormValues>
        initialValues={formState}
        validate={formValidator}
        onSubmit={submitter}
        validateOnBlur
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <BatchCreationFormStepper
              currentStep={currentStep}
              stepStatus={stepStatus}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
            />

            <CurrentStepComponent
              scripts={scripts ?? []}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
            />

            <BatchCreationFormFooter
              currentStep={currentStep}
              onStepChange={(newStep, curValues) => {
                markCurrentStep(curValues);
                setCurrentStep(newStep);
              }}
              isSubmitting={isSubmitting}
            />

            <FormSpy<FormValues>
              subscription={{ values: true }}
              onChange={(state) => {
                setFormState(state.values);
                setSourceScriptId(state.values.scriptSource ?? null);
              }}
            />
          </form>
        )}
      </Form>
    </Container>
  );
}
