import { ReactNode } from "react";

export interface FormValues {
  name?: string;
  header?: string;
  globalTemplate?: boolean;
  setupScript?: string;
  loopWrapperTop?: string;
  identifyingVariable?: string;
  loopWrapperBottom?: string;
  job?: string;
  cleanupMode?: string;
  cleanupScript?: string;
  setupSlurm?: string;
  jobSlurm?: string;
  cleanupSlurm?: string;
}
export interface ValidationErrors {
  name?: ReactNode;
  identifyingVariable?: ReactNode;
}
