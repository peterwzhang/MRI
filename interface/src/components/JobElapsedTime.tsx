import FormattedDuration from "react-intl-formatted-duration";
import { JobMetadata } from "../types";
import Unknown from "./Unknown";

export default function JobElapsedTime(props: { job: JobMetadata }) {
  if (props.job.startTime === null) return <Unknown />;

  return (
    <FormattedDuration
      seconds={
        (new Date(props.job.endTime).getTime() - new Date(props.job.startTime).getTime()) / 1000
      }
      format="{days} {hours} {minutes} {seconds}"
      unitDisplay="narrow"
    />
  );
}
