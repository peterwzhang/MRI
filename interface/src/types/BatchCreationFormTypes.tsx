import { ReactNode } from "react";
import { FormValues as ScriptFormValues } from "./ScriptCreationFormTypes";

export interface FormValues {
  name?: string;
  requiresApprovalStep?: boolean;
  script?: ScriptFormValues;
  scriptSource?: string;
}
export interface ValidationErrors {
  name?: ReactNode;
  script?: { identifyingVariable?: ReactNode };
}
