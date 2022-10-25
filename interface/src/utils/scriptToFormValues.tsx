import { Script } from "../types";
import { FormValues } from "../types/ScriptCreationFormTypes";

export default function scriptToFormValues(script: Script): FormValues {
  return {
    name: script.name,
    header: script.header,
    globalTemplate: script.globalTemplate,
    setupScript: script.setupScript,
    loopWrapperTop: script.loopWrapperTop,
    identifyingVariable: script.idVariable,
    loopWrapperBottom: script.loopWrapperBottom,
    job: script.jobTemplate,
    cleanupMode: script.cleanupMode,
    cleanupScript: script.cleanupScript,
    setupSlurm: script.setupScriptSlurmConfig,
    jobSlurm: script.slurmTemplate,
    cleanupSlurm: script.cleanupSlurmConfig,
  };
}
