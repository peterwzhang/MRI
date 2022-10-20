type JobState =
  | "QUEUEING"
  | "PENDING"
  | "RUNNING"
  | "SUCCESS"
  | "TIMEOUT"
  | "FAILED"
  | "CANCELLED"
  | "UNAPPROVED";

export default JobState;
