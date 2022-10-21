type BatchStatus =
  | "QUEUEING_SETUP"
  | "SETTING_UP"
  | "GENERATING"
  | "AWAITING_APPROVAL"
  | "QUEUEING"
  | "RUNNING"
  | "CLEAN_UP_QUEUEING"
  | "CLEAN_UP_RUNNING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED";

export default BatchStatus;
