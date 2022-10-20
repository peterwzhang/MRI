import BatchStatus from "../types/BatchStatus";

export default function BatchStatusDisplay(props: { status: BatchStatus }): JSX.Element {
  switch (props.status) {
    case "QUEUEING_SETUP":
    case "SETTING_UP":
      return <span>Setting up</span>;
    case "GENERATING":
      return <span>Generating jobs</span>;
    case "AWAITING_APPROVAL":
      return <span style={{ fontWeight: "bolder" }}>Awaiting approval</span>;
    case "QUEUEING":
    case "RUNNING":
      return <span>Running</span>;
    case "CLEAN_UP_QUEUEING":
    case "CLEAN_UP_RUNNING":
      return <span>Cleaning up</span>;
    case "COMPLETED":
      return <span>Completed</span>;
    case "CANCELLED":
      return <span>Cancelled</span>;
    case "FAILED":
      return <span>Failed</span>;
    default:
      throw new Error(`Invalid batch status of ${props.status}`);
  }
}
