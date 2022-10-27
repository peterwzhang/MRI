import { Tooltip } from "@mui/material";
import MultiProgress, { ProgressComponentProps } from "./rmp";
import { BatchMetadata } from "../types";

interface ExtraProps {
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProgressPiece({ children, element, ...rest }: ProgressComponentProps<ExtraProps>) {
  return (
    <Tooltip title={element.label} arrow>
      <div {...rest} />
    </Tooltip>
  );
}

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
      label: "Waiting",
    },
    {
      value: (100 * props.status.running) / total,
      color: "#64b5f6",
      label: "Running",
    },
    {
      value: (100 * props.status.success) / total,
      color: "#43a047",
      label: "Success",
    },
    {
      value: (100 * props.status.failed) / total,
      color: "#ef5350",
      label: "Failed",
    },
  ];
  return (
    <MultiProgress<ExtraProps>
      elements={progress.filter((p) => p.value)}
      component={ProgressPiece}
      border="1px solid #ccc"
    />
  );
}
