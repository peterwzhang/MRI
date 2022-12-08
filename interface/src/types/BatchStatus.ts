enum BatchStatus {
  QUEUEING_SETUP = "QUEUEING_SETUP",
  SETTING_UP = "SETTING_UP",
  GENERATING = "GENERATING",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  QUEUEING = "QUEUEING",
  RUNNING = "RUNNING",
  CLEAN_UP_QUEUEING = "CLEAN_UP_QUEUEING",
  CLEAN_UP_RUNNING = "CLEAN_UP_RUNNING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export default BatchStatus;