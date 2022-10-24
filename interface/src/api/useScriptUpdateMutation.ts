import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { ScriptForCreation, ScriptWithId } from "../types";
import { apiUrl } from "./constants";

export default function useScriptUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (props: { oldId: string; newScript: ScriptForCreation }) =>
      ky
        .put(`${apiUrl}/api/scripts/${props.oldId}`, { json: props.newScript })
        .json<ScriptWithId>(),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["scripts"]);
        queryClient.invalidateQueries(["script"]);
      },
    },
  ).mutateAsync;
}
