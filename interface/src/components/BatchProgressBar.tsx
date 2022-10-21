import MultiProgress from "react-multi-progress";
import { BatchMetadata } from "../types";

export default function BatchProgressBar(props: { status: BatchMetadata["statusSummary"] }) {
  // require it to be >= 1 to avoid div by zero
  const total = Math.max(
    Object.values(props.status).reduce((agg, n) => agg + n, 0),
    1,
  );

  const progress = [
    {
      value: (100 * props.status.waiting) / total,
      color: "#ffc107",
    },
    {
      value: (100 * props.status.running) / total,
      color: "#64b5f6",
    },
    {
      value: (100 * props.status.success) / total,
      color: "#43a047",
    },
    {
      value: (100 * props.status.failed) / total,
      color: "#ef5350",
    },
  ];
  return <MultiProgress elements={progress.filter((p) => p.value)} border="1px solid #ccc" />;
}
