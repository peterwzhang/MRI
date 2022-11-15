import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { apiUrl } from "./constants";

export default function useJobCancelMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    async (props: { batchId: string; jobs: string[] }) => {
      for (const id of props.jobs) {
        await ky.post(`${apiUrl}batches/${props.batchId}/jobs/${id}/cancel`, {
          credentials: "include",
        });
      }
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["batch"]);
        queryClient.invalidateQueries(["batches"]);
      },
    },
  ).mutateAsync;
}
