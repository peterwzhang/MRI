import BatchStatus from "../types/BatchStatus";
import JobState from "../types/JobState";

export default function JobStateDisplay(props: { state: JobState; batchStatus: BatchStatus }) {
  switch (props.state) {
    case JobState.QUEUEING:
      return <span>Queueing</span>;
    case JobState.PENDING:
      return <span>Pending</span>;
    case JobState.RUNNING:
      return <span>Running</span>;
    case JobState.SUCCESS:
      return <span>Completed</span>;
    case JobState.TIMEOUT:
      return <span>Timed out</span>;
    case JobState.FAILED:
      return <span>Failed</span>;
    case JobState.CANCELLED:
      return <span>Cancelled</span>;
    case JobState.UNAPPROVED:
      if (props.batchStatus === BatchStatus.AWAITING_APPROVAL) {
        return <span>Awaiting approval</span>;
      } else {
        return <span>Not approved</span>;
      }

    default:
      throw new Error(`Invalid job state of ${props.state}`);
  }
}
