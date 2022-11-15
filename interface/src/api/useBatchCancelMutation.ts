import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { apiUrl } from "./constants";

export default function useBatchCancelMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (batchId: string) => ky.post(`${apiUrl}batches/${batchId}/cancel`, { credentials: "include" }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["batch"]);
        queryClient.invalidateQueries(["batches"]);
      },
    },
  ).mutateAsync;
}
