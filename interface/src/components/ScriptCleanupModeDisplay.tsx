import { Script } from "../types";

export default function ScriptCleanupModeDisplay(props: {
  mode: Script["cleanupMode"];
}) {
  switch (props.mode) {
    case "ALL_ENDED":
      return <span>After all jobs finish</span>;
    case "ALL_SUCCESS":
      return <span>After all jobs finish successfully</span>;
    case "NEVER":
      return <span>Disabled</span>;
    default:
      throw new Error(`Invalid cleanup mode of ${props.mode}`);
  }
}
