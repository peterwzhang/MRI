import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { apiUrl } from "./constants";

export default function useScriptArchiveMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (toArchive: string[]) => {
      for (const id of toArchive) {
        await ky.delete(`${apiUrl}scripts/${id}`);
      }
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["scripts"]);
        queryClient.invalidateQueries(["script"]);
      },
    },
  ).mutateAsync;
}
