import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { ScriptForCreation, ScriptWithId } from "../types";
import { apiUrl } from "./constants";

export default function useScriptCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (newScript: ScriptForCreation) =>
      ky.post(`${apiUrl}scripts`, { json: newScript }).json<ScriptWithId>(),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["scripts"]);
        queryClient.invalidateQueries(["script"]);
      },
    },
  ).mutateAsync;
}
