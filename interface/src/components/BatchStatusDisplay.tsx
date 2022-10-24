import BatchStatus from "../types/BatchStatus";

export default function BatchStatusDisplay(props: { status: BatchStatus }) {
  switch (props.status) {
    case BatchStatus.QUEUEING_SETUP:
    case BatchStatus.SETTING_UP:
      return <span>Setting up</span>;
    case BatchStatus.GENERATING:
      return <span>Generating jobs</span>;
    case BatchStatus.AWAITING_APPROVAL:
      return <span style={{ fontWeight: "bolder" }}>Awaiting approval</span>;
    case BatchStatus.QUEUEING:
    case BatchStatus.RUNNING:
      return <span>Running</span>;
    case BatchStatus.CLEAN_UP_QUEUEING:
    case BatchStatus.CLEAN_UP_RUNNING:
      return <span>Cleaning up</span>;
    case BatchStatus.COMPLETED:
      return <span>Completed</span>;
    case BatchStatus.CANCELLED:
      return <span>Cancelled</span>;
    case BatchStatus.FAILED:
      return <span>Failed</span>;
    default:
      throw new Error(`Invalid batch status of ${props.status}`);
  }
}
