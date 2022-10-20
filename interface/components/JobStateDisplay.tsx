import JobState from "../types/JobState";

export default function JobStateDisplay(props: { state: JobState }): JSX.Element {
  switch (props.state) {
    case "QUEUEING":
      return <span>Queueing</span>;
    case "PENDING":
      return <span>Pending</span>;
    case "RUNNING":
      return <span>Running</span>;
    case "SUCCESS":
      return <span>Completed</span>;
    case "TIMEOUT":
      return <span>Timed out</span>;
    case "FAILED":
      return <span>Failed</span>;
    case "CANCELLED":
      return <span>Cancelled</span>;
    case "UNAPPROVED":
      return <span>Not approved</span>;

    default:
      throw new Error(`Invalid job state of ${props.state}`);
  }
}
